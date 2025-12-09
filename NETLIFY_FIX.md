# 🚀 Netlify Deployment Fix Guide

## ✅ Issue Fixed

The deployment was failing because Netlify was looking for a `dist` folder, but Next.js builds to `.next`.

**Solution**: Created `netlify.toml` configuration file ✅

## 📋 Steps to Deploy Successfully

### 1. Update Netlify Build Settings

Go to your Netlify dashboard and update these settings:

**Site Settings → Build & Deploy → Build Settings**

Change:
- **Build command**: `npm run build` ✅ (already correct)
- **Publish directory**: Change from `dist` to `.next` ⚠️ **IMPORTANT**

Or just let the `netlify.toml` file handle it (recommended).

### 2. Add Environment Variables

**CRITICAL**: Add your API keys to Netlify!

Go to: **Site Settings → Environment Variables**

Add these variables:

```
NEXT_PUBLIC_PIXABAY_KEY = your_actual_pixabay_key
NEXT_PUBLIC_UNSPLASH_ACCESS_KEY = your_unsplash_key (optional)
NEXT_PUBLIC_FREESOUND_KEY = your_freesound_key (optional)
```

⚠️ **Without these, the app won't work!**

### 3. Trigger Redeploy

Two options:

**Option A: Automatic (Recommended)**
- Netlify will auto-deploy when you push to GitHub
- The new `netlify.toml` file will be used automatically

**Option B: Manual**
- Go to **Deploys** tab
- Click **Trigger deploy** → **Deploy site**

### 4. Verify Deployment

After deployment completes:
1. Check the deploy log for success
2. Visit your site URL
3. Test that music/podcasts load (confirms API keys work)

## 📁 What Was Fixed

### Created `netlify.toml`:
```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

This tells Netlify:
- ✅ Build command: `npm run build`
- ✅ Publish directory: `.next` (not `dist`)
- ✅ Use Next.js plugin

## 🔧 Alternative: Vercel (Recommended for Next.js)

Next.js is made by Vercel, so it works perfectly there:

1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repo
3. Add environment variables
4. Deploy (automatic!)

**Vercel advantages**:
- Zero configuration needed
- Automatic Next.js optimization
- Better performance for Next.js apps

## 🚨 Common Issues & Solutions

### Issue: "Module not found" errors
**Solution**: Make sure all dependencies are in `package.json`
```bash
npm install
```

### Issue: API calls failing
**Solution**: Check environment variables in Netlify dashboard
- Go to Site Settings → Environment Variables
- Verify all keys are added correctly

### Issue: Build succeeds but site is blank
**Solution**: 
1. Check browser console for errors
2. Verify API keys are set in Netlify
3. Check that `.env.local` is NOT pushed to GitHub (it shouldn't be)

### Issue: "Cannot find module '@/components/...'"
**Solution**: This is a path alias issue
- Check `tsconfig.json` has correct paths
- Rebuild: `npm run build`

## 📝 Deployment Checklist

Before deploying:
- ✅ `netlify.toml` exists
- ✅ `.env.local` is NOT in git
- ✅ `.env.example` is in git
- ✅ All dependencies in `package.json`
- ✅ Build works locally: `npm run build`

After deploying:
- ✅ Add environment variables in Netlify
- ✅ Trigger redeploy
- ✅ Test the live site
- ✅ Check API calls work

## 🎯 Next Steps

1. **Push the fix** (already done! ✅)
2. **Add environment variables** in Netlify dashboard
3. **Trigger redeploy** or wait for auto-deploy
4. **Test your live site**

## 📧 Need Help?

If deployment still fails:
1. Check the Netlify deploy log
2. Look for specific error messages
3. Verify environment variables are set
4. Try deploying to Vercel instead (easier for Next.js)

---

**Your fix has been pushed to GitHub!** 🎉

Netlify will auto-deploy the new version with the correct configuration.
