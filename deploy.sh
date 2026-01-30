#!/bin/bash
# Production Deployment Script for e-Chem Chatbot
# Run this on your production server

set -e  # Exit on error

echo "==================================="
echo "e-Chem Chatbot Production Deployment"
echo "==================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
APP_PATH="${APP_PATH:-.}"
BACKUP_DIR="${APP_PATH}/backups"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

# Check if .env exists
if [ ! -f "$APP_PATH/.env" ]; then
    echo -e "${RED}Error: .env file not found!${NC}"
    echo "Please create .env from .env.production.example"
    exit 1
fi

# Create backup
echo -e "${YELLOW}Creating backup...${NC}"
mkdir -p "$BACKUP_DIR"
if [ -f "$APP_PATH/database/database.sqlite" ]; then
    cp "$APP_PATH/database/database.sqlite" "$BACKUP_DIR/database_${TIMESTAMP}.sqlite"
    echo -e "${GREEN}✓ Database backed up${NC}"
fi
cp "$APP_PATH/.env" "$BACKUP_DIR/.env_${TIMESTAMP}"
echo -e "${GREEN}✓ Configuration backed up${NC}"

# Clear caches
echo -e "${YELLOW}Clearing caches...${NC}"
cd "$APP_PATH"
php artisan cache:clear
php artisan config:clear
php artisan view:clear
echo -e "${GREEN}✓ Caches cleared${NC}"

# Run database migrations
echo -e "${YELLOW}Running database migrations...${NC}"
php artisan migrate --force
echo -e "${GREEN}✓ Migrations completed${NC}"

# Rebuild caches
echo -e "${YELLOW}Rebuilding caches...${NC}"
php artisan config:cache
php artisan route:cache
php artisan view:cache
echo -e "${GREEN}✓ Caches rebuilt${NC}"

# Set permissions
echo -e "${YELLOW}Setting file permissions...${NC}"
chmod -R 755 storage bootstrap/cache
chmod -R 777 storage/logs storage/framework
echo -e "${GREEN}✓ Permissions set${NC}"

# Frontend deployment (if build exists)
if [ -d "$APP_PATH/frontend/build" ]; then
    echo -e "${YELLOW}Frontend build exists, ensure it's deployed to your web server${NC}"
    echo "Build location: $APP_PATH/frontend/build"
    echo -e "${GREEN}✓ Frontend build ready${NC}"
fi

echo ""
echo -e "${GREEN}==================================="
echo "✓ Deployment completed successfully!"
echo "===================================${NC}"
echo ""
echo "Next steps:"
echo "1. Verify .env configuration is correct"
echo "2. Test API: curl https://your-domain.com/up"
echo "3. Check logs: tail -f storage/logs/laravel.log"
echo "4. Monitor for errors in the next 30 minutes"
echo ""
