# Production Deployment Checklist

## Quick Start - 30 Minutes to Production

Use this checklist for rapid deployment verification.

### Before Deployment (Day 1)

#### Backend Setup
- [ ] Generate APP_KEY: `php artisan key:generate`
- [ ] Copy `.env.production.example` to `.env`
- [ ] Update domain in APP_URL
- [ ] Set APP_DEBUG=false
- [ ] Set APP_ENV=production
- [ ] Set ALLOWED_ORIGINS with your frontend domain
- [ ] Set GEMINI_API_KEY in environment variables
- [ ] Run `php artisan migrate --force`

#### Frontend Build
- [ ] Run `npm install` in frontend directory
- [ ] Set REACT_APP_API_URL environment variable
- [ ] Run `npm run build`
- [ ] Verify `build/` directory created

### Deployment Day

#### Hour 1: Infrastructure Setup
- [ ] Configure web server (Nginx/Apache)
- [ ] Set up SSL certificate (Let's Encrypt recommended)
- [ ] Configure domain DNS
- [ ] Set file permissions

#### Hour 2: Deploy Backend
```bash
# On production server
cd /path/to/app
php artisan config:cache
php artisan route:cache
php artisan view:cache
```
- [ ] Verify: `curl https://your-domain.com/up`

#### Hour 3: Deploy Frontend
```bash
# Copy build files to web server
rsync -avz build/ user@server:/var/www/your-app/public/
```
- [ ] Verify: Open https://your-domain.com in browser
- [ ] Check: No console errors in DevTools

### Post-Deployment (Hour 4)

#### Testing
- [ ] [ ] Open website, verify it loads
- [ ] [ ] Test chat functionality
- [ ] [ ] Check browser console (F12) for errors
- [ ] [ ] Verify HTTPS is working
- [ ] [ ] Test on mobile device

#### Monitoring
- [ ] [ ] Check error logs: `tail -f storage/logs/laravel.log`
- [ ] [ ] Monitor server resources (CPU, RAM, disk)
- [ ] [ ] Set up uptime monitoring
- [ ] [ ] Enable error notifications

#### Security Verification
- [ ] [ ] Verify .env not accessible from web
- [ ] [ ] Check CORS headers: `curl -I https://your-domain.com`
- [ ] [ ] Verify no error details shown in browser
- [ ] [ ] Test API with invalid input

## Verification Scripts

### Backend Health Check
```bash
#!/bin/bash
echo "Checking backend health..."
RESPONSE=$(curl -s https://your-domain.com/up)
if [ "$RESPONSE" = "Ok" ]; then
  echo "✓ Backend is healthy"
else
  echo "✗ Backend is not responding correctly"
  exit 1
fi
```

### Frontend Load Test
```bash
#!/bin/bash
echo "Testing frontend performance..."
curl -o /dev/null -s -w "%{http_code}\n" https://your-domain.com
# Should return 200
```

### API Response Test
```bash
#!/bin/bash
echo "Testing API endpoint..."
curl -X POST https://your-domain.com/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"Hello"}' \
  -w "\nStatus: %{http_code}\n"
# Should return 200 with JSON response
```

## Common Issues & Fixes

### Issue: "API connection refused"
**Solution:**
1. Verify backend is running
2. Check ALLOWED_ORIGINS in .env
3. Verify API endpoint URL is correct
4. Check CORS headers

### Issue: "Static files not loading (404)"
**Solution:**
1. Verify build directory deployed
2. Check web server root path
3. Verify file permissions
4. Restart web server

### Issue: "Error messages showing to users"
**Solution:**
1. Verify APP_DEBUG=false
2. Check APP_ENV=production
3. Verify error handling in ChatController
4. Restart application

### Issue: "Slow response times"
**Solution:**
1. Enable caching: `php artisan config:cache`
2. Check Gemini API response times
3. Monitor server resources
4. Implement rate limiting

## Rollback Procedure

If something goes wrong, rollback in 5 minutes:

```bash
# 1. Stop application
sudo systemctl stop php-fpm
# or
sudo systemctl stop apache2

# 2. Restore from backup
cp backups/database_YYYYMMDD_HHMMSS.sqlite database/database.sqlite
cp backups/.env_YYYYMMDD_HHMMSS .env

# 3. Clear caches
php artisan cache:clear
php artisan config:clear

# 4. Restart application
sudo systemctl start php-fpm
# or
sudo systemctl start apache2

# 5. Verify
curl https://your-domain.com/up
```

## 24-Hour Monitoring Checklist

After deployment, monitor for 24 hours:

- [ ] Hour 1: Check error logs
- [ ] Hour 2: Verify no unusual traffic
- [ ] Hour 4: Performance check
- [ ] Hour 8: Database check
- [ ] Hour 16: Full system check
- [ ] Hour 24: Final verification

## Success Criteria

✓ All criteria met = Production deployment successful

- [ ] Website loads in browser
- [ ] Chat functionality works
- [ ] No error messages shown to users
- [ ] Detailed errors in logs only
- [ ] HTTPS is working
- [ ] API response time < 2 seconds
- [ ] No database errors
- [ ] Monitor shows no alerts
- [ ] Error logs are clean
- [ ] Users can access the application

## Post-Deployment Actions

### Within 1 Hour
- [ ] Notify stakeholders
- [ ] Document any issues
- [ ] Set up monitoring alerts

### Within 1 Day
- [ ] Monitor error logs
- [ ] Gather user feedback
- [ ] Check performance metrics

### Within 1 Week
- [ ] Review analytics
- [ ] Optimize based on usage
- [ ] Plan first iteration improvements

## Support & Escalation

### If Critical Issue Occurs
1. **Immediate (within 5 min):** Rollback deployment
2. **10 minutes:** Notify team leads
3. **30 minutes:** Root cause analysis
4. **1 hour:** Fix and re-test
5. **2 hours:** Document incident

## Emergency Contacts

- DevOps Lead: [Contact Info]
- API Provider Support: [Contact Info]
- System Administrator: [Contact Info]

---

**Last Updated:** 2026-01-30  
**Version:** 1.0  
**Status:** Ready for Production Deployment
