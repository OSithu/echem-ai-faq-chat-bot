# e-Chem Chatbot - Security Configuration & Best Practices

## Environment Variables Security

### Critical - Never Expose These:
- `APP_KEY` - Application encryption key
- `GEMINI_API_KEY` - Google Gemini API key
- Database credentials (if using MySQL/PostgreSQL)
- `SESSION_DOMAIN` - Session security setting

### How to Handle Secrets:
1. Use environment variables, NOT .env files in version control
2. Store secrets in:
   - `.env.local` (never commit)
   - Server environment variables
   - Secret management systems (Vault, AWS Secrets Manager, etc.)
3. Rotate API keys regularly (monthly recommended)

## Error Handling Configuration

### Current Setup (POST-FIX):
- `APP_DEBUG=false` - No error details shown to users
- `LOG_LEVEL=error` - Only errors logged, not debug info
- Error messages are generic and user-friendly
- Stack traces only visible in logs, never in browser

### What's Hidden from Users:
✓ Stack traces
✓ File paths
✓ Database errors
✓ API integration details
✓ Configuration values

### What's Logged (Server-side):
✓ Full error messages
✓ Stack traces
✓ User messages
✓ Timestamps
✓ Request details (in logs only)

## HTTP Security Headers

Add these headers in your web server configuration:

### Nginx Configuration:
```nginx
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "no-referrer-when-downgrade" always;
add_header Permissions-Policy "geolocation=(), microphone=(), camera=()" always;
```

### Apache Configuration:
```apache
Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"
Header always set X-Content-Type-Options "nosniff"
Header always set X-Frame-Options "SAMEORIGIN"
Header always set X-XSS-Protection "1; mode=block"
Header always set Referrer-Policy "no-referrer-when-downgrade"
Header always set Permissions-Policy "geolocation=(), microphone=(), camera=()"
```

## CORS Security

### Current Configuration:
- `ALLOWED_ORIGINS` restricts requests to your domain
- Prevents unauthorized cross-origin requests
- Regularly update when adding new domains

### Format:
```
ALLOWED_ORIGINS=https://your-domain.com,https://www.your-domain.com
```

## API Security

### Input Validation:
- ✓ Message length: Max 5000 characters
- ✓ Required validation: Message is required
- ✓ Type validation: Must be string

### Rate Limiting (Recommended Addition):
```php
// In routes/api.php
Route::middleware('throttle:60,1')->post('/chat', 'ChatController@ask');
// Allows 60 requests per minute per IP
```

### HTTPS Enforcement:
- Always use HTTPS in production
- Redirect HTTP to HTTPS
- Use valid SSL/TLS certificates

## File & Directory Permissions

### Critical Files (should not be web-accessible):
- `.env` - Must have restricted permissions (600)
- `storage/logs/` - Not publicly accessible
- `bootstrap/cache/` - Not publicly accessible
- `vendor/` - Not publicly accessible

### Web-Accessible Only:
- `public/` - Only this directory should be web root

## Database Security

### For SQLite (Default):
- Database file stored in `database/database.sqlite`
- Should NOT be in public root
- Regular backups recommended

### For MySQL/PostgreSQL:
- Use strong credentials
- Restrict database user privileges
- Enable SSL connections
- Regular backups to secure location

## Secrets Management Checklist

- [ ] Never commit `.env` file to version control
- [ ] Use `.env.example` as template
- [ ] Store production secrets in environment variables only
- [ ] Rotate API keys quarterly
- [ ] Document all secrets in secure location (password manager)
- [ ] Audit who has access to production secrets
- [ ] Use different secrets for different environments

## Logging & Monitoring

### Log Location:
- `storage/logs/laravel.log` - Check daily

### What to Monitor:
- Error rates
- Failed API requests
- Unusual IP addresses or request patterns
- Performance degradation
- Disk space usage

### Log Retention:
- Keep 14 days of logs (configurable in config/logging.php)
- Archive older logs to secure storage

## Regular Security Tasks

### Daily:
- [ ] Check error logs
- [ ] Monitor server resources

### Weekly:
- [ ] Review access logs
- [ ] Check for security updates

### Monthly:
- [ ] Rotate API keys
- [ ] Update dependencies
- [ ] Review CORS configuration
- [ ] Audit access control

### Quarterly:
- [ ] Security audit
- [ ] Penetration testing
- [ ] Update SSL certificates (if needed)

## Incident Response Plan

If you detect suspicious activity:

1. **Immediate Actions:**
   - Isolate the affected system
   - Start logging all activities
   - Notify administrators

2. **Investigation:**
   - Review access logs
   - Check for unauthorized data access
   - Analyze error logs
   - Monitor system resources

3. **Remediation:**
   - Rotate all API keys
   - Reset passwords
   - Update firewall rules
   - Deploy patches

4. **Post-Incident:**
   - Document what happened
   - Implement preventive measures
   - Update security procedures

## Security Resources

- [OWASP Top 10](https://owasp.org/Top10/)
- [Laravel Security](https://laravel.com/docs/security)
- [NIST Cybersecurity Framework](https://www.nist.gov/cyberframework)
- [CIS Benchmarks](https://www.cisecurity.org/cis-benchmarks/)
