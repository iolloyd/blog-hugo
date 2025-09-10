name: "Phone UX Improvements for Jekyll Blog v1.0"
description: |

## Purpose
Enhance the mobile user experience of the Jekyll blog by implementing comprehensive phone-optimized features following Apple's Human Interface Guidelines and modern mobile UX best practices. This will ensure optimal readability, navigation, and interaction patterns for users accessing the blog from mobile devices.

## Core Principles
1. **Context is King**: Include ALL necessary documentation, examples, and caveats
2. **Validation Loops**: Provide executable tests/lints the AI can run and fix
3. **Information Dense**: Use keywords and patterns from the codebase
4. **Progressive Success**: Start simple, validate, then enhance
5. **Global rules**: Be sure to follow all rules in CLAUDE.md

---

## Goal
Implement comprehensive mobile UX improvements to create a premium, Apple-inspired mobile experience that:
- Ensures all touch targets meet the 44x44px minimum requirement
- Optimizes typography and spacing for mobile readability
- Implements thumb-friendly navigation patterns
- Adds micro-interactions for enhanced feedback
- Improves performance on mobile devices
- Supports offline functionality for better user experience
- Implements progressive web app features

## Why
- **Mobile Traffic**: Over 60% of web traffic comes from mobile devices
- **User Retention**: 53% of users abandon sites that take >3 seconds to load
- **Accessibility**: Improved mobile UX helps users with disabilities
- **Brand Perception**: Premium mobile experience aligns with professional brand
- **SEO Benefits**: Mobile-friendly sites rank higher in search results

## What
Implement mobile-first responsive design improvements including:
- Enhanced navigation with hamburger menu for mobile
- Optimized touch targets and spacing
- Improved typography scale for mobile screens
- Performance optimizations (lazy loading, image optimization)
- Micro-interactions and haptic feedback support
- Offline support with service worker
- Progressive Web App capabilities

### Success Criteria
- [ ] All touch targets are at least 44x44 pixels
- [ ] Page load time under 3 seconds on 3G connection
- [ ] Typography remains readable without zooming
- [ ] Navigation is accessible with one thumb
- [ ] Images load progressively with lazy loading
- [ ] Site works offline for previously visited pages
- [ ] Passes Google's Mobile-Friendly Test

## All Needed Context

### Documentation & References
```yaml
# MUST READ - Include these in your context window
- url: https://developer.apple.com/design/human-interface-guidelines/layout
  why: Apple's official guidelines for responsive layout and mobile design
  
- url: https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariWebContent/UsingtheViewport/UsingtheViewport.html
  why: Apple's viewport configuration for optimal mobile rendering
  
- url: https://web.dev/articles/responsive-web-design-basics
  why: Google's mobile best practices including performance metrics
  
- file: /Users/iolloyd/code/blog/assets/css/style.css
  why: Current CSS with Apple-inspired design system to maintain consistency
  
- file: /Users/iolloyd/code/blog/_layouts/default.html
  why: Base layout structure that needs mobile navigation enhancements
  
- doc: https://jekyllrb.com/docs/assets/
  section: Asset management in Jekyll
  critical: Understanding Jekyll's asset pipeline for optimization

- file: /Users/iolloyd/code/blog/assets/js/animations.js
  why: Existing animation patterns to extend with mobile interactions
```

### Current Codebase tree
```bash
/Users/iolloyd/code/blog/
├── _config.yml
├── _includes/
│   ├── analytics.html
│   └── terminal-header.html
├── _layouts/
│   ├── default.html
│   ├── apple-default.html
│   ├── home.html
│   ├── page.html
│   └── post.html
├── assets/
│   ├── css/
│   │   ├── style.css
│   │   ├── mr-robot.css
│   │   ├── resume.css
│   │   └── terminal-effects.css
│   └── js/
│       ├── animations.js
│       ├── mr-robot.js
│       └── terminal.js
├── _posts/
├── index.md
├── about.md
├── blog.md
└── cv.md
```

### Desired Codebase tree with files to be added
```bash
/Users/iolloyd/code/blog/
├── _includes/
│   ├── mobile-nav.html          # New hamburger navigation component
│   └── image-lazy.html          # New lazy loading image component
├── assets/
│   ├── css/
│   │   ├── mobile.css           # New mobile-specific styles
│   │   └── style.css            # Modified with mobile improvements
│   └── js/
│       ├── mobile-nav.js        # New mobile navigation logic
│       ├── lazy-load.js         # New lazy loading implementation
│       ├── service-worker.js    # New PWA offline support
│       └── animations.js        # Modified with mobile interactions
├── manifest.json                # New PWA manifest
└── sw.js                       # New service worker registration
```

