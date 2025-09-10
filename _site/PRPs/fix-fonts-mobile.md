name: "Fix Fonts When Displayed on Phone"
description: |

## Purpose
Implement comprehensive mobile font rendering fixes to ensure optimal readability and performance across all mobile devices, addressing common WebKit rendering issues, font loading performance, and system font fallback problems.

## Core Principles
1. **Context is King**: Include ALL necessary documentation, examples, and caveats
2. **Validation Loops**: Provide executable tests/lints the AI can run and fix
3. **Information Dense**: Use keywords and patterns from the codebase
4. **Progressive Success**: Start simple, validate, then enhance
5. **Global rules**: Be sure to follow all rules in CLAUDE.md

---

## Goal
Fix font rendering issues on mobile devices to ensure crisp, readable text across all mobile browsers and screen sizes, with optimal performance and no layout shifts during font loading.

## Why
- **Business value**: Improved user experience and readability leads to longer engagement times and lower bounce rates
- **Integration**: Builds upon existing mobile.css responsive system while addressing specific rendering issues
- **Problems solved**: Fixes blurry/thin text on iOS devices, prevents FOIT/FOUT issues, ensures consistent rendering across Android/iOS

## What
Implement mobile-specific font rendering optimizations including:
- Font rendering property adjustments for WebKit browsers
- Font loading strategy with font-display
- System font stack optimization for mobile platforms
- Performance improvements to reduce font-related layout shifts

### Success Criteria
- [ ] Text appears crisp and readable on all mobile devices (iOS Safari, Chrome Mobile, Samsung Internet)
- [ ] No visible font loading flash (FOIT/FOUT) on slow connections
- [ ] Font sizes remain consistent without iOS text size adjustments
- [ ] No performance degradation from font rendering optimizations
- [ ] All existing responsive typography features continue to work

## All Needed Context

### Documentation & References
```yaml
# MUST READ - Include these in your context window
- url: https://developer.mozilla.org/en-US/docs/Web/CSS/text-rendering
  why: Understanding text-rendering property and its mobile performance implications
  
- url: https://developer.mozilla.org/en-US/docs/Web/CSS/font-smooth
  why: WebKit-specific font smoothing properties and their effects
  
- url: https://css-tricks.com/almanac/properties/t/text-rendering/
  why: Real-world implications of text-rendering on mobile, especially Android issues
  
- url: https://web.dev/font-best-practices/
  why: Google's recommendations for font loading and performance
  
- file: /Users/iolloyd/code/blog/assets/css/style.css
  why: Main stylesheet with font-family definitions and CSS custom properties
  
- file: /Users/iolloyd/code/blog/assets/css/mobile.css
  why: Existing mobile styles to understand current responsive system
  
- doc: https://betterprogramming.pub/improving-font-rendering-with-css-3383fc358cbc
  section: Font rendering improvements
  critical: -webkit-text-stroke technique for fixing thin text on WebKit
```

### Current Codebase tree
```bash
.
├── _includes
├── _layouts
├── _posts
├── ai_docs
├── assets
│   ├── css
│   │   ├── style.css         # Main styles with font definitions
│   │   ├── mobile.css        # Mobile-specific styles
│   │   ├── mr-robot.css      # Theme-specific styles
│   │   └── resume.css        # Resume-specific styles
│   ├── images
│   └── js
└── PRPs
    └── templates
```

### Desired Codebase tree with files to be added
```bash
.
├── assets
│   ├── css
│   │   ├── style.css         # Updated with font-display properties
│   │   ├── mobile.css        # Enhanced with font rendering fixes
│   │   └── fonts.css         # NEW: Dedicated font loading and rendering styles
```

### Known Gotchas & Library Quirks
```css
/* CRITICAL: text-rendering: optimizeLegibility causes severe performance issues on mobile */
/* Android 4.2/4.3 has broken text-rendering support */
/* -webkit-font-smoothing only affects macOS/iOS, not Android */
/* font-display: swap prevents invisible text but may cause layout shift */
/* iOS Safari requires font-size: 16px on inputs to prevent zoom */
/* System fonts vary significantly between iOS/Android versions */
```

## Implementation Blueprint

### Data models and structure

No data models needed for CSS-only implementation.

### List of tasks to be completed in order

