name: "Mobile Font Selection, Sizing & Spacing Enhancement v1"
description: |

## Purpose
Enhance the existing mobile typography system with improved font selection, sizing, and spacing for optimal readability, accessibility, and user experience on mobile devices.

## Core Principles
1. **Context is King**: Include ALL necessary documentation, examples, and caveats
2. **Validation Loops**: Provide executable tests/lints the AI can run and fix
3. **Information Dense**: Use keywords and patterns from the codebase
4. **Progressive Success**: Start simple, validate, then enhance
5. **Global rules**: Be sure to follow all rules in CLAUDE.md

---

## Goal
Enhance the blog's mobile typography system to provide better readability, improved content hierarchy, and accessibility features while maintaining the existing Apple-inspired design aesthetic. The implementation should support variable fonts for performance, implement proper spacing systems, and add accessibility options like dyslexia-friendly font alternatives.

## Why
- **Better Readability**: Current font sizes work but could be optimized for different content types
- **Accessibility**: No current support for users with dyslexia or vision impairments beyond basic sizing
- **Performance**: System fonts are fast but variable fonts could provide better weight control
- **Consistency**: Need more granular control over spacing and typography hierarchy

## What
Implement an enhanced mobile typography system that:
- Maintains system font stack as primary with optional custom font loading
- Creates content-specific typography scales (articles vs navigation vs UI)
- Implements proper vertical rhythm and spacing system
- Adds accessibility features including dyslexia-friendly alternatives
- Ensures 16px minimum for inputs to prevent iOS zoom

### Success Criteria
- [ ] All text meets WCAG 2.1 AA standards for contrast and sizing
- [ ] No iOS zoom on input focus (16px minimum maintained)
- [ ] Lighthouse mobile score remains 90+ for performance
- [ ] Typography scales properly across device sizes (375px to 428px)
- [ ] Vertical rhythm maintained throughout all content
- [ ] Accessibility options work without breaking layout

## All Needed Context

### Documentation & References
```yaml
# MUST READ - Include these in your context window
- url: https://www.learnui.design/blog/mobile-desktop-website-font-size-guidelines.html
  why: Mobile-specific font size recommendations (16-20px body, 17px recommended start)
  
- url: https://developer.apple.com/design/human-interface-guidelines/typography
  why: iOS typography standards and SF font implementation details
  
- url: https://m3.material.io/styles/typography/type-scale-tokens
  why: Android Material Design 3 typography scale for cross-platform consistency
  
- file: /Users/iolloyd/code/blog/assets/css/mobile.css
  why: Current mobile typography implementation to build upon
  
- file: /Users/iolloyd/code/blog/assets/css/style.css
  why: Base typography system and CSS custom properties
  
- doc: https://web.dev/font-best-practices/
  section: Font loading strategies
  critical: Use font-display: swap for custom fonts to prevent FOIT

- file: /Users/iolloyd/code/blog/PRPs/phone-ux-improvements.md
  why: Existing mobile UX patterns to maintain consistency
```

### Current Codebase tree
```bash
.
├── assets/
│   ├── css/
│   │   ├── style.css          # Base styles with typography scale
│   │   ├── mobile.css         # Mobile-specific overrides
│   │   └── fonts/            # Currently empty (using system fonts)
│   └── js/
│       └── mobile-nav.js      # Mobile navigation logic
├── _layouts/
│   ├── default.html          # Main layout with font loading
│   └── post.html            # Article layout needing typography
├── _includes/
│   └── head.html            # Where font loading occurs
└── validate-mobile.sh        # Mobile validation script
```

### Desired Codebase tree with files to be added
```bash
.
├── assets/
│   ├── css/
│   │   ├── style.css          # Base styles (updated)
│   │   ├── mobile.css         # Mobile overrides (enhanced)
│   │   ├── typography.css     # NEW: Modular typography system
│   │   └── fonts/
│   │       └── inter-var.woff2  # NEW: Variable font for performance
│   └── js/
│       ├── mobile-nav.js      
│       └── font-loader.js     # NEW: Progressive font loading
├── _includes/
│   ├── head.html             # Updated with font loading strategy
│   └── typography-toggle.html # NEW: Accessibility font toggle
└── validate-typography.sh     # NEW: Typography validation
```

