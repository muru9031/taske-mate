# 🚀 Task Mate - Deployment Guide

## Quick Deployment Options

### Option 1: Vercel (Recommended - Easiest)

#### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

#### Step 2: Login to Vercel
```bash
vercel login
```

#### Step 3: Deploy
```bash
cd task-mate-frontend
vercel
```

Follow the prompts:
- Set up and deploy? **Y**
- Which scope? Select your account
- Link to existing project? **N**
- Project name? **task-mate** (or your choice)
- Directory? **./** (press Enter)
- Override settings? **N**

#### Step 4: Production Deployment
```bash
vercel --prod
```

Your app will be live at: `https://task-mate-xxx.vercel.app`

---

### Option 2: Netlify

#### Method A: Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Build the project
npm run build

# Deploy
netlify deploy

# For production
netlify deploy --prod
```

#### Method B: Netlify Drop (No CLI)

1. Build your project:
   ```bash
   npm run build
   ```

2. Go to [https://app.netlify.com/drop](https://app.netlify.com/drop)

3. Drag and drop the `dist` folder

4. Your site is live!

#### Method C: GitHub Integration

1. Push code to GitHub
2. Go to [https://app.netlify.com](https://app.netlify.com)
3. Click "New site from Git"
4. Connect your GitHub repository
5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Click "Deploy site"

---

### Option 3: GitHub Pages

#### Step 1: Install gh-pages
```bash
npm install --save-dev gh-pages
```

#### Step 2: Update package.json
Add these lines to `package.json`:
```json
{
  "homepage": "https://yourusername.github.io/task-mate",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

#### Step 3: Update vite.config.js
```javascript
export default defineConfig({
  plugins: [react()],
  base: '/task-mate/'
})
```

#### Step 4: Deploy
```bash
npm run deploy
```

Your app will be live at: `https://yourusername.github.io/task-mate`

---

### Option 4: Render

1. Push code to GitHub
2. Go to [https://render.com](https://render.com)
3. Click "New +" → "Static Site"
4. Connect your GitHub repository
5. Settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Click "Create Static Site"

---

## Pre-Deployment Checklist

Before deploying, ensure:

- [ ] All dependencies are installed
- [ ] Project builds successfully (`npm run build`)
- [ ] No console errors in development
- [ ] All routes work correctly
- [ ] Login/logout functionality works
- [ ] Role-based access control works
- [ ] Mock data is properly loaded

## Test Build Locally

```bash
# Build the project
npm run build

# Preview the build
npm run preview
```

Open `http://localhost:4173` to test the production build.

---

## Environment Variables (For Future Backend Integration)

When you integrate the backend, create a `.env` file:

```env
VITE_API_URL=https://your-backend-api.com
VITE_API_KEY=your-api-key
```

Access in code:
```javascript
const API_URL = import.meta.env.VITE_API_URL;
```

---

## Custom Domain Setup

### Vercel
1. Go to your project dashboard
2. Settings → Domains
3. Add your custom domain
4. Update DNS records as instructed

### Netlify
1. Go to Site settings → Domain management
2. Add custom domain
3. Update DNS records

---

## Troubleshooting

### Issue: 404 on page refresh
**Solution:** Already configured in `netlify.toml` and `vercel.json`

### Issue: Build fails
**Solution:** 
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Issue: Routes not working
**Solution:** Ensure SPA redirect rules are configured (already done in config files)

---

## Post-Deployment Testing

After deployment, test:

1. ✅ Landing page loads
2. ✅ Login as Admin works
3. ✅ Login as User works
4. ✅ Dashboard displays correctly
5. ✅ Task creation works (Admin)
6. ✅ Task status update works (User)
7. ✅ Team management works (Admin)
8. ✅ User listing works (Admin)
9. ✅ Navigation between pages works
10. ✅ Logout works

---

## Sharing Your Deployed App

Once deployed, share:
- **Live URL:** `https://your-app.vercel.app`
- **Demo Credentials:**
  - Admin: admin@taskmate.com / admin123
  - User: rajesh@taskmate.com / user123

---

## Monitoring & Analytics (Optional)

### Add Google Analytics
1. Get tracking ID from Google Analytics
2. Add to `index.html`:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
```

### Vercel Analytics
```bash
npm install @vercel/analytics
```

Add to `main.jsx`:
```javascript
import { Analytics } from '@vercel/analytics/react';

// In your component
<Analytics />
```

---

## Continuous Deployment

### Vercel/Netlify with GitHub
Once connected, every push to main branch automatically deploys!

```bash
git add .
git commit -m "Update feature"
git push origin main
```

Your site updates automatically! 🎉

---

## Cost

All these platforms offer **FREE** hosting for static sites:
- ✅ Vercel: Free tier (100GB bandwidth)
- ✅ Netlify: Free tier (100GB bandwidth)
- ✅ GitHub Pages: Free (unlimited)
- ✅ Render: Free tier

---

## Recommended: Vercel

**Why Vercel?**
- Fastest deployment
- Automatic HTTPS
- Great performance
- Easy custom domains
- Excellent for React apps
- Free tier is generous

---

## Need Help?

- Vercel Docs: https://vercel.com/docs
- Netlify Docs: https://docs.netlify.com
- GitHub Pages: https://pages.github.com

---

## Quick Deploy Command (Vercel)

```bash
cd task-mate-frontend && vercel --prod
```

That's it! Your app is live! 🚀
