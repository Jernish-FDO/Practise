# 🔨 Advanced Customization Guide

Take your portfolio to the next level with these advanced customizations.

---

## Table of Contents

1. [Custom Color Themes](#custom-color-themes)
2. [Add Custom Fonts](#add-custom-fonts)
3. [Particle Effects](#particle-effects)
4. [Network Visualization](#network-visualization)
5. [Audio Integration](#audio-integration)
6. [Analytics Tracking](#analytics-tracking)
7. [SEO Optimization](#seo-optimization)
8. [Performance Tweaks](#performance-tweaks)

---

## Custom Color Themes

### Theme 1: Cyberpunk Neon

Replace the `:root` CSS variables:

```css
:root {
    --primary: #ff006e;       /* Hot pink */
    --secondary: #1a0033;     /* Dark purple */
    --accent: #ffbe0b;        /* Bright yellow */
    --dark: #0d0221;          /* Almost black */
    --text: #f0f3f4;          /* Light text */
    --text-muted: #8e8e8e;    /* Muted text */
    --border: rgba(255, 0, 110, 0.2);
    --error: #ff006e;
}
```

### Theme 2: Ocean Blue

```css
:root {
    --primary: #0080ff;       /* Bright blue */
    --secondary: #000a1a;     /* Dark navy */
    --accent: #00d4ff;        /* Cyan */
    --dark: #050d1a;          /* Very dark blue */
    --text: #b0d4ff;          /* Light blue text */
    --text-muted: #6a8caf;    /* Muted blue */
    --border: rgba(0, 128, 255, 0.2);
    --error: #ff4466;
}
```

### Theme 3: Forest Green

```css
:root {
    --primary: #00d946;       /* Forest green */
    --secondary: #0a2415;     /* Dark green */
    --accent: #00ff88;        /* Light green */
    --dark: #0d1810;          /* Very dark green */
    --text: #c0ffc0;          /* Light green text */
    --text-muted: #6a9a6a;    /* Muted green */
    --border: rgba(0, 217, 70, 0.2);
    --error: #ff4455;
}
```

### Theme 4: Hacker Terminal

```css
:root {
    --primary: #00ff00;       /* Pure green */
    --secondary: #001a00;     /* Pure dark green */
    --accent: #0080ff;        /* Blue accent */
    --dark: #000000;          /* Pure black */
    --text: #00ff00;          /* Green text */
    --text-muted: #008000;    /* Dark green */
    --border: rgba(0, 255, 0, 0.2);
    --error: #ff0000;          /* Red errors */
}
```

### Create a Theme Switcher

Add this to your HTML before the closing `</head>` tag:

```html
<style>
    :root {
        /* Default theme */
        --primary: #00ff88;
        --accent: #00d4ff;
        /* ... other variables ... */
    }

    body[data-theme="cyberpunk"] {
        --primary: #ff006e;
        --accent: #ffbe0b;
        --secondary: #1a0033;
    }

    body[data-theme="ocean"] {
        --primary: #0080ff;
        --accent: #00d4ff;
        --secondary: #000a1a;
    }

    body[data-theme="forest"] {
        --primary: #00d946;
        --accent: #00ff88;
        --secondary: #0a2415;
    }
</style>
```

Add this JavaScript to switch themes:

```javascript
// Theme switching
const themes = ['default', 'cyberpunk', 'ocean', 'forest'];
let currentThemeIndex = 0;

function switchTheme() {
    currentThemeIndex = (currentThemeIndex + 1) % themes.length;
    const theme = themes[currentThemeIndex];
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);
}

// Load saved theme
const savedTheme = localStorage.getItem('portfolio-theme') || 'default';
if (savedTheme !== 'default') {
    document.body.setAttribute('data-theme', savedTheme);
}

// Add keyboard shortcut (press 'T' to change theme)
document.addEventListener('keydown', (e) => {
    if (e.key === 't' || e.key === 'T') {
        switchTheme();
    }
});
```

---

## Add Custom Fonts

### Using Google Fonts

Replace the font imports:

```html
<!-- Instead of Poppins & Space Mono, try: -->
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet">

<style>
    body {
        font-family: 'Inter', sans-serif;  /* Changed from Poppins */
    }
    
    .hud, .menu {
        font-family: 'JetBrains Mono', monospace;  /* Changed from Space Mono */
    }
</style>
```

**Other Font Combinations:**

```html
<!-- Professional -->
<link href="https://fonts.googleapis.com/css2?family=Lora:wght@400;600&family=IBM+Plex+Mono:wght@400;600&display=swap" rel="stylesheet">

<!-- Modern Minimal -->
<link href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@300;400;500;600;700&family=Courier+Prime:wght@400;700&display=swap" rel="stylesheet">

<!-- Futuristic -->
<link href="https://fonts.googleapis.com/css2?family=Michroma&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
```

---

## Particle Effects

### Customize Particle Count

Find this line in the JavaScript:

```javascript
// Create initial particles
for (let i = 0; i < 50; i++) {  // Change 50 to your desired count
    particles.push(new Particle());
}
```

**Performance Guidelines:**
- Desktop: 50-100 particles
- Laptop: 30-50 particles
- Mobile: 15-30 particles

### Change Particle Color

Find the `draw()` method in the Particle class:

```javascript
draw() {
    ctx.fillStyle = `rgba(0, 255, 136, ${this.opacity})`; // Change this color
    // ...
}
```

Options:
```javascript
// Green (default)
ctx.fillStyle = `rgba(0, 255, 136, ${this.opacity})`;

// Cyan
ctx.fillStyle = `rgba(0, 212, 255, ${this.opacity})`;

// Rainbow
const colors = ['rgba(255, 0, 110, ${this.opacity})', 'rgba(255, 190, 11, ${this.opacity})'];
ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];

// White
ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
```

### Add Particle Trails

Instead of replacing particles, create trails:

```javascript
class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = (Math.random() - 0.5) * 2;
        this.size = Math.random() * 2 + 1;
        this.opacity = Math.random() * 0.5 + 0.2;
        this.trail = [];  // Add trail array
    }

    update() {
        this.trail.push({ x: this.x, y: this.y });
        if (this.trail.length > 10) this.trail.shift();  // Limit trail length
        
        this.x += this.vx;
        this.y += this.vy;
        this.opacity -= 0.002;
        // ... rest of update code ...
    }

    draw() {
        // Draw trail
        ctx.strokeStyle = `rgba(0, 255, 136, 0.3)`;
        ctx.beginPath();
        this.trail.forEach((p, i) => {
            ctx.lineTo(p.x, p.y);
        });
        ctx.stroke();
        
        // Draw particle
        ctx.fillStyle = `rgba(0, 255, 136, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}
```

---

## Network Visualization

### Change Node Labels

Find this code:

```javascript
const nodeLabels = ['Network', 'IoT', 'Cloud', 'Code', 'Security', 'Hardware'];
```

Customize for your skills:

```javascript
// For Web Developer
const nodeLabels = ['Frontend', 'Backend', 'Database', 'DevOps', 'Mobile', 'Cloud'];

// For Data Scientist
const nodeLabels = ['ML', 'Data', 'Analytics', 'AI', 'Pipeline', 'Visualization'];

// For Game Developer
const nodeLabels = ['Graphics', 'Physics', 'AI', 'Audio', 'UI', 'Network'];
```

### Customize Node Colors

Find the Node class `draw()` method:

```javascript
draw() {
    ctx.fillStyle = '#00ff88';  // Change this
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    // ...
}
```

Make nodes different colors:

```javascript
draw() {
    const colors = ['#00ff88', '#00d4ff', '#ffbe0b', '#ff006e', '#00ff00', '#ff0055'];
    const color = colors[this.index % colors.length];  // Needs index property
    
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    // ...
}
```

### Increase/Decrease Connection Distance

Find this line:

```javascript
if (distance < 300) {  // Change 300 to your value
```

**Options:**
- 200 - Nodes only connect when very close
- 300 - Default, balanced
- 500 - Nodes connect from far away

---

## Audio Integration

### Add Background Music

Add to the HTML (before closing `</body>`):

```html
<audio id="bgMusic" loop>
    <source src="https://your-music-url.mp3" type="audio/mpeg">
    Your browser does not support the audio element.
</audio>

<style>
    .music-toggle {
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: rgba(0, 255, 136, 0.2);
        border: 2px solid var(--primary);
        border-radius: 50%;
        color: var(--primary);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.5rem;
        transition: all 0.3s ease;
        z-index: 150;
    }

    .music-toggle:hover {
        background: rgba(0, 255, 136, 0.4);
        transform: scale(1.1);
    }
</style>

<button class="music-toggle" id="musicToggle" title="Toggle Music">🎵</button>

<script>
    const bgMusic = document.getElementById('bgMusic');
    const musicToggle = document.getElementById('musicToggle');
    let isPlaying = false;

    musicToggle.addEventListener('click', () => {
        if (isPlaying) {
            bgMusic.pause();
            musicToggle.textContent = '🔇';
            isPlaying = false;
        } else {
            bgMusic.play();
            musicToggle.textContent = '🎵';
            isPlaying = true;
        }
    });

    // Auto-play on user interaction (for browser policies)
    document.addEventListener('click', () => {
        if (!isPlaying && bgMusic.paused) {
            bgMusic.play();
            musicToggle.textContent = '🎵';
            isPlaying = true;
        }
    }, { once: true });
</script>
```

### Royalty-Free Music Sources

- [Bensound](https://www.bensound.com) - Free background music
- [Free Music Archive](https://freemusicarchive.org) - Various genres
- [YouTube Audio Library](https://www.youtube.com/audiolibrary) - Copyright-free tracks
- [Pixabay Music](https://pixabay.com/music) - Creative Commons

---

## Analytics Tracking

### Add Google Analytics

Add to `<head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

Replace `GA_MEASUREMENT_ID` with your actual ID.

### Track Modal Opens

Add this to your modal opening functions:

```javascript
function openModal(type) {
    // ... existing code ...
    
    // Track event
    if (window.gtag) {
        gtag('event', 'modal_opened', {
            'modal_type': type
        });
    }
}
```

---

## SEO Optimization

### Add JSON-LD Schema

Add to `<head>`:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Amala Jernish",
  "jobTitle": "Network Technician & IoT Developer",
  "image": "https://your-portfolio-url/image.jpg",
  "email": "amalajernish228@gmail.com",
  "telephone": "+916374160486",
  "url": "https://your-portfolio-url",
  "sameAs": [
    "https://github.com/Jernish-FDO",
    "https://linkedin.com/in/yourprofile"
  ],
  "worksFor": {
    "@type": "Organization",
    "name": "Freelance"
  },
  "knowsAbout": ["Network Administration", "IoT", "Linux", "Python", "JavaScript"]
}
</script>
```

### Add Robots Meta Tag

```html
<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">
```

### Create Sitemap

Create `sitemap.xml`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://your-domain.com/</loc>
    <lastmod>2024-12-26</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

---

## Performance Tweaks

### Lazy Load External Resources

```javascript
// Only load non-critical resources when needed
window.addEventListener('load', () => {
    // Load analytics after page is ready
    const script = document.createElement('script');
    script.src = 'analytics.js';
    script.async = true;
    document.head.appendChild(script);
});
```

### Optimize Canvas Rendering

```javascript
// Use offscreen canvas for complex shapes
const offscreenCanvas = new OffscreenCanvas(width, height);
const offscreenCtx = offscreenCanvas.getContext('2d');

// Draw complex shapes to offscreen canvas first
// Then draw to main canvas (faster)
ctx.drawImage(offscreenCanvas, 0, 0);
```

### Reduce Animation Frame Rate

For mobile devices:

```javascript
let frameCount = 0;
const skipFrames = navigator.deviceMemory < 4 ? 2 : 1; // Skip frames on low-end devices

function animate() {
    if (frameCount % skipFrames === 0) {
        // Draw updates
    }
    frameCount++;
    requestAnimationFrame(animate);
}
```

### Debounce Window Resize

```javascript
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }, 150);
});
```

---

## Code Examples Repository

All these snippets are available in production-ready form. Test locally:

```bash
# Clone repository
git clone https://github.com/Jernish-FDO/Practise.git

# Open in browser
open index.html

# Or use local server
python -m http.server 8000
# Visit http://localhost:8000
```

---

## Testing Your Changes

### Quick Test Checklist

✅ **Desktop**
- Chrome, Firefox, Safari
- Different screen sizes
- Dark mode toggle

✅ **Mobile**
- iPhone (Safari)
- Android (Chrome)
- Touch interactions

✅ **Performance**
- Google PageSpeed Insights
- GTmetrix
- WebPageTest

✅ **Accessibility**
- Keyboard navigation
- Screen reader (NVDA/JAWS)
- Color contrast

---

## Common Issues & Solutions

### Issue: Colors not changing
**Solution:** Clear browser cache (Ctrl+Shift+Delete)

### Issue: Particles not showing
**Solution:** Check if particle count is > 0

### Issue: Canvas is black
**Solution:** Verify background color CSS is correct

### Issue: Modal text is invisible
**Solution:** Check color contrast ratio (should be 4.5:1)

---

## Need Help?

Refer to main documentation:
- `README.md` - Full documentation
- `BRUNO_INSPIRED.md` - Design philosophy
- `DEPLOYMENT.md` - Hosting guide

Or reach out:
- 📧 amalajernish228@gmail.com
- 🔗 https://github.com/Jernish-FDO

---

**Make it extraordinary! 🚀**