### Known Gotchas & Library Quirks
```css
/* CRITICAL: iOS Safari specific issues */
/* 1. Input fields < 16px cause zoom on focus */
input, select, textarea {
  font-size: 16px; /* Never go below this on mobile */
}

/* 2. -webkit-text-stroke can cause performance issues if > 0.5px */
/* Current implementation uses 0.35px which is safe */

/* 3. System font stack must include -apple-system FIRST for iOS */
/* font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display"... */

/* 4. Variable fonts require @supports check for older devices */
@supports (font-variation-settings: normal) {
  /* Variable font implementation */
}

/* 5. Jekyll doesn't support CSS imports, must use HTML link tags */
```

## Implementation Blueprint

### Data models and structure

Create CSS custom properties for enhanced typography control:
```css
/* Content-specific type scales */
:root {
  /* Article typography */
  --article-font-size: clamp(1.125rem, 2vw + 1rem, 1.25rem);
  --article-line-height: 1.7;
  --article-paragraph-spacing: 1.5em;
  
  /* UI typography */
  --ui-font-size: 1rem;
  --ui-line-height: 1.4;
  
  /* Vertical rhythm unit */
  --baseline: 0.5rem;
  
  /* Font loading states */
  --font-loaded: 0; /* JavaScript will set to 1 */
}
```

### List of tasks to be completed in order

```yaml
Task 1: Analyze and Document Current Typography System
READ assets/css/mobile.css:
  - Document all current font sizes and line heights
  - Note iOS-specific fixes already implemented
  - Identify gaps in current implementation

READ assets/css/style.css:
  - Map existing CSS custom properties
  - Document font stack implementation
  - Note any typography utility classes

CREATE PRPs/typography-audit.md:
  - Document findings
  - Create baseline measurements
  - List specific improvements needed

Task 2: Create Enhanced Typography System
CREATE assets/css/typography.css:
  - PATTERN: Use existing CSS custom property structure
  - Implement content-specific scales (article, UI, navigation)
  - Add vertical rhythm system using baseline unit
  - Include @supports checks for variable fonts
  - PRESERVE existing mobile breakpoint structure

MODIFY assets/css/mobile.css:
  - FIND pattern: ":root {" inside @media (max-width: 768px)
  - UPDATE font size scale based on new recommendations
  - ADD line-height adjustments for better readability
  - PRESERVE iOS-specific fixes

Task 3: Implement Font Loading Strategy
CREATE assets/js/font-loader.js:
  - PATTERN: Progressive enhancement approach
  - Implement font-display: swap strategy
  - Use Font Loading API with fallback
  - Set --font-loaded custom property when complete

MODIFY _includes/head.html:
  - ADD preload for critical fonts
  - ADD font loading script
  - PRESERVE existing meta tags and structure

Task 4: Add Accessibility Features
CREATE _includes/typography-toggle.html:
  - PATTERN: Use existing mobile nav toggle as reference
  - Implement dyslexia-friendly font toggle
  - Add font size adjustment controls
  - Ensure ARIA labels for screen readers

MODIFY assets/css/typography.css:
  - ADD .dyslexia-mode class styles
  - Implement OpenDyslexic or similar as fallback
  - Ensure proper contrast ratios maintained

Task 5: Create Validation Script
CREATE validate-typography.sh:
  - PATTERN: Mirror validate-mobile.sh structure
  - Check font file sizes (< 50KB for mobile)
  - Verify CSS imports are correct
  - Test font loading fallbacks
  - Validate WCAG compliance

Task 6: Update Layouts and Test
MODIFY _layouts/default.html:
  - ADD typography toggle component
  - ENSURE proper class application
  - PRESERVE existing structure

MODIFY _layouts/post.html:
  - APPLY article-specific typography classes
  - TEST readability improvements
  - ENSURE proper spacing

Task 7: Performance Optimization
OPTIMIZE font loading:
  - Subset fonts to only needed characters
  - Implement proper caching headers
  - Test on slow 3G connections
  - Ensure no layout shift (CLS)
```

### Per task pseudocode

