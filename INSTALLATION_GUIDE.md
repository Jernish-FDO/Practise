# 🚀 Installation & Quick Start Guide

## ⏱️ Time Required: 5 Minutes

---

## ✅ Step 1: Prerequisites Check (1 min)

### Check Node.js Installation

```bash
node --version      # Should be v16.0.0 or higher
npm --version       # Should be v7.0.0 or higher
git --version       # Should show git version
```

### If not installed:
- **Node.js & npm**: https://nodejs.org/ (Download LTS)
- **Git**: https://git-scm.com/

---

## ✅ Step 2: Clone & Install (2 min)

### Navigate to Project

```bash
# Navigate to your project directory
cd Practise

# You should see these files:
# - package.json
# - vite.config.js
# - tailwind.config.js
# - src/ folder
```

### Install All Dependencies

```bash
npm install
```

**What gets installed:**
- React 18.2
- Vite 5.0
- Tailwind CSS 3.3
- Framer Motion
- React Router
- And 15+ more packages

**Expected time:** 1-2 minutes

**Expected output:**
```
added 250+ packages in 1m 45s
```

---

## ✅ Step 3: Start Development Server (1 min)

### Launch the Server

```bash
npm run dev
```

**Expected output:**
```
  VITE v5.0.0  ready in 324 ms

  ➜  Local:   http://localhost:3000/
  ➜  Press h to show help
```

### Your Portfolio Opens Automatically! 🎉

If not, manually visit: `http://localhost:3000`

---

## 🎨 Step 4: Customize (While Running)

### Real-Time Updates (HMR)

While `npm run dev` is running:

1. **Edit any file** in `src/`
2. **Save the file**
3. **Browser updates automatically** ⚡

### Quick Edits to Try

**Edit your name:**
```javascript
// src/pages/Home.jsx - Line 25
<h1 className="text-5xl sm:text-7xl font-bold text-glow-lg mb-4">
  Your Name Here  {/* 👈 Change this */}
</h1>
```

**Change colors:**
```javascript
// tailwind.config.js - Line 8
colors: {
  primary: '#ff006e',  // 👈 Change from #00ff88 to #ff006e
  accent: '#ffbe0b',   // 👈 Change from #00d4ff to #ffbe0b
}
```

**Watch the changes appear instantly!** 🚀

---

## 🛑 Step 5: Stop Development (When Done)

### Stop the Server

```bash
Ctrl + C    # On Windows/Linux
Cmd + C     # On Mac
```

**Output:**
```
^C
Shutting down...
```

---

## 📦 Step 6: Build for Production

### Create Optimized Version

```bash
npm run build
```

**Expected output:**
```
dist/
├── index.html              ~3KB
├── assets/
│   ├── index-abc123.js     ~35KB
│   ├── vendor-xyz789.js    ~15KB
│   └── style-def456.css    ~2KB

build complete in 2.45s
```

### Files Location
- All production files go to `dist/` folder
- Ready to deploy!

---

## 🌐 Step 7: Deploy (Choose One)

### Option A: Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow the prompts
```

✅ **Pros:**
- Free hosting
- Auto-deploys from GitHub
- Global CDN
- Analytics included

### Option B: Netlify

```bash
# Build first
npm run build

# Deploy
npm i -g netlify-cli
netlify deploy --prod --dir=dist
```

✅ **Pros:**
- Easy drag & drop
- GitHub integration
- Great support

### Option C: GitHub Pages

```bash
# Update vite.config.js
# base: '/Practise/',

# Build
npm run build

# Push to GitHub
git add .
git commit -m "Deploy portfolio"
git push origin main

# Enable in GitHub Settings > Pages
```

✅ **Pros:**
- Free
- Native to GitHub
- Easy updates

---

## 📚 Common Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run preview          # Preview production build locally

# Code Quality
npm run lint             # Check code quality
npm run format           # Auto-format code

# Troubleshooting
npm install              # Reinstall dependencies
rm -rf node_modules      # Clear node_modules
npm cache clean --force  # Clear npm cache
```

---

## 🎯 Project Structure You'll See

```
Practise/
├── src/
│   ├── main.jsx          # ← React app starts here
│   ├── App.jsx           # ← Routes and main component
│   ├── index.css         # ← Global styles
│   ├── pages/            # ← 5 page components
│   ├── components/       # ← Reusable components
│   └── store/            # ← State management
├── dist/                 # ← Created by `npm run build`
├── node_modules/         # ← Created by `npm install`
├── package.json          # ← Dependencies list
├── vite.config.js        # ← Build configuration
├── tailwind.config.js    # ← Styling configuration
└── index.html            # ← HTML entry point
```

---

## 🔧 Troubleshooting Quick Fixes