### Known Gotchas & Library Quirks
```yaml
# CRITICAL: Jekyll static site considerations
# - No server-side rendering, all optimizations must be client-side
# - Jekyll's asset pipeline doesn't minify by default
# - GitHub Pages has limited plugin support

# CRITICAL: Safari iOS specific issues
# - 100vh includes browser chrome, use -webkit-fill-available
# - Touch events need -webkit-tap-highlight-color: transparent
# - Momentum scrolling requires -webkit-overflow-scrolling: touch

# CRITICAL: Performance considerations
# - Inline critical CSS for faster first paint
# - Lazy load images below the fold only
# - Service worker scope must be root directory
```

## Implementation Blueprint

### Data models and structure

No data models needed for this feature - purely front-end implementation.

### List of tasks to be completed in order

```yaml
Task 1: Create mobile navigation component
MODIFY _layouts/default.html:
  - FIND pattern: '<nav class="apple-nav">'
  - ADD mobile menu toggle button after brand
  - ADD aria-labels for accessibility
  - PRESERVE existing navigation structure

CREATE _includes/mobile-nav.html:
  - MIRROR pattern from: existing apple-nav structure
  - ADD hamburger icon with SVG
  - IMPLEMENT slide-in menu pattern
  - ENSURE 44x44px touch targets

Task 2: Implement mobile-specific CSS
CREATE assets/css/mobile.css:
  - IMPLEMENT mobile-first media queries
  - ADD touch-friendly spacing variables
  - OPTIMIZE typography scale for small screens
  - FIX viewport height issues with -webkit-fill-available

MODIFY assets/css/style.css:
  - IMPORT mobile.css at end of file
  - UPDATE existing media queries
  - PRESERVE Apple design language

Task 3: Add mobile navigation JavaScript
CREATE assets/js/mobile-nav.js:
  - IMPLEMENT hamburger menu toggle
  - ADD touch gesture support
  - PREVENT body scroll when menu open
  - ADD escape key handler

MODIFY _layouts/default.html:
  - ADD script tag for mobile-nav.js
  - ENSURE proper loading order

Task 4: Implement lazy loading for images
CREATE _includes/image-lazy.html:
  - CREATE reusable image component
  - ADD loading="lazy" attribute
  - IMPLEMENT placeholder blur effect
  - SUPPORT responsive srcset

CREATE assets/js/lazy-load.js:
  - FALLBACK for browsers without native lazy loading
  - IMPLEMENT Intersection Observer pattern
  - ADD progressive image loading

Task 5: Add Progressive Web App features
CREATE manifest.json:
  - DEFINE app metadata
  - SPECIFY icons for different sizes
  - SET theme and background colors
  - CONFIGURE display mode

CREATE sw.js:
  - IMPLEMENT service worker registration
  - CACHE static assets
  - ENABLE offline page viewing
  - HANDLE cache updates

CREATE assets/js/service-worker.js:
  - IMPLEMENT cache strategies
  - CACHE visited pages for offline
  - HANDLE network failures gracefully

Task 6: Optimize touch interactions
MODIFY assets/js/animations.js:
  - ADD touch event listeners
  - IMPLEMENT haptic feedback API
  - ADD micro-interactions for buttons
  - OPTIMIZE for 60fps animations

Task 7: Performance optimizations
MODIFY _layouts/default.html:
  - INLINE critical CSS
  - DEFER non-critical scripts
  - ADD resource hints (preconnect, dns-prefetch)
  - OPTIMIZE font loading

Task 8: Update Jekyll configuration
MODIFY _config.yml:
  - ADD PWA manifest to assets
  - CONFIGURE asset compression
  - EXCLUDE service worker from Jekyll processing
```

### Per task pseudocode