```yaml
Task 1:
CREATE assets/css/fonts.css:
  - Define @font-face rules with font-display: swap
  - Optimize system font stacks for mobile platforms
  - Add font rendering properties with mobile-specific overrides

Task 2:
MODIFY assets/css/style.css:
  - Import new fonts.css file
  - Update CSS custom properties for better mobile font stacks
  - Add font loading optimization comments

Task 3:
MODIFY assets/css/mobile.css:
  - Add WebKit font rendering fixes
  - Implement -webkit-text-stroke for thin text issues
  - Add mobile-specific text-rendering optimizations
  - Ensure all interactive elements maintain 16px minimum

Task 4:
MODIFY _layouts/default.html:
  - Add font preload tags for critical fonts
  - Implement font loading strategy

Task 5:
Testing and validation:
  - Test on real iOS devices (Safari)
  - Test on Android devices (Chrome, Samsung Internet)
  - Verify no performance regressions
  - Check font loading behavior on slow connections
```

### Per task pseudocode/implementation details

```css
# Task 1 - fonts.css structure
/* Font Loading Strategy */
@font-face {
  font-family: 'System';
  src: local(system-ui), local(-apple-system);
  font-display: swap; /* Prevents FOIT */
}

/* Mobile-optimized font stacks */
:root {
  --font-system-mobile: system-ui, -apple-system, "SF Pro Display", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  --font-mono-mobile: ui-monospace, "SF Mono", "Cascadia Code", "Roboto Mono", Consolas, monospace;
}

# Task 3 - Mobile rendering fixes
/* WebKit font rendering improvements */
@media (max-width: 768px) {
  body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeSpeed; /* NOT optimizeLegibility on mobile */
    
    /* Fix for thin text on iOS */
    -webkit-text-stroke: 0.35px;
  }
  
  /* High DPI screen adjustments */
  @media (-webkit-min-device-pixel-ratio: 2) {
    body {
      -webkit-text-stroke: 0.2px; /* Thinner stroke for retina */
    }
  }
}

# Task 4 - Font preloading
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preload" as="font" type="font/woff2" crossorigin>
```

### Integration Points
```yaml
LAYOUTS:
  - add to: _layouts/default.html
  - pattern: Add font preload links in <head>
  
CSS IMPORTS:
  - add to: assets/css/style.css
  - pattern: "@import 'fonts.css';" at top of file
  
MOBILE STYLES:
  - modify: assets/css/mobile.css
  - add: Font rendering optimizations in mobile media queries
```

## Validation Loop

### Level 1: CSS Validation
```bash
# Validate CSS syntax
npx stylelint "assets/css/*.css" --fix

# Check for CSS errors
# Expected: No errors in any CSS files
```

### Level 2: Visual Testing
```bash
# Start local server
bundle exec jekyll serve

# Test on mobile devices:
# 1. Open http://localhost:4000 on iOS Safari
# 2. Check text rendering is crisp
# 3. Verify no FOIT on page load
# 4. Test on Android Chrome
# 5. Verify input fields don't zoom on focus
```

### Level 3: Performance Testing
```bash
# Use Chrome DevTools Lighthouse
# 1. Open site in Chrome
# 2. Open DevTools > Lighthouse
# 3. Run mobile audit
# 4. Check "Eliminate render-blocking resources" score
# 5. Verify no font-related issues

# Expected: Performance score >90, no font loading issues
```

### Level 4: Cross-browser Testing
```text
Test Matrix:
- [ ] iOS Safari (latest)
- [ ] iOS Safari (iOS 14)
- [ ] Chrome Mobile (Android)
- [ ] Samsung Internet
- [ ] Firefox Mobile

For each browser verify:
- Text appears crisp and readable
- No layout shifts during font loading
- Form inputs don't trigger zoom
- Font sizes are consistent
```

## Final Validation Checklist
- [ ] All CSS files validate without errors
- [ ] No console errors on mobile devices
- [ ] Text rendering is crisp on all tested devices
- [ ] No FOIT/FOUT on slow 3G connection
- [ ] Form inputs maintain 16px minimum on iOS
- [ ] Performance audit shows no font-related issues
- [ ] Font loading doesn't block page render
- [ ] Existing responsive features still work

---

## Anti-Patterns to Avoid
- ❌ Don't use text-rendering: optimizeLegibility on mobile (performance killer)
- ❌ Don't load custom fonts without font-display property
- ❌ Don't use px units for all font sizes (breaks accessibility)
- ❌ Don't ignore system font preferences
- ❌ Don't add heavy font files without subsetting
- ❌ Don't forget to test on actual devices (emulators miss rendering issues)
- ❌ Don't use -webkit-text-stroke values above 0.5px (text becomes bold)

## Confidence Score: 8/10

The implementation is straightforward with clear patterns to follow. Points deducted for:
- Need for real device testing (cannot be fully automated)
- Potential for device-specific quirks not covered in research

The PRP provides comprehensive context for fixing mobile font rendering issues with clear validation steps and known gotchas documented.