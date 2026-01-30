# Deploy to RAILWAY.APP - Step by Step Guide

**Railway is the BEST for production. Professional setup in 30 minutes!**

---

## Why Railway Over Replit?

✅ Better performance
✅ Free $5/month credits (usually enough)
✅ Professional features
✅ Supports custom domains
✅ Better for production apps
✅ Easy GitHub integration

---

## Step 1: Create Railway Account (2 minutes)

1. Go to https://railway.app
2. Click **"Login"** (top right)
3. Choose **"Login with GitHub"** (easiest)
4. Authorize Railway to access GitHub
5. Complete account setup
6. Done! ✅

---

## Step 2: Link Your GitHub Repository (2 minutes)

1. In Railway, click **"+ New Project"** (top right)
2. Select **"Deploy from GitHub repo"**
3. Search for your repository: `e-chem-chatbot`
4. Select your repository
5. Click **"Deploy Now"**
6. Wait 2-3 minutes for initial setup ✅

---

## Step 3: Set Environment Variables (5 minutes)

### A. Go to Project Settings

1. Click your project name in Railway
2. Go to **"Variables"** tab
3. Add each environment variable:

```
APP_ENV=production
APP_DEBUG=false
APP_KEY=base64:Ps7yKcbOtVOWW0VKeQ5OoNU7WFfY92ZeQ4trJjiRQv0=
LOG_LEVEL=error
GEMINI_API_KEY=[your-gemini-api-key]
```

4. For `APP_URL` and `ALLOWED_ORIGINS`:
   - Wait for Railway to generate your domain first
   - Then update these with your Railway domain

### B. Add Database

1. Click **"+ Add Service"** in Railway
2. Search and select **"PostgreSQL"**
3. Click **"Add"**
4. Railway automatically links DB to your app
5. Environment variables added automatically ✅

(Alternative: Use SQLite if you prefer - already configured)

---

## Step 4: Configure Deployment (5 minutes)

### A. Create Start Command

1. In Railway, go to your project's **"Settings"**
2. Find **"Start Command"**
3. Set to:
   ```bash
   php artisan serve --host=0.0.0.0 --port=$PORT
   ```

### B. Build Command

1. In **"Build Command"** field, add:
   ```bash
   composer install && cd frontend && npm install && npm run build && cd ..
   ```

### C. Runtime Selection

1. Make sure **"PHP"** is selected as runtime
2. Check **"Node.js"** is available for build

---

## Step 5: Configure Database (3 minutes)

If using PostgreSQL:

1. Go to **"Variables"** tab
2. Verify these are auto-set:
   ```
   DATABASE_URL
   DB_HOST
   DB_PORT
   DB_DATABASE
   DB_USERNAME
   DB_PASSWORD
   ```

3. In your app, update `.env`:
   ```
   DB_CONNECTION=pgsql
   ```

If using SQLite:
1. Keep `DB_CONNECTION=sqlite`
2. Create storage directory in Railway shell

---

## Step 6: Add Node.js (For Frontend Build)

1. Go to **"Settings"** 
2. Ensure **"Node.js"** is included in environment
3. Railway automatically handles this during build

---

## Step 7: Configure Web Server (3 minutes)

1. Go to **"Deployments"** tab
2. Wait for build to complete
3. Click the successful deployment
4. Note your Railway domain: `https://your-app.railway.app`

---

## Step 8: Get Your Domain (1 minute)

Railway generates a domain automatically:
```
https://your-project-name.railway.app
```

This appears in the **"Deployments"** tab.

Update your app:
1. Go to **"Variables"**
2. Set:
   ```
   APP_URL=https://your-project-name.railway.app
   ALLOWED_ORIGINS=https://your-project-name.railway.app
   ```
3. Save and redeploy

---

## Step 9: Deploy! (2 minutes)

1. Railway auto-deploys on every Git push
2. Or manually click **"Redeploy"** in Railway
3. Watch logs in **"Deployments"** tab
4. Wait for "Success" status

---

## Step 10: First Time Setup (5 minutes)

After deployment:

1. Go to **"Settings"**
2. Find **"Shell"** or **"Connect"**
3. Run these commands:

```bash
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan migrate --force
```

---

## Your App is Live! ✅

Visit: `https://your-project-name.railway.app`