```python
# Task 2 - Typography System Structure
/* typography.css structure */
/* 1. Base setup with @supports */
@supports (font-variation-settings: normal) {
  @font-face {
    font-family: 'Inter var';
    src: url('../fonts/inter-var.woff2') format('woff2-variations');
    font-weight: 100 900;
    font-display: swap;
  }
}

/* 2. Content-specific scales */
.article-content {
  /* PATTERN: Use clamp() for fluid typography */
  font-size: clamp(1.125rem, 2vw + 1rem, 1.25rem);
  line-height: var(--article-line-height);
  
  /* GOTCHA: Must test on actual devices - appears different than desktop */
}

/* 3. Vertical rhythm implementation */
* {
  /* PATTERN: All spacing based on baseline unit */
  margin-bottom: calc(var(--baseline) * 2);
}

# Task 3 - Font Loading Implementation
// font-loader.js structure
// CRITICAL: Must not block render
(function() {
  // PATTERN: Check if fonts already cached
  if ('fonts' in document) {
    // Modern approach
    document.fonts.load('1em Inter var').then(() => {
      document.documentElement.style.setProperty('--font-loaded', '1');
      document.documentElement.classList.add('fonts-loaded');
    });
  } else {
    // Fallback for older browsers
    // GOTCHA: Don't use for system fonts - unnecessary
  }
})();
```

### Integration Points
```yaml
HEAD.HTML:
  - add: <link rel="preload" href="/assets/fonts/inter-var.woff2" as="font" type="font/woff2" crossorigin>
  - add: <link rel="stylesheet" href="/assets/css/typography.css">
  - pattern: Place after style.css but before mobile.css
  
MOBILE.CSS:
  - update: Font size scale in :root
  - preserve: All iOS-specific fixes
  - add: Import typography utilities
  
LAYOUTS:
  - default.html: Add typography-toggle include
  - post.html: Add article-content class to main content
  
JAVASCRIPT:
  - add to: mobile-nav.js (extend for font controls)
  - pattern: Use same event handling structure
```

## Validation Loop

### Level 1: Syntax & Style
```bash
# Validate CSS syntax
npx stylelint assets/css/typography.css --fix
npx stylelint assets/css/mobile.css --fix

# Check for CSS custom property usage
grep -r "var(--" assets/css/ | grep -E "(font|text|baseline)"

# Expected: All typography uses CSS custom properties
```

### Level 2: Mobile Testing
```bash
# Run typography validation
chmod +x validate-typography.sh
./validate-typography.sh

# Expected output:
# ✓ Font files under 50KB
# ✓ All inputs >= 16px
# ✓ Proper font loading implemented
# ✓ Accessibility features working
```

### Level 3: Device Testing
```bash
# Start Jekyll server
bundle exec jekyll serve --host 0.0.0.0

# Test on real devices (critical for typography)
# 1. iPhone SE (375px) - smallest common viewport
# 2. iPhone 14 Pro (393px) - standard iOS
# 3. Pixel 7 (412px) - standard Android

# Lighthouse test
npx lighthouse http://localhost:4000 \
  --view \
  --only-categories=performance,accessibility \
  --emulated-form-factor=mobile

# Expected scores:
# Performance: 90+
# Accessibility: 95+
```

### Level 4: Accessibility Testing
```bash
# Test with screen reader (iOS VoiceOver, Android TalkBack)
# Manual test checklist:
# - [ ] Font toggle works with keyboard
# - [ ] ARIA labels announced correctly
# - [ ] Text remains readable at 200% zoom
# - [ ] No horizontal scroll at any zoom level

# Automated accessibility test
npx axe http://localhost:4000 --rules wcag2aa
```

## Final Validation Checklist
- [ ] All CSS validates: `npx stylelint assets/css/*.css`
- [ ] Typography scales properly: Test on devices 375px-428px
- [ ] No iOS zoom on inputs: All inputs >= 16px
- [ ] Font loading doesn't block: Lighthouse FCP < 1.8s
- [ ] Accessibility features work: Toggle functions, proper contrast
- [ ] Vertical rhythm maintained: Consistent spacing throughout
- [ ] No layout shift: CLS score < 0.1
- [ ] Documentation updated: README includes typography info

---

## Anti-Patterns to Avoid
- ❌ Don't use px for font sizes - use rem for accessibility
- ❌ Don't load fonts synchronously - always use font-display: swap
- ❌ Don't ignore actual device testing - desktop preview lies
- ❌ Don't set line-height with units - use unitless values
- ❌ Don't forget iOS input zoom - keep inputs at 16px+
- ❌ Don't break existing iOS fixes - preserve -webkit prefixes

## Confidence Score: 8/10

This PRP provides comprehensive context for implementing mobile typography enhancements. The score reflects:
- Strong foundation exists in current codebase (mobile.css)
- Clear documentation and references provided
- Specific implementation patterns from existing code
- Detailed validation steps
- Some complexity in font loading and accessibility features may require iteration

The implementation should succeed in one pass with possible minor adjustments needed for cross-device compatibility testing.