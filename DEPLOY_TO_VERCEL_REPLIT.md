# Deploy to VERCEL + REPLIT (Split Deployment)

**Best for maximum performance - Frontend & Backend on separate platforms**

---

## Overview

- **Frontend (React):** Deployed to Vercel (FREE, blazing fast)
- **Backend (Laravel):** Deployed to Replit (FREE)
- **Result:** Best performance at no cost

**Total setup time: 45 minutes**

---

## Part 1: Deploy Backend to Replit (20 minutes)

👉 **Follow:** [DEPLOY_TO_REPLIT.md](DEPLOY_TO_REPLIT.md) steps 1-8

By the end you'll have:
```
https://your-project-name.username.repl.co/api/chat
```

---

## Part 2: Deploy Frontend to Vercel (20 minutes)

### Step 1: Create Vercel Account (2 minutes)

1. Go to https://vercel.com
2. Click **"Sign Up"** (top right)
3. Choose **"Sign up with GitHub"** (easiest)
4. Authorize Vercel
5. Done! ✅

---

### Step 2: Deploy Frontend Project (5 minutes)

1. In Vercel, click **"Add New..."** (top menu)
2. Select **"Project"**
3. Find your GitHub repo: `e-chem-chatbot`
4. Click **"Import"**

---

### Step 3: Configure Build Settings (8 minutes)

Vercel shows build settings. Change to:

**Framework Preset:**
```
React
```

**Root Directory:**
```
frontend/
```

**Build Command:**
```
npm run build
```

**Output Directory:**
```
build/
```

---

### Step 4: Add Environment Variables (3 minutes)

In Vercel deployment settings:

Click **"Environment Variables"** and add:

```
REACT_APP_API_URL = https://your-replit-project.username.repl.co/api/chat
```

⚠️ Use your **exact Replit URL** from Part 1

---

### Step 5: Deploy (2 minutes)

1. Scroll to top
2. Click **"Deploy"** button
3. Wait for deployment to complete
4. You'll see "Congratulations!"

---

### Step 6: Get Your Vercel URL

After deployment, you'll see:
```
https://your-project-name.vercel.app
```

This is your live app! ✅

---

## Part 3: Connect Frontend & Backend

### Update Replit CORS

Go back to Replit:

1. Click **"Secrets"** (left sidebar)
2. Update `ALLOWED_ORIGINS`:
   ```
   https://your-project-name.vercel.app
   ```
3. Click **"Run"** to restart backend

---

## Verify Everything Works

### Test Backend API

```bash
curl -X POST https://your-replit-project.username.repl.co/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"Test message"}'
```

Should return JSON response ✅

---

### Test Frontend

1. Visit: `https://your-project-name.vercel.app`
2. Type a message
3. Click Send
4. You should get a response!

✅ **Your app is live!**

---

## Benefits of This Setup

✅ **Frontend:** Vercel (blazing fast, global CDN)
✅ **Backend:** Replit (simple, easy to manage)
✅ **Best Performance:** Frontend cached globally
✅ **Separation of Concerns:** Easy to manage separately
✅ **Independent Scaling:** Scale each independently
✅ **Completely FREE:** No credit card needed

---

## Managing Deployments

### Frontend Changes

Push to GitHub:
```bash
git push origin main
```

Vercel auto-deploys!

---

### Backend Changes

In Replit:
1. Click **"Run"** to restart
2. Or git push if connected

---

## Adding Custom Domain (Optional)

### Add Domain to Vercel

1. In Vercel project settings
2. Go to **"Domains"**
3. Add your domain: `chatbot.echem.lk`
4. Follow DNS instructions
5. Done! ✅

### Add Domain to Replit

1. In Replit project
2. Click **"Tools"** → **"Domain"**
3. Add subdomain: `api.chatbot.echem.lk`
4. Update ALLOWED_ORIGINS to include both domains

---

## Troubleshooting Split Deployment

### Issue: "API not responding from frontend"

1. Check ALLOWED_ORIGINS in Replit includes Vercel URL
2. Verify Replit backend is running
3. Check browser console for exact error
4. Test API directly: `curl https://replit-url/api/chat`

### Issue: "CORS error"

1. Verify `ALLOWED_ORIGINS` in Replit secrets
2. Restart Replit backend
3. Clear browser cache
4. Check exact Vercel domain matches

### Issue: "Vercel build failing"

1. Check build command: `npm run build`
2. Verify `frontend/` directory exists
3. Check Node modules installation
4. Review build logs in Vercel

### Issue: "Replit sleeping"

1. Install **Uptimerobot** (FREE)
2. Ping Replit URL every 5 minutes
3. Keeps backend always awake!

---

## Performance Results

With this setup:

| Metric | Speed |
|--------|-------|
| Frontend load | 0.3-0.5s |
| API response | 1-2s |
| Overall UX | Excellent |
| Cost | $0 |

---

## Scaling Paths

### If backend slows down:
→ Upgrade Replit to Pro ($7/mo)

### If frontend needs more:
→ Upgrade Vercel Pro ($20/mo) - but FREE tier already excellent

### If both need upgrade:
→ Consider Railway.app ($5-10/mo for both)

---

## Summary

| Part | Platform | Time | Cost |
|------|----------|------|------|
| Frontend | Vercel | 10 min | FREE |
| Backend | Replit | 20 min | FREE |
| Connection | Both | 5 min | FREE |
| **TOTAL** | | **35 min** | **FREE** |

---

## What You Get

✅ Frontend on global CDN (Vercel)
✅ Backend on reliable server (Replit)
✅ Both completely FREE
✅ Best performance possible
✅ Professional setup
✅ Easy to manage separately

---

## Comparison with Other Options

| Aspect | Vercel+Replit | Replit Only | Railway Only |
|--------|---------------|------------|--------------|
| Speed | Fastest ✅ | Medium | Very fast |
| Cost | FREE | FREE | FREE |
| Setup | 45 min | 20 min | 30 min |
| Maintenance | Easy | Easy | Easy |
| Scaling | Independent | Dependent | Integrated |

---

## Next Steps

1. ✅ Deploy backend to Replit ([DEPLOY_TO_REPLIT.md](DEPLOY_TO_REPLIT.md))
2. ✅ Deploy frontend to Vercel (steps above)
3. ✅ Test everything works
4. ✅ Share with world! 🚀

---

## Resources

- **Vercel Docs:** https://vercel.com/docs
- **Replit Docs:** https://docs.replit.com
- **Vercel + Replit Guide:** https://docs.replit.com/tutorials/vercel

---

**You now have the BEST free hosting setup possible!** 🚀