### "Port 3000 already in use"

```bash
npm run dev -- --port 3001
```

### "Module not found" error

```bash
rm -rf node_modules
npm install
npm run dev
```

### "Styles not showing"

```javascript
// Check that index.css is imported in src/main.jsx
import './index.css'
```

### "Tailwind not working"

```bash
# Clear cache and rebuild
rm -rf .vite
npm run dev
```

---

## 📋 Customization Checklist

While development server is running, edit these files:

### Content
- [ ] `src/pages/Home.jsx` - Update your name
- [ ] `src/pages/About.jsx` - Update bio
- [ ] `src/pages/Projects.jsx` - Add your projects
- [ ] `src/pages/Skills.jsx` - Update skills
- [ ] `src/pages/Contact.jsx` - Update contact info
- [ ] `src/components/Navbar.jsx` - Update social links

### Styling
- [ ] `tailwind.config.js` - Change colors
- [ ] `src/index.css` - Adjust CSS variables
- [ ] Add your logo/image

### Configuration
- [ ] `package.json` - Update project name/description
- [ ] `.env.local` - Add environment variables

---

## 🚀 Your First Deployment (5 min)

### Quick Vercel Deploy

```bash
# Step 1: Sign up (free)
# Visit: https://vercel.com
# Click "Sign Up"
# Use GitHub account

# Step 2: Install CLI
npm i -g vercel

# Step 3: Deploy
vercel

# Step 4: Follow prompts
# ✓ Create account?
# ✓ Link to GitHub project?
# ✓ Deploy?

# Step 5: Get URL
# Your site is live at: https://your-site.vercel.app
```

**That's it! You're deployed!** 🎉

---

## 📱 Test on Mobile

### While Dev Server Running

```bash
# Get your machine IP
ipconfig getifaddr en0  # Mac
ipconfig get ipv4       # Windows (in WSL)

# Visit on phone (same network):
http://YOUR_IP:3000
```

---

## 📖 Next: Read Documentation

After you get it running:

1. **README_REACT.md** - Overview and features
2. **REACT_VITE_SETUP.md** - Detailed setup
3. **REACT_ULTIMATE_FEATURES.md** - All capabilities
4. **ADVANCED_CUSTOMIZATION.md** - Code examples

---

## ✨ What Happens When You Run Commands

### `npm install`
- Downloads all dependencies from npm
- Creates `node_modules/` folder
- Installs 250+ packages
- Takes 1-2 minutes

### `npm run dev`
- Starts Vite dev server
- Opens browser to localhost:3000
- Watches files for changes
- Hot reloads instantly (HMR)
- Shows updates without page refresh

### `npm run build`
- Compiles React code
- Minifies JavaScript
- Optimizes CSS
- Creates `dist/` folder
- Ready for deployment

---

## 💾 Save Your Work

### Commit Changes

```bash
# See what changed
git status

# Stage all changes
git add .

# Commit with message
git commit -m "Customize portfolio with my info"

# Push to GitHub
git push origin main

# If using Vercel: Auto-deploys! 🚀
```

---

## 🎓 Learning Path

### If You're New to React
1. Read React docs: https://react.dev
2. Complete quick start: ~2 hours
3. Build small project: ~1 day
4. Build this portfolio: ~1 week

### If You're Experienced
1. Skim the docs
2. Explore the codebase
3. Start customizing
4. Deploy immediately

---

## 🆘 Need Help?

### Documentation
- 📖 Check **REACT_VITE_SETUP.md** for detailed setup
- 🔍 Search in **README_REACT.md** for quick answers
- 💻 Browse **ADVANCED_CUSTOMIZATION.md** for code examples

### Online Resources
- React Docs: https://react.dev
- Vite Guide: https://vitejs.dev
- Tailwind CSS: https://tailwindcss.com
- Stack Overflow: Tag 'react' or 'vite'

### Personal Support
- 📧 Email: amalajernish228@gmail.com
- 🔗 GitHub: @Jernish-FDO
- 📱 Phone: +91 6374 160 486

---

## ✅ You're Ready!

### Summary
✅ Prerequisites checked
✅ Dependencies installed
✅ Dev server running
✅ Know how to customize
✅ Know how to deploy
✅ Have documentation

### Start Building!
```bash
cd Practise
npm install
npm run dev
```

**Your advanced portfolio is ready to customize and launch!** 🚀

---

<div align="center">

### Questions? Read the Docs

1. **README_REACT.md** - Quick start (5 min read)
2. **REACT_VITE_SETUP.md** - Complete guide (20 min read)
3. **IMPLEMENTATION_SUMMARY.md** - What was built (10 min read)

### Ready to Deploy?

```bash
vercel
```

**That's it! You're live!** ✨

</div>
