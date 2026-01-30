# Production Configuration Quick Reference

## Current Configuration Status: ✅ PRODUCTION READY

### Environment Variables Updated
```
APP_ENV=production         ✅
APP_DEBUG=false            ✅
LOG_LEVEL=error            ✅
ALLOWED_ORIGINS=set        ✅
```

### Error Handling
```
Backend errors: Hidden from users, logged to server  ✅
Frontend errors: User-friendly messages             ✅
API errors: Generic error responses                 ✅
```

### Frontend Optimization
```
API endpoint: Environment-based (dynamic)           ✅
Error messages: User-friendly                       ✅
Build optimization: React production build          ✅
```

### CORS Security
```
Hardcoded localhost: Removed from code              ✅
Environment-based: ALLOWED_ORIGINS                  ✅
Dynamic frontend URL: Implemented                   ✅
```

---

## One-Time Setup (Production Server)

### 1. Environment Configuration
```bash
# Copy and edit environment file
cp .env.production.example .env
nano .env
```

Key variables to update:
- `APP_URL=https://your-domain.com`
- `ALLOWED_ORIGINS=https://your-domain.com`
- `GEMINI_API_KEY=your-key-here` (set as env var, not in file)

### 2. Database Setup
```bash
php artisan migrate --force
```

### 3. Cache Configuration
```bash
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

### 4. Frontend Build
```bash
cd frontend
npm install
REACT_APP_API_URL=https://your-domain.com/api/chat npm run build
```

### 5. Deploy Build
```bash
# Deploy build folder to web server public directory
rsync -avz frontend/build/* user@server:/var/www/app/public/
```

---

## Daily Monitoring Tasks

### Check Logs (Morning)
```bash
tail -f storage/logs/laravel.log
# Look for ERROR level entries only
```

### API Health Check
```bash
curl https://your-domain.com/up
# Should return "Ok"
```

### Website Availability
```bash
curl -I https://your-domain.com
# Should return 200 OK
```

---

## Files Created/Modified for Production

### Configuration Files
- `.env.production` - Production environment variables
- `.env.production.example` - Example template
- `config/cors.php` - Updated for dynamic origins

### Documentation
- `PRODUCTION_SETUP.md` - Complete deployment guide
- `DEPLOYMENT_CHECKLIST.md` - Quick deployment checklist
- `FRONTEND_DEPLOYMENT.md` - Frontend-specific guide
- `SECURITY.md` - Security best practices

### Code Changes
- `app/Http/Controllers/ChatController.php` - Error handling improved
- `frontend/src/App.js` - API endpoint made dynamic, error handling improved
- `config/cors.php` - Environment-based CORS configuration

### Scripts
- `deploy.sh` - Automated deployment script

---

## API Endpoints

### Health Check
```
GET /up
```

### Chat API
```
POST /api/chat
Content-Type: application/json

{
  "message": "Your question here"
}

Response:
{
  "reply": "Bot response",
  "error": false
}
```

---

## Error Messages (What Users See)

### Network Error
> "I apologize, I'm unable to connect to the server. Please check your internet connection and try again."

### Server Error
> "I apologize, I'm currently unable to process your request. Please try again in a few moments or contact our support team."

### Validation Error
> "Please provide a valid message"

---

## What's NOT Visible to Users

❌ Stack traces
❌ File paths
❌ Database errors
❌ API key information
❌ Server configuration
❌ Full error messages

---

## Server Requirements

- **PHP**: 8.1+ with FPM or CGI
- **Node.js**: 18+ (for build only)
- **Disk Space**: 500MB+ (includes database, logs, cache)
- **RAM**: 512MB minimum (1GB+ recommended)
- **Bandwidth**: Depends on Gemini API usage

---

## Performance Targets

- Page Load: < 3 seconds
- API Response: < 2 seconds
- Build Size: 5-10 MB
- Uptime: 99.5%+
- Error Rate: < 0.1%

---

## Scaling Considerations

For high traffic (1000+ daily users):
1. Migrate SQLite to PostgreSQL/MySQL
2. Set up database replication
3. Use CDN for static assets
4. Implement Redis caching
5. Set up load balancing
6. Use application monitoring (Sentry, DataDog)

---

## Rollback Plan

If deployment fails:
```bash
# Restore from backup
cp backups/database_latest.sqlite database/database.sqlite
cp backups/.env_latest .env

# Clear and rebuild
php artisan cache:clear
php artisan config:cache

# Restart
sudo systemctl restart php-fpm
```

Expected downtime: 2-5 minutes

---

## Support Resources

- [Laravel Documentation](https://laravel.com/docs)
- [React Documentation](https://react.dev)
- [Google Gemini API](https://ai.google.dev)
- [OWASP Security Guidelines](https://owasp.org)

---

## Deployment Tracking

- [ ] Backend configured
- [ ] Frontend built
- [ ] SSL certificate installed
- [ ] DNS configured
- [ ] Database migrated
- [ ] Caches cleared and rebuilt
- [ ] Security verification complete
- [ ] Monitoring enabled
- [ ] Rollback plan tested

---

**Last Updated**: 2026-01-30  
**Production Version**: 1.0  
**Status**: Ready for Deployment
