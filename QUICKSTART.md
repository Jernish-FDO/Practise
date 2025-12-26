# ⚡ Quick Start Guide - Portfolio Setup

Get your advanced portfolio up and running in 5 minutes!

---

## Step 1: Update Personal Information

### Location: Around Line 256 (Hero Section)

**Change:**
```html
<h1>Hi, I'm <span class="highlight">Amala Jernish</span></h1>
<p>Network Technician • IoT Developer • Linux Enthusiast</p>
```

**To:**
```html
<h1>Hi, I'm <span class="highlight">YOUR NAME</span></h1>
<p>YOUR TITLE • YOUR FIELD • YOUR EXPERTISE</p>
```

---

## Step 2: Update Social Links

### Location: Around Line 285 (Hero Social Links)

**Update these links:**

```html
<!-- GitHub -->
<a href="https://github.com/YOUR-USERNAME" class="social-icon">
    <i class="fab fa-github"></i>
</a>

<!-- Email -->
<a href="mailto:YOUR-EMAIL@example.com" class="social-icon">
    <i class="fas fa-envelope"></i>
</a>

<!-- LinkedIn -->
<a href="https://linkedin.com/in/YOUR-PROFILE" class="social-icon">
    <i class="fab fa-linkedin"></i>
</a>
```

---

## Step 3: Customize Skills Section

### Location: Around Line 330 (Skills Grid)

**Example - Modify a skill card:**

```html
<div class="skill-card">
    <h3><i class="fas fa-network-wired"></i> Your Category</h3>
    <div class="skill-tags">
        <span class="tag">Skill 1</span>
        <span class="tag">Skill 2</span>
        <span class="tag">Skill 3</span>
        <span class="tag">Skill 4</span>
        <span class="tag">Skill 5</span>
        <span class="tag">Skill 6</span>
    </div>
</div>
```