```python
# Task 1: Mobile Navigation
# _includes/mobile-nav.html structure
<button class="mobile-nav-toggle" aria-label="Toggle navigation" aria-expanded="false">
  <svg class="hamburger-icon">
    # Three lines that animate to X
  </svg>
</button>
<div class="mobile-nav-overlay">
  <nav class="mobile-nav-menu">
    # PATTERN: Use existing nav links from apple-nav-menu
    # CRITICAL: Each link needs padding for 44x44px touch target
  </nav>
</div>

# Task 3: Mobile Navigation JS
class MobileNav:
    def __init__(self):
        self.toggle = document.querySelector('.mobile-nav-toggle')
        self.overlay = document.querySelector('.mobile-nav-overlay')
        self.isOpen = False
        
    def init(self):
        # PATTERN: Follow animations.js event binding style
        self.toggle.addEventListener('click', self.handleToggle)
        # CRITICAL: Prevent body scroll when menu open
        # GOTCHA: iOS needs both overflow hidden and position fixed
        
    def handleToggle(self):
        # Toggle aria-expanded for accessibility
        # Add/remove active classes with transitions
        # Trap focus within menu when open

# Task 4: Lazy Loading Implementation
class LazyLoader:
    def __init__(self):
        # PATTERN: Check for native lazy loading support
        if ('loading' in HTMLImageElement.prototype):
            # Use native implementation
        else:
            # Fallback to Intersection Observer
            
    def observeImages(self):
        # CRITICAL: Only observe images below fold
        # PATTERN: Add blur-up effect like Medium
        # rootMargin: '50px' for early loading

# Task 5: Service Worker
# sw.js cache strategies
const CACHE_NAME = 'blog-v1'
const urlsToCache = [
  '/',
  '/assets/css/style.css',
  '/assets/js/animations.js',
  # CRITICAL: Only cache essential assets initially
]

self.addEventListener('fetch', (event) => {
  # PATTERN: Network first, fallback to cache
  # GOTCHA: Don't cache POST requests
  # CRITICAL: Handle navigation requests specially
})
```

### Integration Points
```yaml
HTML MODIFICATIONS:
  - _layouts/default.html: Add mobile nav, PWA meta tags
  - all layouts: Update image tags to use lazy loading include
  
CSS IMPORTS:
  - add to: assets/css/style.css
  - pattern: "@import 'mobile.css';"
  
JAVASCRIPT LOADING:
  - add to: _layouts/default.html footer
  - pattern: '<script src="/assets/js/mobile-nav.js" defer></script>'
  
PWA CONFIGURATION:
  - add to: _layouts/default.html head
  - pattern: '<link rel="manifest" href="/manifest.json">'
  
JEKYLL CONFIG:
  - add to: _config.yml
  - pattern: "include: ['manifest.json', 'sw.js']"
```

## Validation Loop

### Level 1: Syntax & Style
```bash
# Validate HTML
html-validate _site/**/*.html

# Validate CSS
npx stylelint assets/css/*.css

# Validate JavaScript
npx eslint assets/js/*.js

# Expected: No errors. If errors, READ and fix.
```

### Level 2: Mobile Testing
```bash
# Test with Google Mobile-Friendly Test
open https://search.google.com/test/mobile-friendly

# Test with Lighthouse
npx lighthouse http://localhost:4000 --view

# Expected scores:
# - Performance: >90
# - Accessibility: 100
# - Best Practices: 100
# - SEO: 100
# - PWA: All checks pass
```

### Level 3: Manual Testing
```bash
# Start Jekyll server
bundle exec jekyll serve

# Test on real devices or simulators:
# 1. iPhone Safari: Verify touch targets, navigation
# 2. Android Chrome: Test PWA installation
# 3. iPad: Verify responsive breakpoints

# Critical tests:
# - Hamburger menu opens/closes smoothly
# - All links have adequate touch targets
# - Images lazy load as you scroll
# - Site works offline after first visit
# - No horizontal scroll on any device
```

## Final Validation Checklist
- [ ] Mobile navigation works on all screen sizes
- [ ] Touch targets are all 44x44px minimum
- [ ] Lazy loading reduces initial page weight by >50%
- [ ] Service worker enables offline viewing
- [ ] Page loads in <3 seconds on 3G
- [ ] No layout shifts during loading
- [ ] Passes accessibility audit
- [ ] PWA can be installed on devices

---

## Anti-Patterns to Avoid
- ❌ Don't use fixed pixel values for typography - use relative units
- ❌ Don't hide content on mobile - reorganize it instead
- ❌ Don't disable zoom - users need this for accessibility
- ❌ Don't use hover-only interactions - they don't work on touch
- ❌ Don't lazy load above-the-fold images
- ❌ Don't cache everything - be selective to avoid bloat

## Confidence Score: 8/10

The PRP provides comprehensive context for implementing mobile UX improvements. Points deducted for:
- Potential complexity in service worker implementation
- May need iterations for cross-browser compatibility

However, the clear task breakdown, extensive documentation references, and validation steps should enable successful one-pass implementation.