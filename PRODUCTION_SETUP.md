# Production Setup Guide - e-Chem Chatbot

This guide outlines the steps to prepare and deploy the e-Chem Chatbot application to a production environment.

## Pre-Deployment Checklist

### Backend (Laravel)

1. **Environment Configuration**
   - [ ] Copy `.env.production` to `.env` in the production server
   - [ ] Update `APP_URL` to your production domain (e.g., `https://your-domain.com`)
   - [ ] Update `ALLOWED_ORIGINS` to include your frontend domain
   - [ ] Ensure `APP_DEBUG=false` (never debug in production)
   - [ ] Ensure `APP_ENV=production`
   - [ ] Set `LOG_LEVEL=error` (log only errors, not debug info)
   - [ ] Generate a secure `APP_KEY` if not already present: `php artisan key:generate`

2. **Database Setup**
   - [ ] Run migrations: `php artisan migrate --force`
   - [ ] Seed if needed: `php artisan db:seed --force`
   - [ ] Verify database permissions

3. **Cache & Configuration**
   - [ ] Run: `php artisan config:cache`
   - [ ] Run: `php artisan route:cache`
   - [ ] Run: `php artisan view:cache`
   - [ ] Clear any old cache: `php artisan cache:clear`

4. **Security**
   - [ ] Verify all environment secrets are in `.env` (never commit secrets)
   - [ ] Ensure `GEMINI_API_KEY` is set securely in environment variables
   - [ ] Verify CORS origins are properly configured for your domain
   - [ ] Enable HTTPS (SSL/TLS certificate)
   - [ ] Check file permissions (storage and bootstrap/cache should be writable)

5. **Logging**
   - [ ] Configure log rotation to prevent disk space issues
   - [ ] Set up monitoring for error logs in `storage/logs/`
   - [ ] Example log path: `/var/www/your-app/storage/logs/laravel.log`

### Frontend (React)

1. **Environment Configuration**
   - [ ] Create `.env.production` or set `REACT_APP_API_URL` environment variable
   - [ ] Set `REACT_APP_API_URL=https://your-api-domain.com/api/chat`
   - [ ] Disable development tools by ensuring production build

2. **Build Optimization**
   - [ ] Run: `npm run build` in the `frontend/` directory
   - [ ] Verify `build/` directory is created (5-10MB optimized)
   - [ ] Output should be minified and optimized

3. **Static File Serving**
   - [ ] Deploy `frontend/build/` directory to your web server
   - [ ] Configure your web server (Nginx/Apache) to serve React static files
   - [ ] Enable gzip compression on the web server
   - [ ] Set proper cache headers for static assets

## Deployment Steps

### 1. Backend Deployment

```bash
# On production server
cd /var/www/your-app

# Pull latest code
git pull origin main

# Install dependencies
composer install --no-dev --optimize-autoloader

# Run migrations
php artisan migrate --force

# Cache configuration
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Clear old caches
php artisan cache:clear
```

### 2. Frontend Deployment

```bash
# On your local machine or CI/CD
cd frontend

# Install dependencies
npm install

# Build for production
npm run build

# Deploy build directory to production server
# Example using rsync:
rsync -avz build/ user@server:/var/www/your-app/public/spa/
```

### 3. Web Server Configuration

#### Nginx Configuration Example

```nginx
server {
    listen 443 ssl http2;
    server_name your-domain.com;

    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/private.key;

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css text/xml text/javascript 
               application/x-javascript application/xml+rss;
    gzip_min_length 1000;

    # Root for API
    root /var/www/your-app/public;
    index index.php;

    # API routes - pass to Laravel
    location /api {
        try_files $uri $uri/ /index.php?$query_string;
    }

    # React SPA - serve static files or fallback to index.html
    location / {
        try_files $uri /index.html;
    }

    # PHP FPM
    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

#### Apache Configuration Example

```apache
<VirtualHost *:443>
    ServerName your-domain.com
    DocumentRoot /var/www/your-app/public

    <Directory /var/www/your-app/public>
        <IfModule mod_rewrite.c>
            RewriteEngine On
            RewriteCond %{REQUEST_FILENAME} !-f
            RewriteCond %{REQUEST_FILENAME} !-d
            RewriteRule ^ index.php [QSA,L]
        </IfModule>
        
        AllowOverride All
        Require all granted
    </Directory>

    # Enable gzip
    <IfModule mod_deflate.c>
        AddOutputFilterByType DEFLATE text/plain text/html text/xml text/css text/javascript application/javascript
    </IfModule>

    # SSL configuration
    SSLEngine on
    SSLCertificateFile /path/to/certificate.crt
    SSLCertificateKeyFile /path/to/private.key
</VirtualHost>
```

## Post-Deployment Verification

1. **Test API Endpoint**
   ```bash
   curl -X POST https://your-domain.com/api/chat \
     -H "Content-Type: application/json" \
     -d '{"message":"Test message"}'
   ```

2. **Check Application Health**
   - [ ] Visit `https://your-domain.com/up` (should return 200 OK)
   - [ ] Check backend logs for errors
   - [ ] Monitor frontend console for errors

3. **Performance Testing**
   - [ ] Load test with tools like Apache JMeter or k6
   - [ ] Monitor server resources (CPU, memory, disk)
   - [ ] Test on various network conditions

4. **Security Checks**
   - [ ] Verify HTTPS is working
   - [ ] Test CORS headers with curl
   - [ ] Verify no sensitive data in error messages
   - [ ] Check that .env file is not accessible from web

## Error Handling in Production

### Frontend Error Display
- Generic error messages are shown to users
- Detailed errors are logged to browser console only
- No stack traces or API errors are exposed

### Backend Error Handling
- Detailed errors are logged to `storage/logs/laravel.log`
- Generic messages returned to frontend
- All exceptions are caught and logged

### Monitoring
- Set up log aggregation (e.g., ELK stack, CloudWatch)
- Set up alerts for error rates and response times
- Monitor API response times and success rates

## Maintenance

### Regular Tasks
- Monitor error logs daily
- Check disk space usage
- Update dependencies monthly
- Review and rotate API keys periodically
- Backup database regularly

### Database Maintenance
```bash
# SQLite optimization
php artisan tinker
# Run database optimization commands as needed
```

### Cache Management
```bash
# Clear all caches when needed
php artisan cache:clear
php artisan config:clear
php artisan view:clear
```

## Scaling Considerations

For high traffic scenarios:

1. **Database**
   - Consider migrating from SQLite to PostgreSQL/MySQL
   - Set up replication and backups

2. **API**
   - Use a CDN for static files
   - Set up load balancing
   - Implement rate limiting

3. **Frontend**
   - Deploy to CDN for global distribution
   - Implement service workers for offline capability

## Troubleshooting

### Common Issues

**1. CORS Errors**
- Check `ALLOWED_ORIGINS` in `.env`
- Verify frontend domain matches configuration

**2. API Not Responding**
- Check Laravel logs: `tail -f storage/logs/laravel.log`
- Verify API key configuration
- Check internet connection to Gemini API

**3. Static Files Not Loading**
- Verify file paths in web server configuration
- Check file permissions
- Enable gzip compression

**4. Performance Issues**
- Check database queries
- Verify caching is enabled
- Monitor API rate limits from Gemini

## Support & Documentation

- [Laravel Production Checklist](https://laravel.com/docs/installation#production-server-configuration)
- [React Production Build](https://create-react-app.dev/docs/production-build/)
- [Nginx Configuration](https://nginx.org/en/docs/)
- [Apache Configuration](https://httpd.apache.org/docs/)
