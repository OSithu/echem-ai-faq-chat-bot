# Deploy to REPLIT - Step by Step Guide

**Replit is the EASIEST free option. Complete in 15-20 minutes!**

---

## Step 1: Create Replit Account (2 minutes)

1. Go to https://replit.com
2. Click **"Sign up"** (top right)
3. Use GitHub account OR email
4. Verify email if needed
5. Done! ✅

---

## Step 2: Import Your Project (3 minutes)

### Method A: From GitHub (Recommended)
1. In Replit, click **"Create"** (top left)
2. Select **"Import from GitHub"**
3. Paste your GitHub repository URL:
   ```
   https://github.com/YOUR_USERNAME/e-chem-chatbot
   ```
4. Click **"Import from GitHub"**
5. Wait 1-2 minutes for import ✅

### Method B: Upload Files
1. Click **"Create"** → **"New Repl"**
2. Choose language: **"PHP"**
3. Name it: `echem-chatbot`
4. Click **"Create Repl"**
5. Upload your project files

---

## Step 3: Configure Environment (5 minutes)

### A. Set Environment Variables

1. Click **"Secrets"** (lock icon, left sidebar)
2. Add each variable:

   ```
   APP_ENV=production
   APP_DEBUG=false
   APP_KEY=base64:Ps7yKcbOtVOWW0VKeQ5OoNU7WFfY92ZeQ4trJjiRQv0=
   APP_URL=[your-replit-url]
   LOG_LEVEL=error
   GEMINI_API_KEY=[your-api-key]
   ALLOWED_ORIGINS=[your-replit-url]
   ```

3. For `APP_URL` and `ALLOWED_ORIGINS`, use:
   ```
   https://your-project-name.username.repl.co
   ```
   (You'll get the exact URL after first run)

### B. Create database directory

In the Replit terminal, run:
```bash
mkdir -p database
touch database/database.sqlite
```

---

## Step 4: Install Dependencies (3 minutes)

In the Replit terminal, run:

```bash
# Backend dependencies
composer install

# Frontend dependencies
cd frontend
npm install
cd ..
```

---

## Step 5: Setup Database (2 minutes)

In the terminal, run:
```bash
php artisan migrate --force
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

---

## Step 6: Build Frontend (3 minutes)

In the terminal, run:
```bash
cd frontend
REACT_APP_API_URL=https://your-project-name.username.repl.co/api/chat npm run build
cd ..
```

⚠️ Replace `your-project-name` with your actual Replit project name

---

## Step 7: Create Start Script (2 minutes)

1. Create file `.replit` in project root (Replit uses this)
2. Add content:
   ```
   run = "php artisan serve --host=0.0.0.0 --port=8080"
   ```

3. Create/update `public/.htaccess`:
   ```apache
   <IfModule mod_rewrite.c>
       RewriteEngine On
       RewriteBase /
       RewriteCond %{REQUEST_FILENAME} !-f
       RewriteCond %{REQUEST_FILENAME} !-d
       RewriteRule ^(.*)$ index.php [L]
   </IfModule>
   ```

---

## Step 8: Deploy (1 minute)

### Option A: Auto-Deploy (Recommended)
1. Click the **"Run"** button (top button)
2. Replit automatically deploys
3. Wait for "Listening on..." message

### Option B: Manual Deploy via Git
```bash
git push origin main
# Replit auto-deploys on push
```

---

## Step 9: Access Your App (Done!)

Your app will be available at:
```
https://your-project-name.username.repl.co
```

🎉 **Congratulations! Your app is LIVE!**

---

## Troubleshooting on Replit

### Issue: "Composer not found"
```bash
# Install PHP dependencies
apt update
apt install composer
composer install
```

### Issue: "Database error"
```bash
# Ensure database is writable
chmod -R 777 database storage
php artisan migrate --force
```

### Issue: "API endpoint not working"
1. Check Secrets are set correctly
2. Verify `GEMINI_API_KEY` is correct
3. Check logs: Click **"Run"** to see errors

### Issue: "Frontend not loading"
```bash
# Rebuild frontend
cd frontend
npm run build
# Check that build folder exists
```

### Issue: "Port 8080 already in use"
```bash
# Kill existing process
pkill -f "php artisan serve"
# Run again
php artisan serve --host=0.0.0.0 --port=8080
```

---

## Getting Your Exact Replit URL

After clicking "Run", you'll see:
```
Listening on 0.0.0.0:8080
```

Your public URL is automatically generated and shown in the top bar of the Replit editor.

It will look like:
```
https://ProjectName.YourUsername.repl.co
```

---

## Keeping Your App Always Running (Optional Paid Feature)

By default, Replit free tier sleeps after 30 minutes. To keep it always running:

1. Upgrade to **Replit Pro** ($7/month)
2. Or use external uptime monitor like **Uptimerobot** (FREE)

### Using Uptimerobot (FREE):
1. Go to https://uptimerobot.com
2. Create free account
3. Add monitor:
   - URL: `https://your-project.username.repl.co/up`
   - Interval: 5 minutes
4. This will ping your app every 5 minutes (keeps it awake!)

---

## Scaling Up Later

### When to Upgrade:
- App goes down frequently
- Response times are slow
- You have 100+ daily users
- You want custom domain

### Upgrade Path:
- **Light**: Replit Pro ($7/mo) - Same platform, unlimited resources
- **Professional**: Switch to Railway.app ($5-10/mo) - Better performance

---

## Summary

| Step | Action | Time |
|------|--------|------|
| 1 | Create Replit account | 2 min |
| 2 | Import project from GitHub | 3 min |
| 3 | Set environment variables | 5 min |
| 4 | Install dependencies | 3 min |
| 5 | Setup database | 2 min |
| 6 | Build frontend | 3 min |
| 7 | Create start script | 2 min |
| 8 | Deploy | 1 min |
| 9 | Access your app | ✅ |
| **TOTAL** | | **~20 min** |

---

## What's Included in FREE Tier

✅ 2 GB storage (plenty for our app)
✅ Free databases (SQLite/PostgreSQL)
✅ PHP, Node.js, etc. support
✅ Git integration
✅ Free domain (`*.repl.co`)
✅ Email support
✅ Public repositories

---

## Next: Configure Custom Domain (Optional)

If you want your own domain (like `chatbot.echem.lk`):

1. Buy domain from GoDaddy, Namecheap, etc. ($1-10/year)
2. In Replit: **Tools** → **Domain**
3. Add your domain
4. Update DNS records (instructions provided)
5. Wait 24 hours for DNS propagation

---

**You're ready to deploy! Start with Step 1 above.**
