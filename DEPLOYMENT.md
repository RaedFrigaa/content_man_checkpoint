# 🚀 Deployment Guide

## Step 1: Push to GitHub

### Option A: Create a new repository on GitHub (Recommended)

1. Go to https://github.com/new
2. Create a new repository (e.g., `cms-fullstack`)
3. Do NOT initialize with README or .gitignore (we have our own)
4. Copy the repository URL (HTTPS or SSH)

### Option B: Push to existing repository

Skip to Step 2 if you already have a repository.

---

## Step 2: Add Remote and Push

```bash
cd c:\Users\MTSTORE\Desktop\content_man_checkpoint

# Add the remote repository (replace with your GitHub URL)
git remote add origin https://github.com/YOUR_USERNAME/cms-fullstack.git

# Rename branch to main (optional but recommended)
git branch -M main

# Push to GitHub
git push -u origin main
```

**Your GitHub Repository URL:** https://github.com/YOUR_USERNAME/cms-fullstack

---

## Step 3: Deploy Frontend to Vercel

### 3.1 Install Dependencies Locally (Optional, for testing)

```bash
cd frontend
npm install
npm run build
```

### 3.2 Deploy to Vercel

1. Go to https://vercel.com/new
2. **Sign in or create a Vercel account** (free)
3. Click "Import Git Repository"
4. Select your GitHub repository
5. Configure project:
   - **Framework Preset**: Next.js
   - **Root Directory**: `frontend`
6. Add environment variables:
   - Key: `NEXT_PUBLIC_API_URL`
   - Value: Set this AFTER backend is deployed
7. Click "Deploy" ✅

### 3.3 Get Your Vercel Frontend URL

After deployment, Vercel will show you: `https://your-app-name.vercel.app`

---

## Step 4: Deploy Backend (Optional - Recommended for Production)

The backend can be deployed to:

### Option A: Render.com (Free Tier - Recommended)

1. Go to https://render.com
2. Create account and connect GitHub
3. Click "New +" → "Web Service"
4. Select your GitHub repository
5. Configure:
   - **Name**: cms-backend
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `node backend/server.js`
   - **Root Directory**: `backend`
6. Deploy ✅

**Get Backend URL from Render**

### Option B: Railway.app (Free Tier)

1. Go to https://railway.app
2. Create account and select "Deploy from GitHub"
3. Connect your repository
4. Configure environment
5. Deploy ✅

---

## Step 5: Update Frontend with Backend URL

Once backend is deployed:

1. Go to Vercel Project Settings
2. Go to "Environment Variables"
3. Update `NEXT_PUBLIC_API_URL` with your backend URL
   - Example: `https://cms-backend-xyz.onrender.com`
4. Redeploy: Click "Deployments" → "..." on latest → "Redeploy"

---

## Final Links to Share

Once everything is deployed:

📍 **Frontend App**: https://your-app-name.vercel.app
📍 **Backend API**: https://cms-backend-xyz.onrender.com
📍 **GitHub Repository**: https://github.com/YOUR_USERNAME/cms-fullstack

---

## 🧪 Testing the Deployment

1. Open your Vercel app URL
2. Create new content
3. Refresh page - content should persist
4. Try deleting content
5. All operations should work seamlessly

---

## ⚠️ Important Notes

- Vercel **frontend is free** ✅
- Render.com/Railway **backend free tier** (may have auto-shutdown)
- For production, consider paid tiers
- Keep GitHub repository public for easier deployment
- Environment variables in Vercel must be set correctly

---

## Troubleshooting

**Frontend can't connect to backend?**

- Check `NEXT_PUBLIC_API_URL` environment variable in Vercel
- Ensure backend is running and accessible
- Check CORS is enabled in backend

**Backend database not persisting?**

- SQLite files won't persist on serverless (data lost on restart)
- For production, use a proper database: MongoDB, PostgreSQL, etc.

---

**🎉 You're ready to deploy!**