**Find icons:** [Font Awesome Icon Search](https://fontawesome.com/icons)

---

## Step 4: Add Your Projects

### Location: Around Line 410 (Projects Grid)

**Template for new project:**

```html
<div class="project-card">
    <div class="project-image">
        <i class="fas fa-PROJECT-ICON"></i>  <!-- Change icon -->
    </div>
    <div class="project-content">
        <h3>Project Title</h3>
        <p>Brief description of your project and what it does.</p>
        <div class="project-tech">
            <span class="tech-badge">Technology 1</span>
            <span class="tech-badge">Technology 2</span>
            <span class="tech-badge">Technology 3</span>
        </div>
        <div class="project-links">
            <a href="https://github.com/YOUR-USERNAME/PROJECT" class="project-link">
                <i class="fab fa-github"></i> Code
            </a>
            <a href="https://your-project-demo.com" class="project-link">
                <i class="fas fa-external-link-alt"></i> Demo
            </a>
        </div>
    </div>
</div>
```

**Repeat this block for each project.**

---

## Step 5: Update Experience Timeline

### Location: Around Line 500 (Timeline)

**Template for experience:**

```html
<div class="timeline-item">
    <div class="timeline-dot"></div>
    <div class="timeline-content">
        <h3>Your Position/Degree Title</h3>
        <div class="date">Start Year - End Year</div>
        <p>Description of what you did, skills learned, or achievements.</p>
    </div>
</div>
```

**Example:**
```html
<div class="timeline-item">
    <div class="timeline-dot"></div>
    <div class="timeline-content">
        <h3>Senior Developer - ABC Company</h3>
        <div class="date">2022 - 2024</div>
        <p>Led team of 5 developers building cloud-native applications with microservices architecture.</p>
    </div>
</div>
```

---

## Step 6: Update Contact Information

### Location: Around Line 550 (Contact Section)

**Update email:**
```html
<a href="mailto:YOUR-EMAIL@example.com" style="color: rgba(255, 255, 255, 0.8); text-decoration: none;">
    your-email@example.com
</a>
```

**Update phone:**
```html
<p style="color: rgba(255, 255, 255, 0.8);">+91 YOUR PHONE NUMBER</p>
```

**Update location:**
```html
<p style="color: rgba(255, 255, 255, 0.8);">Your City, State, Country</p>
```

---

## Step 7: Change Color Scheme (Optional)

### Location: Around Line 29 (CSS Variables)

**Current colors:**
```css
:root {
    --primary: #00d4ff;      /* Cyan - main color */
    --secondary: #0a2463;    /* Navy Blue */
    --accent: #247ba0;       /* Teal */
    --light: #f0f3f4;        /* Light gray */
    --dark: #1a1a2e;         /* Dark blue */
    --text: #eee;            /* Light text */
}
```

**Popular color combinations:**

### Purple Theme
```css
--primary: #a78bfa;      /* Purple */
--secondary: #5b21b6;    /* Dark Purple */
--accent: #7c3aed;       /* Violet */
```

### Green Theme
```css
--primary: #10b981;      /* Green */
--secondary: #064e3b;    /* Dark Green */
--accent: #059669;       /* Teal Green */
```

### Red Theme
```css
--primary: #ef4444;      /* Red */
--secondary: #7f1d1d;    /* Dark Red */
--accent: #dc2626;       /* Darker Red */
```

### Orange Theme
```css
--primary: #f97316;      /* Orange */
--secondary: #7c2d12;    /* Dark Orange */
--accent: #ea580c;       /* Burnt Orange */
```

---

## Step 8: Deploy to GitHub Pages

### Option A: Using GitHub Web Interface

1. Go to your repository settings
2. Scroll to "Pages" section
3. Select "main" branch as source
4. Click Save
5. Your site will be live at: `https://USERNAME.github.io/Practise/`

### Option B: Using Git Command Line

```bash
# Navigate to your project
cd Practise

# Add all changes
git add .

# Commit with message
git commit -m "Update portfolio with custom content"

# Push to GitHub
git push origin main
```

---

## Step 9: Enable Dark/Light Mode (Already Built-in!)

Click the "Dark" button in the top right to toggle themes. Your preference is saved automatically!

---

## Step 10: Test Responsiveness

1. Open in browser (Chrome/Firefox/Safari)
2. Press `F12` or right-click → Inspect
3. Click device toggle icon (top left)
4. Test on different screen sizes:
   - Desktop (1920x1080)
   - Tablet (768x1024)
   - Mobile (375x667)

---

## Common Customizations

### Add New Skill Category

```html
<div class="skill-card">
    <h3><i class="fas fa-icon-name"></i> New Category</h3>
    <div class="skill-tags">
        <span class="tag">Skill A</span>
        <span class="tag">Skill B</span>
    </div>
</div>
```

### Add Social Link

Find your social platform icon at [Font Awesome](https://fontawesome.com/icons)

```html
<!-- Add to social-links section -->
<a href="https://twitter.com/YOUR-HANDLE" class="social-icon" title="Twitter">
    <i class="fab fa-twitter"></i>
</a>
```

### Change Font

Replace in Google Fonts import (line ~9):
```html
<!-- From: -->
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">

<!-- To (example - Roboto): -->
<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;600;700&display=swap" rel="stylesheet">

<!-- And update CSS: -->
<style>
    body {
        font-family: 'Roboto', sans-serif; /* Changed from Poppins */
    }
</style>
```

---

## Troubleshooting

### Portfolio Not Showing Up?
- Clear browser cache (Ctrl+Shift+Delete)
- Wait 5-10 minutes for GitHub Pages to build
- Check branch is set to "main"

### Styling Looks Broken?
- Make sure you didn't accidentally delete CSS
- Check browser console (F12) for errors
- Verify all font imports are correct

### Form Not Working?
- Emails open in default email client
- Make sure email is updated in contact section
- Check browser doesn't block mailto links

### Icons Not Showing?
- Verify Font Awesome CDN is loaded
- Check internet connection
- Verify icon class names are correct

---

## Next Steps

✅ Customize all personal information  
✅ Update skills and projects  
✅ Choose color scheme  
✅ Test on mobile devices  
✅ Deploy to GitHub Pages  
✅ Share your portfolio link!  

---

## Resources

- [Font Awesome Icons](https://fontawesome.com/icons)
- [Google Fonts](https://fonts.google.com/)
- [CSS Color Picker](https://www.w3schools.com/colors/colors_picker.asp)
- [Markdown Guide](https://www.markdownguide.org/)
- [GitHub Pages Docs](https://docs.github.com/en/pages)

---

## Need Help?

🐛 **Found a bug?** Open an issue on GitHub  
💬 **Have a suggestion?** Create a discussion  
📧 **Want to contribute?** Send a pull request  

---

**Happy portfolio building! 🚀**
