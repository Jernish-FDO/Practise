"""
Advanced Telegram Bot v2
========================
Install:  pip install python-telegram-bot==20.7
Run:      python bot_advanced.py

Steps:
  1. Replace BOT_TOKEN with your token from @BotFather
  2. Replace ADMIN_ID with your Telegram user ID (get from @userinfobot)
  3. pip install python-telegram-bot==20.7
  4. python bot_advanced.py
"""

import logging, time, random
from datetime import datetime
from collections import defaultdict

from telegram import (
    Update, InlineKeyboardButton, InlineKeyboardMarkup,
    ReplyKeyboardMarkup, ReplyKeyboardRemove, BotCommand,
)
from telegram.ext import (
    Application, CommandHandler, CallbackQueryHandler,
    MessageHandler, ContextTypes, filters,
)

# ── CONFIG ─────────────────────────────────────────────────────
load_dotenv()  # loads .env file

BOT_TOKEN = os.getenv("BOT_TOKEN")
ADMIN_ID  = int(os.getenv("ADMIN_ID"))
BOT_VERSION = os.getenv("BOT_VERSION")

# ── STATE ──────────────────────────────────────────────────────
user_sessions = {}
all_user_ids  = set()
rate_limits   = defaultdict(list)
feedbacks     = []

logging.basicConfig(format="%(asctime)s | %(levelname)s | %(message)s", level=logging.INFO)
logger = logging.getLogger(__name__)

# ── HELPERS ────────────────────────────────────────────────────
def get_session(user):
    uid = user.id
    if uid not in user_sessions:
        user_sessions[uid] = {
            "name": user.first_name,
            "joined": datetime.now().strftime("%Y-%m-%d %H:%M"),
            "msg_count": 0,
        }
    all_user_ids.add(uid)
    return user_sessions[uid]

def is_rate_limited(user_id, max_msgs=5, window=10):
    now = time.time()
    rate_limits[user_id] = [t for t in rate_limits[user_id] if now - t < window]
    if len(rate_limits[user_id]) >= max_msgs:
        return True
    rate_limits[user_id].append(now)
    return False

def is_admin(uid): return uid == ADMIN_ID

def main_keyboard():
    return ReplyKeyboardMarkup(
        [["Menu", "About"], ["My Stats", "Feedback"], ["Clear Chat"]],
        resize_keyboard=True,
    )

def main_menu_inline():
    return InlineKeyboardMarkup([
        [InlineKeyboardButton("Games",    callback_data="cat_games"),
         InlineKeyboardButton("Tools",    callback_data="cat_tools")],
        [InlineKeyboardButton("Settings", callback_data="cat_settings"),
         InlineKeyboardButton("News",     callback_data="cat_news")],
        [InlineKeyboardButton("Close",    callback_data="close")],
    ])

# ── /start ─────────────────────────────────────────────────────
async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    user = update.effective_user
    session = get_session(user)
    session["msg_count"] += 1
    await update.message.reply_text(
        f"Welcome, {user.first_name}!\n\nBot v{BOT_VERSION} is ready.\nUse the buttons below or type /help.",
        reply_markup=main_keyboard(),
    )

# ── /menu ──────────────────────────────────────────────────────
async def menu(update: Update, context: ContextTypes.DEFAULT_TYPE):
    msg = update.message if update.message else update.callback_query.message
    await msg.reply_text("Main Menu:", reply_markup=main_menu_inline())

# ── /clear ─────────────────────────────────────────────────────
async def clear(update: Update, context: ContextTypes.DEFAULT_TYPE):
    kb = InlineKeyboardMarkup([[
        InlineKeyboardButton("Yes, reset", callback_data="confirm_clear"),
        InlineKeyboardButton("Cancel",     callback_data="close"),
    ]])
    msg = update.message if update.message else update.callback_query.message
    await msg.reply_text("Reset your session? Your message count will be cleared.", reply_markup=kb)