🎉 **Congratulations!**

---

## Monitoring Your App

### Check Logs
1. In Railway, click **"Logs"**
2. See real-time error logs
3. Monitor for issues

### Monitor Metrics
1. Click **"Metrics"**
2. See CPU, Memory, Network usage
3. Set up alerts if needed

### Free Credits
- Every Railway project gets $5/month FREE
- Perfect for small apps like ours
- Monitor usage in **"Billing"** tab

---

## Troubleshooting on Railway

### Issue: "Build failed"
1. Check **"Build Logs"** in Deployments
2. Look for error messages
3. Common issue: Missing dependencies
   ```bash
   composer install
   cd frontend && npm install
   ```

### Issue: "Database not connecting"
1. Verify PostgreSQL service is running
2. Check **"Variables"** for `DATABASE_URL`
3. Ensure `DB_CONNECTION=pgsql` in .env
4. Run: `php artisan migrate --force`

### Issue: "API endpoint returns 500"
1. Check **"Logs"** tab
2. Look for error details
3. Verify `GEMINI_API_KEY` is set
4. Check permissions on storage directory

### Issue: "Frontend not loading"
1. Verify `npm run build` completed
2. Check build logs
3. Ensure `public/build` or `frontend/build` exists
4. Check file serving configuration

### Issue: "Free credits ran out"
1. Go to **"Billing"**
2. See usage breakdown
3. Either:
   - Wait for next month's $5 credit
   - Add payment method
   - Optimize app to use less resources

---

## Custom Domain (Optional)

### Add Your Own Domain (like chatbot.echem.lk)

1. Buy domain from: GoDaddy, Namecheap, Route53, etc.
2. In Railway, go to **"Settings"**
3. Find **"Domains"**
4. Click **"Add Domain"**
5. Enter your domain: `chatbot.echem.lk`
6. Railway shows DNS records to add
7. Go to your domain registrar
8. Add the DNS records Railway provides
9. Wait 24 hours for DNS propagation
10. Your domain now points to your Railway app!

---

## Using Custom Database (PostgreSQL)

Railway auto-creates PostgreSQL. To use it:

1. Update `.env`:
   ```
   DB_CONNECTION=pgsql
   ```

2. Railway auto-provides `DATABASE_URL`

3. Run migrations:
   ```bash
   php artisan migrate --force
   ```

---

## Keeping App Always Running

✅ Railway keeps your app running 24/7
✅ No sleep timeouts like Replit
✅ Perfect for production

---

## Scaling Your App

### When to Upgrade:
- Using more than $5/month
- Need better performance
- Want more storage

### Options:
1. **Add payment method** - Pay for usage
   - Usually $5-20/month for small apps
2. **Optimize code** - Reduce resource usage
3. **Switch platform** - Move to Heroku, AWS, etc.

---

## GitHub Auto-Deploy

### How it works:
1. Push code to GitHub: `git push origin main`
2. Railway automatically:
   - Detects new commit
   - Builds your project
   - Deploys new version
3. Takes 2-5 minutes

### Disable Auto-Deploy:
1. Go to **"Settings"**
2. Toggle **"Auto-Deploy"** off
3. Manually deploy when needed

---

## Summary

| Step | Action | Time |
|------|--------|------|
| 1 | Create Railway account | 2 min |
| 2 | Link GitHub repo | 2 min |
| 3 | Set environment variables | 5 min |
| 4 | Add PostgreSQL database | 3 min |
| 5 | Configure deployment | 5 min |
| 6 | Configure Node.js | 2 min |
| 7 | Configure web server | 3 min |
| 8 | Get domain | 1 min |
| 9 | Deploy | 2 min |
| 10 | First time setup | 5 min |
| **TOTAL** | | **~30 min** |

---

## What's Included

✅ Free $5/month credits
✅ PostgreSQL database (included)
✅ PHP + Node.js support
✅ GitHub integration
✅ Custom domain support
✅ Auto-deploy on Git push
✅ Real-time logs
✅ Metrics & monitoring
✅ Email support

---

## Next Steps

1. Deploy to Railway following steps above ✅
2. Test your app at Railway domain
3. (Optional) Add custom domain
4. Monitor usage in Billing tab
5. Set up GitHub auto-deploy

---

**Railway is production-ready. Use this for serious apps!**
