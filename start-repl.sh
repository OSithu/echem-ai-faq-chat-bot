#!/usr/bin/env bash
set -e

PORT=${PORT:-8080}
echo "Replit start script: using PORT=$PORT"

echo "Installing PHP dependencies (composer)..."
if [ ! -f vendor/autoload.php ]; then
  composer install --no-dev --no-interaction --optimize-autoloader || true
fi

echo "Ensuring SQLite DB exists..."
mkdir -p database
if [ ! -f database/database.sqlite ]; then
  touch database/database.sqlite
fi

echo "Running migrations (if any)..."
php artisan migrate --force || true

echo "Building frontend..."
if [ -d frontend ]; then
  cd frontend
  # Install node deps if needed
  if [ ! -d node_modules ]; then
    npm install --no-audit --no-fund || true
  fi
  # Build with optional env override
  if [ -z "$REACT_APP_API_URL" ]; then
    echo "No REACT_APP_API_URL set - frontend will use runtime origin fallback"
  else
    echo "Using REACT_APP_API_URL=$REACT_APP_API_URL for build"
  fi
  REACT_APP_API_URL=${REACT_APP_API_URL:-} npm run build || true
  echo "Copying frontend build to public/"
  cp -r build/* ../public/ || true
  cd ..
fi

echo "Starting PHP built-in server on 0.0.0.0:$PORT (document root: public/)"
php -S 0.0.0.0:${PORT} -t public
