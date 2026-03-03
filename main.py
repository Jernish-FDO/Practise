import os
import asyncio
import logging
import time
import random
from datetime import datetime
from collections import defaultdict, deque
from dataclasses import dataclass, field
from typing import Dict, Set

from dotenv import load_dotenv
from telegram import (
    Update, InlineKeyboardButton, InlineKeyboardMarkup,
    ReplyKeyboardMarkup, ReplyKeyboardRemove, BotCommand
)
from telegram.ext import (
    Application, CommandHandler, CallbackQueryHandler,
    MessageHandler, ContextTypes, filters
)
from telegram.constants import ParseMode, ChatAction, DiceEmoji

# ── CONFIG ─────────────────────────────────────────────────────
load_dotenv()

BOT_TOKEN: str = os.environ.get("BOT_TOKEN", "")
ADMIN_ID: int = int(os.environ.get("ADMIN_ID", 0) or 0)
BOT_VERSION: str = os.environ.get("BOT_VERSION", "2.1-Animated")

if not BOT_TOKEN or BOT_TOKEN == "your_token_from_botfather":
    raise ValueError("Valid BOT_TOKEN is missing in environment variables. Check your .env file.")

# ── STATE & CACHING (O(1) Optimized) ───────────────────────────
@dataclass(slots=True)
class UserSession:
    name: str
    joined: float = field(default_factory=time.time)
    msg_count: int = 0

user_sessions: Dict[int, UserSession] = {}
all_user_ids: Set[int] = set()
rate_limits: Dict[int, deque] = defaultdict(deque)
feedbacks: deque = deque(maxlen=500)

logging.basicConfig(
    format="%(asctime)s | %(levelname)s | %(name)s | %(message)s", 
    level=logging.INFO
)
logger = logging.getLogger(__name__)

# ── HELPERS ────────────────────────────────────────────────────
def get_session(user) -> UserSession:
    uid = user.id
    if uid not in user_sessions:
        user_sessions[uid] = UserSession(name=user.first_name)
    all_user_ids.add(uid)
    return user_sessions[uid]

def is_rate_limited(user_id: int, max_msgs: int = 5, window: int = 10) -> bool:
    now = time.time()
    dq = rate_limits[user_id]
    while dq and now - dq[0] > window:
        dq.popleft()
    if len(dq) >= max_msgs:
        return True
    dq.append(now)
    return False

def main_keyboard() -> ReplyKeyboardMarkup:
    return ReplyKeyboardMarkup(
        [["Menu", "About"], ["My Stats", "Feedback"], ["Clear Chat"]],
        resize_keyboard=True,
    )

def main_menu_inline() -> InlineKeyboardMarkup:
    return InlineKeyboardMarkup([
        [InlineKeyboardButton("Games", callback_data="cat_games"),
         InlineKeyboardButton("Tools", callback_data="cat_tools")],
        [InlineKeyboardButton("Settings", callback_data="cat_settings"),
         InlineKeyboardButton("News", callback_data="cat_news")],
        [InlineKeyboardButton("Close", callback_data="close")],
    ])

# ── HANDLERS ───────────────────────────────────────────────────
async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    user = update.effective_user
    session = get_session(user)
    session.msg_count += 1
    await update.message.reply_text(
        f"Welcome, {user.first_name}!\n\nBot v{BOT_VERSION} is ready.\nUse the buttons below.",
        reply_markup=main_keyboard(),
    )

async def menu(update: Update, context: ContextTypes.DEFAULT_TYPE):
    msg = update.message or update.callback_query.message
    await msg.reply_text("Main Menu:", reply_markup=main_menu_inline())

async def clear(update: Update, context: ContextTypes.DEFAULT_TYPE):
    kb = InlineKeyboardMarkup([[
        InlineKeyboardButton("Yes, reset", callback_data="confirm_clear"),
        InlineKeyboardButton("Cancel", callback_data="close"),
    ]])
    msg = update.message or update.callback_query.message
    await msg.reply_text("Wipe bot memory & internal chat states for this user?", reply_markup=kb)

async def stats(update: Update, context: ContextTypes.DEFAULT_TYPE):
    user = update.effective_user
    session = get_session(user)
    session.msg_count += 1
    joined_dt = datetime.fromtimestamp(session.joined).strftime("%Y-%m-%d %H:%M")
    await update.message.reply_text(
        f"📊 *Your Stats*\n\n"
        f"• *Name:* {session.name}\n"
        f"• *User ID:* `{user.id}`\n"
        f"• *First seen:* {joined_dt}\n"
        f"• *Interactions:* {session.msg_count}",
        parse_mode=ParseMode.MARKDOWN
    )

