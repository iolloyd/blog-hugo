#!/bin/bash

echo "Mobile UX Validation Script"
echo "=========================="
echo ""

# Color codes
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Jekyll is running
echo "Checking Jekyll server..."
if curl -s http://localhost:4000 > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Jekyll server is running${NC}"
else
    echo -e "${RED}❌ Jekyll is not running. Start with: bundle exec jekyll serve${NC}"
    exit 1
fi

echo ""
echo "Checking required files..."

# Check for mobile-specific files
FILES=(
    "_includes/mobile-nav.html"
    "assets/css/mobile.css"
    "assets/js/mobile-nav.js"
    "assets/js/lazy-load.js"
    "assets/js/service-worker.js"
    "manifest.json"
    "sw.js"
    "offline.html"
)

all_files_exist=true
for file in "${FILES[@]}"; do
    if [ -f "$file" ]; then
        echo -e "${GREEN}✅ Found: $file${NC}"
    else
        echo -e "${RED}❌ Missing: $file${NC}"
        all_files_exist=false
    fi
done

if [ "$all_files_exist" = false ]; then
    echo -e "${RED}Some required files are missing!${NC}"
    exit 1
fi

echo ""
echo "Checking CSS imports..."
if grep -q "@import 'mobile.css'" assets/css/style.css; then
    echo -e "${GREEN}✅ Mobile CSS is imported${NC}"
else
    echo -e "${RED}❌ Mobile CSS not imported in style.css${NC}"
fi

echo ""
echo "Checking layout integration..."
if grep -q "mobile-nav.html" _layouts/default.html; then
    echo -e "${GREEN}✅ Mobile nav is included in layout${NC}"
else
    echo -e "${RED}❌ Mobile nav not included in default layout${NC}"
fi

if grep -q "manifest.json" _layouts/default.html; then
    echo -e "${GREEN}✅ PWA manifest is linked${NC}"
else
    echo -e "${RED}❌ PWA manifest not linked in layout${NC}"
fi

echo ""
echo "Checking Jekyll config..."
if grep -q "manifest.json" _config.yml; then
    echo -e "${GREEN}✅ PWA files included in Jekyll config${NC}"
else
    echo -e "${YELLOW}⚠️  PWA files not explicitly included in _config.yml${NC}"
fi

echo ""
echo "Manual Testing Checklist"
echo "======================="
echo ""
echo "Please manually verify the following:"
echo ""
echo "1. Touch Targets (minimum 44x44px):"
echo "   [ ] Mobile menu toggle button"
echo "   [ ] Navigation links in mobile menu"
echo "   [ ] All buttons and links"
echo ""
echo "2. Mobile Navigation:"
echo "   [ ] Hamburger menu opens/closes smoothly"
echo "   [ ] Can close menu by tapping overlay"
echo "   [ ] Can close menu by swiping right"
echo "   [ ] Menu has proper focus management"
echo ""
echo "3. Performance:"
echo "   [ ] Images lazy load on scroll"
echo "   [ ] No layout shifts during loading"
echo "   [ ] Smooth 60fps animations"
echo ""
echo "4. PWA Features:"
echo "   [ ] 'Add to Home Screen' prompt appears"
echo "   [ ] Offline page works when disconnected"
echo "   [ ] Service worker caches pages"
echo ""
echo "5. Typography:"
echo "   [ ] Text is readable without zooming"
echo "   [ ] No horizontal scrolling needed"
echo "   [ ] Proper line height and spacing"
echo ""
echo -e "${YELLOW}Run Lighthouse for detailed metrics:${NC}"
echo "npx lighthouse http://localhost:4000 --view --emulated-form-factor=mobile"
echo ""
echo "Validation script complete!"