# ── /stats ─────────────────────────────────────────────────────
async def stats(update: Update, context: ContextTypes.DEFAULT_TYPE):
    user = update.effective_user
    session = get_session(user)
    session["msg_count"] += 1
    await update.message.reply_text(
        f"Your Stats\n\n"
        f"Name: {session['name']}\n"
        f"User ID: {user.id}\n"
        f"First seen: {session['joined']}\n"
        f"Messages sent: {session['msg_count']}"
    )

# ── /about ─────────────────────────────────────────────────────
async def about(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text(
        f"About This Bot\n\n"
        f"Version: {BOT_VERSION}\n"
        f"Library: python-telegram-bot v20\n"
        f"Total users: {len(all_user_ids)}"
    )

# ── /help ──────────────────────────────────────────────────────
async def help_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text(
        "Commands\n\n"
        "/start      - Restart & show keyboard\n"
        "/menu       - Browse categories\n"
        "/stats      - Your usage stats\n"
        "/feedback   - Send feedback\n"
        "/clear      - Reset your session\n"
        "/about      - About this bot\n"
        "/help       - This message\n\n"
        "Admin only:\n"
        "/admin      - Admin panel\n"
        "/broadcast  - Message all users"
    )

# ── /feedback ──────────────────────────────────────────────────
async def feedback(update: Update, context: ContextTypes.DEFAULT_TYPE):
    if not context.args:
        await update.message.reply_text("Usage: /feedback Your message here")
        return
    text = " ".join(context.args)
    user = update.effective_user
    entry = f"[{datetime.now():%Y-%m-%d %H:%M}] {user.first_name} ({user.id}): {text}"
    feedbacks.append(entry)
    try:
        await context.bot.send_message(ADMIN_ID, f"New Feedback:\n{entry}")
    except Exception:
        pass
    await update.message.reply_text("Thanks for your feedback!")

# ── /admin ─────────────────────────────────────────────────────
async def admin(update: Update, context: ContextTypes.DEFAULT_TYPE):
    if not is_admin(update.effective_user.id):
        await update.message.reply_text("Not authorised.")
        return
    kb = InlineKeyboardMarkup([
        [InlineKeyboardButton("Bot Stats",      callback_data="admin_stats")],
        [InlineKeyboardButton("View Feedbacks", callback_data="admin_feedbacks")],
        [InlineKeyboardButton("Broadcast Help", callback_data="admin_broadcast")],
        [InlineKeyboardButton("Close",          callback_data="close")],
    ])
    await update.message.reply_text("Admin Panel", reply_markup=kb)

# ── /broadcast ─────────────────────────────────────────────────
async def broadcast(update: Update, context: ContextTypes.DEFAULT_TYPE):
    if not is_admin(update.effective_user.id):
        await update.message.reply_text("Not authorised.")
        return
    if not context.args:
        await update.message.reply_text("Usage: /broadcast Your message here")
        return
    text = " ".join(context.args)
    sent = failed = 0
    for uid in all_user_ids:
        try:
            await context.bot.send_message(uid, f"Broadcast:\n\n{text}")
            sent += 1
        except Exception:
            failed += 1
    await update.message.reply_text(f"Sent: {sent} | Failed: {failed}")

# ── BUTTON CALLBACKS ───────────────────────────────────────────
async def button_handler(update: Update, context: ContextTypes.DEFAULT_TYPE):
    query = update.callback_query
    await query.answer()
    data = query.data
    user = query.from_user
    back = [[InlineKeyboardButton("Back to Menu", callback_data="back_menu")]]

    if data == "cat_games":
        kb = [[InlineKeyboardButton("Roll Dice", callback_data="game_dice"),
               InlineKeyboardButton("Coin Flip", callback_data="game_coin")]] + back
        await query.edit_message_text("Games:", reply_markup=InlineKeyboardMarkup(kb))

    elif data == "cat_tools":
        kb = [[InlineKeyboardButton("Current Time",  callback_data="tool_time"),
               InlineKeyboardButton("Random Number", callback_data="tool_random")]] + back
        await query.edit_message_text("Tools:", reply_markup=InlineKeyboardMarkup(kb))

    elif data == "cat_settings":
        kb = [
            [InlineKeyboardButton("Notifications: ON", callback_data="toggle_notif")],
            [InlineKeyboardButton("Language: English", callback_data="lang")],
        ] + back
        await query.edit_message_text("Settings:", reply_markup=InlineKeyboardMarkup(kb))

    elif data == "cat_news":
        await query.edit_message_text("News coming soon! Connect an RSS feed or API here.")

    elif data == "game_dice":
        await query.edit_message_text(f"You rolled: {random.randint(1, 6)}")

    elif data == "game_coin":
        await query.edit_message_text(f"Coin flip: {'Heads' if random.random() > 0.5 else 'Tails'}!")

    elif data == "tool_time":
        await query.edit_message_text(f"Server time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")

    elif data == "tool_random":
        await query.edit_message_text(f"Random number (1-100): {random.randint(1, 100)}")

    elif data == "toggle_notif":
        await query.edit_message_text("Notifications toggled!\n(Connect a DB to persist this)")

    elif data == "lang":
        await query.edit_message_text("Language switching coming soon!")

    elif data == "admin_stats":
        await query.edit_message_text(f"Bot Stats\n\nTotal users: {len(all_user_ids)}\nFeedbacks: {len(feedbacks)}")

    elif data == "admin_feedbacks":
        text = "\n\n".join(feedbacks[-5:]) if feedbacks else "No feedbacks yet."
        await query.edit_message_text(f"Last 5 Feedbacks:\n\n{text}")

    elif data == "admin_broadcast":
        await query.edit_message_text("Use /broadcast <message> to send to all users.")

    elif data == "confirm_clear":
        uid = user.id
        user_sessions.pop(uid, None)
        await query.message.delete()
        await context.bot.send_message(
            uid, "Session reset! Send /start to begin fresh.",
            reply_markup=ReplyKeyboardRemove(),
        )

    elif data == "back_menu":
        await query.edit_message_text("Main Menu:", reply_markup=main_menu_inline())

    elif data == "close":
        await query.message.delete()

# ── TEXT HANDLER ───────────────────────────────────────────────
async def text_handler(update: Update, context: ContextTypes.DEFAULT_TYPE):
    user = update.effective_user
    text = update.message.text
    if is_rate_limited(user.id):
        await update.message.reply_text("Slow down! You're sending messages too fast.")
        return
    session = get_session(user)
    session["msg_count"] += 1
    dispatch = {
        "Menu": menu, "About": about,
        "My Stats": stats, "Feedback": feedback, "Clear Chat": clear,
    }
    handler = dispatch.get(text)
    if handler:
        await handler(update, context)
    else:
        await update.message.reply_text(f'You said: "{text}"\n\nTry the menu buttons or /help.')

# ── REGISTER COMMANDS ──────────────────────────────────────────
async def post_init(application: Application):
    await application.bot.set_my_commands([
        BotCommand("start",    "Welcome & show keyboard"),
        BotCommand("menu",     "Browse categories"),
        BotCommand("stats",    "Your usage stats"),
        BotCommand("feedback", "Send feedback"),
        BotCommand("clear",    "Reset your session"),
        BotCommand("about",    "About this bot"),
        BotCommand("help",     "Help & commands"),
    ])

# ── MAIN ───────────────────────────────────────────────────────
def main():
    app = Application.builder().token(BOT_TOKEN).post_init(post_init).build()
    app.add_handler(CommandHandler("start",     start))
    app.add_handler(CommandHandler("menu",      menu))
    app.add_handler(CommandHandler("stats",     stats))
    app.add_handler(CommandHandler("about",     about))
    app.add_handler(CommandHandler("help",      help_command))
    app.add_handler(CommandHandler("clear",     clear))
    app.add_handler(CommandHandler("feedback",  feedback))
    app.add_handler(CommandHandler("admin",     admin))
    app.add_handler(CommandHandler("broadcast", broadcast))
    app.add_handler(CallbackQueryHandler(button_handler))
    app.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, text_handler))
    logger.info("Bot started. Press Ctrl+C to stop.")
    app.run_polling(allowed_updates=Update.ALL_TYPES)

if __name__ == "__main__":
    main()