async def about(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text(f"🤖 *About Bot*\n\nVersion: {BOT_VERSION}\nTotal cached users: {len(all_user_ids)}", parse_mode=ParseMode.MARKDOWN)

async def help_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    text = (
        "/start - Init sequence\n/menu - UI Menu\n/stats - Telemetry\n"
        "/feedback <msg> - Dev support\n/clear - Reset memory\n"
    )
    if update.effective_user.id == ADMIN_ID:
        text += "\n👑 *Admin Tools*\n/admin - Dashboard\n/broadcast <msg> - Global Ping"
    await update.message.reply_text(text, parse_mode=ParseMode.MARKDOWN)

async def feedback(update: Update, context: ContextTypes.DEFAULT_TYPE):
    if not context.args:
        await update.message.reply_text("Usage: `/feedback your issue here`", parse_mode=ParseMode.MARKDOWN)
        return
    entry = f"[{datetime.now():%Y-%m-%d %H:%M}] {update.effective_user.first_name}: {' '.join(context.args)}"
    feedbacks.append(entry)
    if ADMIN_ID:
        try:
            await context.bot.send_message(ADMIN_ID, f"⚠️ *New Feedback:*\n`{entry}`", parse_mode=ParseMode.MARKDOWN)
        except Exception as e:
            logger.warning("Admin ping failed: %s", e)
    await update.message.reply_text("Feedback routed successfully.")

async def admin(update: Update, context: ContextTypes.DEFAULT_TYPE):
    if update.effective_user.id != ADMIN_ID: return
    kb = InlineKeyboardMarkup([
        [InlineKeyboardButton("Bot Stats", callback_data="admin_stats")],
        [InlineKeyboardButton("Feedbacks", callback_data="admin_feedbacks")],
        [InlineKeyboardButton("Close", callback_data="close")],
    ])
    await update.message.reply_text("🔐 *Root Console*", reply_markup=kb, parse_mode=ParseMode.MARKDOWN)

async def broadcast(update: Update, context: ContextTypes.DEFAULT_TYPE):
    if update.effective_user.id != ADMIN_ID or not context.args: return
    text = " ".join(context.args)
    sent, failed = 0, 0
    # Gather async ops concurrently
    async def send_to_user(uid):
        try:
            await context.bot.send_message(uid, f"📢 *Broadcast*\n\n{text}", parse_mode=ParseMode.MARKDOWN)
            return True
        except:
            return False

    results = await asyncio.gather(*(send_to_user(u) for u in list(all_user_ids)))
    sent = sum(1 for r in results if r)
    await update.message.reply_text(f"Broadcast complete. `Sent: {sent} | Failed: {len(results)-sent}`", parse_mode=ParseMode.MARKDOWN)

# ── ROUTING ALGORITHMS (Pattern Matching) ──────────────────────
async def button_handler(update: Update, context: ContextTypes.DEFAULT_TYPE):
    query = update.callback_query
    await query.answer()
    msg = query.message
    chat_id = msg.chat_id
    back_kb = InlineKeyboardMarkup([[InlineKeyboardButton("Back", callback_data="back_menu")]])

    match query.data:
        case "cat_games":
            kb = InlineKeyboardMarkup([[
                InlineKeyboardButton("🎰 Slots", callback_data="game_dice"),
                InlineKeyboardButton("🎯 Darts", callback_data="game_coin")
            ], [InlineKeyboardButton("🔙 Back", callback_data="back_menu")]])
            await msg.edit_text("🕹 *Arcade Select:*", reply_markup=kb, parse_mode=ParseMode.MARKDOWN)

        case "cat_tools":
            kb = InlineKeyboardMarkup([[
                InlineKeyboardButton("⏱ Clock", callback_data="tool_time"),
                InlineKeyboardButton("🎲 Entropic RNG", callback_data="tool_random")
            ], [InlineKeyboardButton("🔙 Back", callback_data="back_menu")]])
            await msg.edit_text("⚙️ *Tools:*", reply_markup=kb, parse_mode=ParseMode.MARKDOWN)

        case "game_dice": # Telegram Native Client UI Animations
            await msg.edit_text("Booting up machine...")
            await context.bot.send_chat_action(chat_id, action=ChatAction.TYPING)
            slot_msg = await context.bot.send_dice(chat_id, emoji=DiceEmoji.SLOT_MACHINE)
            
            await asyncio.sleep(2.5) # Synchronize async await with Client UI Animation length
            val = slot_msg.dice.value
            res_str = f"🎰 **JACKPOT!** [{val}/64]" if val == 64 else f"Loss. Payout algorithm landed on {val}/64."
            await context.bot.send_message(chat_id, res_str, parse_mode=ParseMode.MARKDOWN)

        case "game_coin":
            dart_msg = await context.bot.send_dice(chat_id, emoji=DiceEmoji.DART)
            await asyncio.sleep(2)
            if dart_msg.dice.value == 6:
                await context.bot.send_message(chat_id, "🎯 **BULLSEYE! Perfect Hit.**", parse_mode=ParseMode.MARKDOWN)
            else:
                await context.bot.send_message(chat_id, "Missed the center.", parse_mode=ParseMode.MARKDOWN)

        case "tool_random": # Repaint Array Emulation
            frames = ["[■□□□□] 20%", "[■■□□□] 40%", "[■■■□□] 60%", "[■■■■□] 80%", "[■■■■■] 100%"]
            for frame in frames:
                await msg.edit_text(f"⚛️ *Calculating Entropy...*\n`{frame}`", parse_mode=ParseMode.MARKDOWN)
                await asyncio.sleep(0.5) # O(1) Yield point avoiding flood limits
            val = random.randint(1, 9999)
            await msg.edit_text(f"✅ *Process Halted.*\n\nComputed hash string integer: `{val}`", reply_markup=back_kb, parse_mode=ParseMode.MARKDOWN)

        case "cat_news":
            await msg.edit_text("Synchronizing stream buffers...")
            await context.bot.send_chat_action(chat_id, action=ChatAction.UPLOAD_VIDEO)
            await asyncio.sleep(1)
            # URL Payload Offloading reduces RAM bandwidth overhead locally
            await context.bot.send_animation(
                chat_id=chat_id, 
                animation="https://media.giphy.com/media/xT9IgzoKnwFNmISR8I/giphy.gif",
                caption="📺 *Daily Interface Stream Initialized*",
                reply_markup=back_kb, parse_mode=ParseMode.MARKDOWN
            )
            await msg.delete()

        case "tool_time":
            await msg.edit_text(f"Server UNIX Epoch:\n`{datetime.utcnow().isoformat()}Z`", reply_markup=back_kb, parse_mode=ParseMode.MARKDOWN)

        case "admin_stats" | "admin_feedbacks":
            if query.data == "admin_stats":
                text = f"Bot Stats\nUsers: {len(all_user_ids)}\nQueue Size: {len(feedbacks)}"
            else:
                text = "\n".join(list(feedbacks)[-5:]) if feedbacks else "Queue empty."
            await msg.edit_text(f"`{text}`", parse_mode=ParseMode.MARKDOWN, reply_markup=InlineKeyboardMarkup([[InlineKeyboardButton("Back", callback_data="close")]]))

        case "confirm_clear":
            user_sessions.pop(query.from_user.id, None)
            await msg.delete()
            await context.bot.send_message(query.from_user.id, "♻️ *Garbage Collector Fired*\nLocal data cache dumped. Natively right click to clear client UI history.", reply_markup=ReplyKeyboardRemove(), parse_mode=ParseMode.MARKDOWN)

        case "back_menu":
            await msg.edit_text("Main Menu:", reply_markup=main_menu_inline())
        
        case "cat_settings":
            await msg.edit_text("Coming in DB patch.", reply_markup=back_kb)

        case "close":
            await msg.delete()
        case _:
            pass

async def text_handler(update: Update, context: ContextTypes.DEFAULT_TYPE):
    user = update.effective_user
    text = update.message.text
    if is_rate_limited(user.id):
        await update.message.reply_text("⚠️ Rate limits breached. Halting incoming traffic from CID.", parse_mode=ParseMode.MARKDOWN)
        return
        
    get_session(user).msg_count += 1
    
    match text:
        case "Menu":       await menu(update, context)
        case "About":      await about(update, context)
        case "My Stats":   await stats(update, context)
        case "Feedback":   await update.message.reply_text("Run `/feedback <msg>`", parse_mode=ParseMode.MARKDOWN)
        case "Clear Chat": await clear(update, context)
        case _:            pass

async def post_init(application: Application):
    await application.bot.set_my_commands([
        BotCommand("start", "Init bot sequence"),
        BotCommand("menu", "Graphic interfaces"),
        BotCommand("stats", "Compute history"),
        BotCommand("feedback", "Support payload"),
        BotCommand("clear", "Cache deletion"),
        BotCommand("help", "Subsystem queries")
    ])

def main():
    app = Application.builder().token(BOT_TOKEN).post_init(post_init).build()
    
    app.add_handler(CommandHandler(["start"], start))
    app.add_handler(CommandHandler(["menu"], menu))
    app.add_handler(CommandHandler(["stats"], stats))
    app.add_handler(CommandHandler(["about"], about))
    app.add_handler(CommandHandler(["help"], help_command))
    app.add_handler(CommandHandler(["clear"], clear))
    app.add_handler(CommandHandler(["feedback"], feedback))
    app.add_handler(CommandHandler(["admin"], admin))
    app.add_handler(CommandHandler(["broadcast"], broadcast))
    
    app.add_handler(CallbackQueryHandler(button_handler))
    app.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, text_handler))
    
    logger.info("Initializing Network Interfaces. Readying Application Poller.")
    app.run_polling(allowed_updates=Update.ALL_TYPES)

if __name__ == "__main__":
    main()
