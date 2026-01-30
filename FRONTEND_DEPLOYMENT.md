# Frontend Build & Deployment Guide

## Pre-Build Checklist

- [ ] All dependencies installed: `npm install`
- [ ] No console errors or warnings
- [ ] API endpoint correctly configured
- [ ] Environment variables set

## Building for Production

### Step 1: Clean Build
```bash
cd frontend
npm install
npm run build
```

### Step 2: Verify Build Output
The `build/` directory should contain:
- `index.html` - Main HTML file
- `static/js/` - Minified JavaScript files
- `static/css/` - Minified CSS files
- `static/media/` - Images and fonts
- `manifest.json` - PWA manifest

### Step 3: Check Build Size
```bash
# On Windows PowerShell
Get-ChildItem -Path build -Recurse | Measure-Object -Property Length -Sum
```

Expected size: 5-10 MB total

## Environment Configuration

### Create `.env.production` in frontend directory:
```
REACT_APP_API_URL=https://api.your-domain.com/api/chat
```

Or set as environment variable during build:
```bash
REACT_APP_API_URL=https://api.your-domain.com/api/chat npm run build
```

## Deployment Methods

### Method 1: Nginx (Recommended)

```bash
# Copy build to server
scp -r frontend/build/* user@server:/var/www/your-app/public/

# Or using rsync
rsync -avz frontend/build/ user@server:/var/www/your-app/public/
```

### Method 2: Docker

```dockerfile
# Stage 1: Build
FROM node:18-alpine AS build
WORKDIR /app
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ .
RUN npm run build

# Stage 2: Serve
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
```

### Method 3: GitHub Actions (CI/CD)

```yaml
name: Deploy Frontend

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      
      - name: Install & Build
        run: |
          cd frontend
          npm install
          REACT_APP_API_URL=${{ secrets.PROD_API_URL }} npm run build
      
      - name: Deploy to Server
        uses: appleboy/scp-action@master
        with:
          host: ${{ secrets.SERVER_HOST }}
          username: ${{ secrets.SERVER_USER }}
          key: ${{ secrets.SSH_KEY }}
          source: "frontend/build/*"
          target: "/var/www/your-app/public"
```

## Performance Optimization

### 1. Code Splitting (Already Configured)
React automatically splits code for better performance.

### 2. Asset Optimization
- Images are automatically optimized
- CSS and JS are minified
- Source maps are excluded from production

### 3. Caching Strategy

**Nginx Cache Headers:**
```nginx
# Cache static assets (CSS, JS, images)
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}

# Don't cache HTML
location = /index.html {
    add_header Cache-Control "public, max-age=0, must-revalidate";
}
```

### 4. Service Worker (PWA)
Create `frontend/public/service-worker.js` for offline capability:
```javascript
const CACHE_NAME = 'echem-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/static/css/main.css',
  '/static/js/main.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
```

Register in `frontend/src/index.js`:
```javascript
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js');
}
```

## Testing Before Deployment

### 1. Build Test Locally
```bash
cd frontend
npm run build
npx serve -s build  # Serve locally to test
```

Visit `http://localhost:3000` and verify all features work.

### 2. Test API Connectivity
```bash
# Test from build directory
curl -X POST https://your-domain.com/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"Test"}'
```

### 3. Browser Testing
- [ ] Test on Chrome
- [ ] Test on Firefox
- [ ] Test on Safari
- [ ] Test on mobile devices
- [ ] Test offline capabilities
- [ ] Check console for errors

### 4. Performance Testing
```bash
# Using Lighthouse (Chrome DevTools built-in)
# Or using npm
npm install -g lighthouse
lighthouse https://your-domain.com --view
```

Target scores:
- Performance: > 90
- Accessibility: > 90
- Best Practices: > 90
- SEO: > 90

## Post-Deployment Verification

1. **Check Website Loading**
   ```bash
   curl -I https://your-domain.com
   # Should return 200 OK
   ```

2. **Test API Integration**
   - Open browser console (F12)
   - Send a test message
   - Verify response appears

3. **Monitor Console Errors**
   - Open DevTools (F12)
   - Check Console tab for errors
   - No red errors should appear

4. **Check Network Requests**
   - Open Network tab
   - Send a message
   - Verify `/api/chat` request succeeds

## Troubleshooting

### Build Errors

**"Module not found"**
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
npm run build
```

**"Out of memory"**
```bash
NODE_OPTIONS=--max_old_space_size=4096 npm run build
```

### Runtime Errors

**"API endpoint not responding"**
- Verify API_URL is correct
- Check backend is running
- Verify CORS configuration

**"Blank screen"**
- Check index.html loaded
- Check for JavaScript errors in console
- Verify correct web server configuration

**"Static files not loading"**
- Verify build directory deployed
- Check web server root path
- Verify file permissions

## Maintenance

### Weekly
- Monitor error logs
- Check Core Web Vitals
- Review analytics

### Monthly
- Update dependencies: `npm update`
- Audit packages: `npm audit`
- Performance review

### Quarterly
- Update React and dependencies
- Test on new browser versions
- Security audit

## Performance Monitoring

Use these tools:
- [Google PageSpeed Insights](https://pagespeed.web.dev)
- [WebPageTest](https://www.webpagetest.org/)
- [Sentry](https://sentry.io/) - Error tracking
- [DataDog](https://www.datadoghq.com/) - Application monitoring
