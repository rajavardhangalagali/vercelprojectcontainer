# Nexo.AI Vercel Deployment Container

This project serves as the **deployment container** for all user-uploaded websites created through Nexo.AI. Instead of creating a new Vercel project for each user upload, this single project hosts multiple deployments.

## 🎯 Purpose

- **Single Vercel Project**: Acts as a container for all user uploads
- **Multiple Deployments**: Each user upload becomes a separate deployment with a unique URL
- **Public Access**: All deployments are publicly accessible without authentication
- **Centralized Management**: Easier to manage than creating individual projects per user

## 📦 How It Works

```
┌─────────────────────────────────────┐
│   Nexo.AI Backend API               │
│   (Handles user uploads)            │
└──────────────┬──────────────────────┘
               │
               │ Deploys to Vercel API
               ▼
┌─────────────────────────────────────┐
│   This Project (Container)          │
│   nexo-ai-user-uploads              │
├─────────────────────────────────────┤
│   Deployment 1 → URL 1              │
│   Deployment 2 → URL 2              │
│   Deployment 3 → URL 3              │
│   ...                               │
└─────────────────────────────────────┘
```

## 🚀 Initial Setup (One-Time)

### 1. Install Vercel CLI

```bash
npm install -g vercel
```

### 2. Login to Vercel

```bash
vercel login
```

### 3. Deploy This Project to Create the Container

Navigate to this folder and run:

```bash
vercel --prod
```

This will:
- Create a new Vercel project called `nexo-ai-user-uploads`
- Deploy the initial index.html (placeholder page)
- Generate a **Project ID** (you'll need this!)

### 4. Get Your Project ID

After deployment, run:

```bash
vercel ls
```

Or go to your Vercel dashboard and find the project. Copy the **Project ID**.

### 5. Configure Project Settings (Vercel Dashboard)

Go to your Vercel dashboard → Select this project → Settings:

1. **General Settings**:
   - Project Name: `nexo-ai-user-uploads` (or your preference)
   - Framework Preset: `Other`
   - Build Command: Leave empty
   - Output Directory: Leave empty

2. **Deployment Protection** (IMPORTANT):
   - ❌ Disable "Vercel Authentication"
   - ❌ Disable "Password Protection"
   - ❌ Disable "Trusted IPs"
   - ✅ Ensure "Public Access" is enabled

3. **Environment Variables** (Optional):
   - You can add any shared environment variables here if needed

## 🔧 Backend Integration

### Add to Your Backend .env File

```env
VERCEL_PROJECT_ID=prj_xxxxxxxxxxxxxxxxxxxxxx
VERCEL_TOKEN=your_vercel_token_here
VERCEL_TEAM_ID=team_xxxxxxxxxxxx  # Optional, if using a team
```

### Update Backend Code

The backend should use this project ID when deploying user uploads instead of creating new projects.

**Example in `backend/index.js`:**

```javascript
const VERCEL_PROJECT_ID = process.env.VERCEL_PROJECT_ID;

// In deployProject function:
const deploymentPayload = {
  name: VERCEL_PROJECT_ID,  // Use shared project
  project: VERCEL_PROJECT_ID,
  files: userFiles,
  target: 'production'
};
```

## 📋 Deployment Flow

When a user uploads files to Nexo.AI:

1. **Backend receives** user files (HTML, CSS, JS, etc.)
2. **Backend calls** Vercel API to deploy to this project
3. **Vercel creates** a new deployment in this project
4. **Unique URL generated** for that specific deployment
5. **User receives** the public URL (e.g., `https://nexo-ai-user-uploads-abc123.vercel.app`)

## ✅ Benefits

- **No Authentication Required**: URLs work for anyone (perfect for sharing)
- **Easier Management**: One project to configure vs. hundreds
- **Consistent Settings**: All deployments inherit the same public access settings
- **Lower Overhead**: No project creation API calls needed
- **Organized Structure**: All user deployments in one place

## 🔍 Monitoring Deployments

View all deployments:
```bash
vercel ls nexo-ai-user-uploads
```

Or check the Vercel dashboard for this project.

## 🛠️ Troubleshooting

### Deployment showing "Authenticating..."

1. Go to Vercel Dashboard → Project Settings → Deployment Protection
2. Make sure all protection options are disabled
3. Redeploy or wait for next deployment

### Can't find Project ID

```bash
vercel projects ls
```

Find your project in the list and copy the ID.

### API Returns 403 Forbidden

- Check that `VERCEL_TOKEN` has correct permissions
- If using a team, ensure `VERCEL_TEAM_ID` is set correctly

## 📚 Documentation

- [Vercel API - Deployments](https://vercel.com/docs/rest-api/endpoints/deployments)
- [Vercel API - Projects](https://vercel.com/docs/rest-api/endpoints/projects)
- [Deployment Protection](https://vercel.com/docs/security/deployment-protection)

## 🔐 Security Notes

- This project is intentionally public to allow user-shared URLs
- Each deployment is isolated (users can't access each other's files)
- Consider rate limiting on your backend to prevent abuse
- Monitor deployment counts to stay within Vercel plan limits

## 📞 Support

For issues related to:
- **Nexo.AI Backend**: Check main project documentation
- **Vercel Platform**: https://vercel.com/support
- **This Setup**: Refer to this README or backend team

---

**Created by Nexo.AI** | Powered by Vercel
