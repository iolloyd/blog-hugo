# Mobile UX Testing Guide

This guide helps validate the mobile improvements implemented for the Jekyll blog.

## Prerequisites

- Node.js installed
- Chrome browser
- Jekyll running locally (`bundle exec jekyll serve`)

## Automated Testing

### 1. Google Lighthouse

Run Lighthouse for comprehensive mobile testing:

```bash
# Install Lighthouse CLI if not already installed
npm install -g lighthouse

# Run Lighthouse mobile audit
lighthouse http://localhost:4000 \
  --view \
  --emulated-form-factor=mobile \
  --throttling-method=simulate \
  --throttling.cpuSlowdownMultiplier=4 \
  --chrome-flags="--headless"
```

Expected scores:
- Performance: >90
- Accessibility: 100
- Best Practices: 100
- SEO: 100
- PWA: All checks pass

### 2. Mobile-Friendly Test

Visit Google's Mobile-Friendly Test:
1. Go to https://search.google.com/test/mobile-friendly
2. Enter your deployed URL or use ngrok for local testing
3. Verify "Page is mobile friendly" result

## Manual Testing Checklist

### Touch Targets (44x44px minimum)
- [ ] Mobile menu toggle button
- [ ] All navigation links in mobile menu
- [ ] All buttons (primary and secondary)
- [ ] Blog post links
- [ ] Footer links

### Navigation
- [ ] Hamburger menu opens/closes smoothly
- [ ] Menu can be closed by tapping overlay
- [ ] Menu can be closed by swiping right
- [ ] Escape key closes menu (on devices with keyboards)
- [ ] Focus trap works correctly in menu

### Typography & Readability
- [ ] Base font size is at least 16px (18px implemented)
- [ ] Line height provides comfortable reading
- [ ] No horizontal scrolling required
- [ ] Content width is appropriate for mobile

### Performance
- [ ] Initial page load under 3 seconds on 3G
- [ ] Images lazy load as you scroll
- [ ] No layout shifts during loading
- [ ] Smooth scrolling and animations (60fps)

### PWA Features
- [ ] "Add to Home Screen" prompt appears
- [ ] App installs successfully
- [ ] Offline page shows when disconnected
- [ ] Previously visited pages work offline

### Touch Interactions
- [ ] Buttons show visual feedback on tap
- [ ] Cards are fully tappable
- [ ] No double-tap zoom issues
- [ ] Swipe gestures work smoothly

## Device Testing

Test on these devices/simulators:

### iOS
- iPhone SE (375px) - Smallest common viewport
- iPhone 12/13 (390px) - Standard size
- iPhone 14 Pro Max (430px) - Large phone
- iPad (768px) - Tablet portrait

### Android
- Samsung Galaxy S21 (360px)
- Pixel 5 (393px)
- Galaxy Tab (768px)

## Browser DevTools Testing

### Chrome DevTools
1. Open DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Select "iPhone 12 Pro" preset
4. Test:
   - Touch interactions (toggle touch simulation)
   - Network throttling (Fast 3G)
   - Offline mode

### Safari Web Inspector
1. Enable Develop menu in Safari preferences
2. Connect iPhone via USB
3. Develop > [Your iPhone] > [localhost]
4. Test real device interactions

## Common Issues to Check

1. **Fixed positioning issues on iOS**
   - Verify navigation stays fixed
   - Check if -webkit-fill-available is working

2. **Touch event delays**
   - Ensure no 300ms tap delay
   - Verify touch feedback is immediate

3. **Viewport zoom**
   - Confirm viewport meta tag prevents unwanted zoom
   - Test form inputs don't cause zoom

4. **Performance bottlenecks**
   - Check for janky scrolling
   - Verify animations run at 60fps
   - Monitor memory usage in DevTools

## Accessibility Testing

### Screen Reader Testing
- iOS: Enable VoiceOver (Settings > Accessibility)
- Android: Enable TalkBack
- Test navigation flow and announcements

### Keyboard Navigation
- Connect Bluetooth keyboard to mobile device
- Verify all interactive elements are reachable
- Test focus indicators are visible

## Performance Monitoring

Create performance budget:

```javascript
// performance-budget.json
{
  "timings": {
    "firstContentfulPaint": 2000,
    "firstMeaningfulPaint": 2500,
    "firstCPUIdle": 3000,
    "timeToInteractive": 3500
  },
  "sizes": {
    "totalBundleSize": 200000,
    "javascriptSize": 100000,
    "cssSize": 50000,
    "imageSize": 300000
  }
}
```

## Validation Script

Run this script to check all success criteria:

```bash
#!/bin/bash

echo "Mobile UX Validation"
echo "==================="

# Check if Jekyll is running
if ! curl -s http://localhost:4000 > /dev/null; then
    echo "❌ Jekyll is not running. Start with: bundle exec jekyll serve"
    exit 1
fi

echo "✅ Jekyll server is running"

# Run Lighthouse
echo "Running Lighthouse audit..."
lighthouse http://localhost:4000 \
    --quiet \
    --chrome-flags="--headless" \
    --emulated-form-factor=mobile \
    --only-categories=performance,accessibility,best-practices,seo,pwa \
    --output=json \
    --output-path=./lighthouse-report.json

# Parse results
node -e "
const report = require('./lighthouse-report.json');
const scores = Object.entries(report.categories).map(([key, cat]) => ({
    name: cat.title,
    score: Math.round(cat.score * 100)
}));

console.log('\nLighthouse Scores:');
scores.forEach(s => {
    const icon = s.score >= 90 ? '✅' : '❌';
    console.log(\`\${icon} \${s.name}: \${s.score}\`);
});

// Check specific audits
const audits = report.audits;
console.log('\nSpecific Checks:');
console.log(audits['tap-targets'].score === 1 ? '✅' : '❌', 'Touch targets sizing');
console.log(audits['font-size'].score === 1 ? '✅' : '❌', 'Font sizes readable');
console.log(audits['viewport'].score === 1 ? '✅' : '❌', 'Viewport configured');
console.log(audits['installable-manifest'].score === 1 ? '✅' : '❌', 'PWA installable');
"

# Clean up
rm lighthouse-report.json

echo "\nValidation complete!"
```

Save this as `validate-mobile.sh` and run with `bash validate-mobile.sh`.

## Final Checklist

Before considering the mobile UX complete:

- [ ] All Lighthouse scores >90 (100 for accessibility)
- [ ] Manual testing completed on at least 3 devices
- [ ] Touch targets verified at 44x44px minimum
- [ ] Page loads in <3 seconds on 3G
- [ ] Offline functionality works
- [ ] No horizontal scrolling issues
- [ ] Navigation is thumb-friendly
- [ ] Text is readable without zooming
- [ ] PWA installs successfully
- [ ] All animations run at 60fps