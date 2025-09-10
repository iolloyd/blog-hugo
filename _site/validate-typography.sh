#!/bin/bash

echo "Typography Enhancement Validation Script"
echo "======================================="
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
echo "Checking typography files..."

# Check for typography-specific files
FILES=(
    "assets/css/typography.css"
    "assets/js/font-loader.js"
    "_includes/typography-toggle.html"
    "assets/fonts/README.md"
    "PRPs/typography-audit.md"
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
fi

echo ""
echo "Checking font file..."
if [ -f "assets/fonts/inter-var.woff2" ]; then
    # Check file size (should be under 50KB for mobile)
    filesize=$(du -k "assets/fonts/inter-var.woff2" | cut -f1)
    if [ "$filesize" -lt 50 ]; then
        echo -e "${GREEN}✅ Font file found and optimized (${filesize}KB)${NC}"
    else
        echo -e "${YELLOW}⚠️  Font file is ${filesize}KB (consider subsetting for mobile)${NC}"
    fi
else
    echo -e "${YELLOW}⚠️  Inter font not found - using system fonts (see assets/fonts/README.md)${NC}"
fi

echo ""
echo "Checking CSS imports..."
# Check if typography.css is linked in layouts
if grep -q "typography.css" _layouts/default.html 2>/dev/null; then
    echo -e "${GREEN}✅ Typography CSS is linked in layout${NC}"
else
    echo -e "${RED}❌ Typography CSS not linked in default layout${NC}"
fi

echo ""
echo "Checking input field font sizes..."
# Check for 16px minimum on inputs
if grep -q "font-size: 16px !important" assets/css/typography.css; then
    echo -e "${GREEN}✅ Input fields have 16px minimum font size${NC}"
else
    echo -e "${RED}❌ Input fields missing 16px minimum (iOS zoom risk)${NC}"
fi

echo ""
echo "Checking accessibility features..."
# Check for dyslexia mode
if grep -q "dyslexia-mode" assets/css/typography.css; then
    echo -e "${GREEN}✅ Dyslexia mode styles found${NC}"
else
    echo -e "${RED}❌ Dyslexia mode styles missing${NC}"
fi

# Check for font size controls
if grep -q "font-size-" assets/css/typography.css; then
    echo -e "${GREEN}✅ Font size adjustment classes found${NC}"
else
    echo -e "${RED}❌ Font size adjustment classes missing${NC}"
fi

echo ""
echo "Checking mobile-specific adjustments..."
# Check for mobile media queries
if grep -q "@media (max-width: 768px)" assets/css/typography.css; then
    echo -e "${GREEN}✅ Mobile-specific styles found${NC}"
else
    echo -e "${RED}❌ Mobile-specific styles missing${NC}"
fi

echo ""
echo "Typography Testing Checklist"
echo "==========================="
echo ""
echo "Please manually verify the following:"
echo ""
echo "1. Font Loading Performance:"
echo "   [ ] Fonts load without blocking render"
echo "   [ ] No layout shift when fonts load (CLS < 0.1)"
echo "   [ ] Fallback fonts display correctly"
echo ""
echo "2. Mobile Typography Scale:"
echo "   [ ] Body text is 18px (1.125rem) on mobile"
echo "   [ ] All text is readable without zooming"
echo "   [ ] Line heights provide comfortable reading"
echo ""
echo "3. Input Fields:"
echo "   [ ] No zoom on input focus (iOS)"
echo "   [ ] All form fields are at least 16px"
echo ""
echo "4. Accessibility Features:"
echo "   [ ] Typography toggle button is accessible"
echo "   [ ] Font size controls work correctly"
echo "   [ ] Dyslexia mode activates properly"
echo "   [ ] Settings persist on reload"
echo ""
echo "5. Content-Specific Typography:"
echo "   [ ] Article text uses enhanced spacing"
echo "   [ ] UI elements use compact sizing"
echo "   [ ] Navigation maintains readability"
echo ""
echo "6. Vertical Rhythm:"
echo "   [ ] Consistent spacing between elements"
echo "   [ ] Baseline grid maintained"
echo "   [ ] No awkward gaps or overlaps"
echo ""
echo -e "${YELLOW}Run detailed performance test:${NC}"
echo "npx lighthouse http://localhost:4000 --view --only-categories=performance,accessibility --emulated-form-factor=mobile"
echo ""
echo -e "${YELLOW}Test font loading:${NC}"
echo "1. Open DevTools Network tab"
echo "2. Filter by 'Font'"
echo "3. Reload page and verify font-display: swap behavior"
echo ""
echo "Validation script complete!"