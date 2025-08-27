#!/bin/bash

# AI History Timeline - Deployment Verification Script

echo "🔍 Verifying AI History Timeline Deployment..."
echo "============================================"

URL="${1:-https://ai-history-3n1.pages.dev}"

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if site is accessible
echo -n "1. Checking site availability... "
if curl -s -I "$URL" | grep -q "200 OK\|200"; then
    echo -e "${GREEN}✓${NC}"
else
    echo -e "${RED}✗${NC}"
    exit 1
fi

# Check if timeline data is accessible
echo -n "2. Checking timeline data... "
if curl -s "$URL/data/timeline.json" | grep -q '"metadata"'; then
    echo -e "${GREEN}✓${NC}"
else
    echo -e "${RED}✗${NC}"
fi

# Check security headers
echo -n "3. Checking security headers... "
if curl -s -I "$URL" | grep -qi "content-security-policy"; then
    echo -e "${GREEN}✓${NC}"
else
    echo -e "${RED}✗${NC}"
fi

# Check if JavaScript is loading
echo -n "4. Checking JavaScript bundle... "
JS_FILE=$(curl -s "$URL" | grep -o 'main-.*\.js' | head -1)
if [ ! -z "$JS_FILE" ]; then
    if curl -s -I "$URL/assets/$JS_FILE" | grep -q "200"; then
        echo -e "${GREEN}✓${NC}"
    else
        echo -e "${RED}✗${NC}"
    fi
else
    echo -e "${RED}✗${NC}"
fi

# Check if CSS is loading
echo -n "5. Checking CSS bundle... "
CSS_FILE=$(curl -s "$URL" | grep -o 'main-.*\.css' | head -1)
if [ ! -z "$CSS_FILE" ]; then
    if curl -s -I "$URL/assets/$CSS_FILE" | grep -q "200"; then
        echo -e "${GREEN}✓${NC}"
    else
        echo -e "${RED}✗${NC}"
    fi
else
    echo -e "${RED}✗${NC}"
fi

# Check manifest
echo -n "6. Checking PWA manifest... "
if curl -s "$URL/manifest.json" | grep -q '"name"'; then
    echo -e "${GREEN}✓${NC}"
else
    echo -e "${RED}✗${NC}"
fi

# Check sitemap
echo -n "7. Checking sitemap... "
if curl -s "$URL/sitemap.xml" | grep -q "urlset"; then
    echo -e "${GREEN}✓${NC}"
else
    echo -e "${RED}✗${NC}"
fi

# Get version info
echo ""
echo "📊 Deployment Info:"
echo "-------------------"
if command -v jq &> /dev/null; then
    VERSION=$(curl -s "$URL/data/version.json" 2>/dev/null | jq -r '.version')
    LAST_UPDATED=$(curl -s "$URL/data/timeline.json" 2>/dev/null | jq -r '.metadata.lastUpdated')
else
    VERSION=$(curl -s "$URL/data/version.json" 2>/dev/null | grep -o '"version":"[^"]*' | cut -d'"' -f4)
    LAST_UPDATED=$(curl -s "$URL/data/timeline.json" 2>/dev/null | grep -o '"lastUpdated":"[^"]*' | cut -d'"' -f4)
fi

echo "Version: $VERSION"
echo "Last Updated: $LAST_UPDATED"
echo "URL: $URL"

echo ""
echo "✅ Deployment verification complete!"