name: "Mr. Robot Theme Implementation for Jekyll Blog"
description: |

## Purpose
Transform the existing Jekyll blog from an Apple-inspired aesthetic to a dark, cyberpunk Mr. Robot-inspired theme with terminal aesthetics, CRT effects, and hacker culture visual elements.

## Core Principles
1. **Context is King**: Include ALL necessary documentation, examples, and caveats
2. **Validation Loops**: Provide executable tests/lints the AI can run and fix
3. **Information Dense**: Use keywords and patterns from the codebase
4. **Progressive Success**: Start simple, validate, then enhance
5. **Global rules**: Be sure to follow all rules in CLAUDE.md

---

## Goal
Create a complete Mr. Robot-inspired theme for the Jekyll blog that captures the show's dark, terminal-based aesthetic with authentic hacker culture elements, CRT monitor effects, and cyberpunk visual design.

## Why
- Transform the blog from clean Apple aesthetic to dark cyberpunk/hacker aesthetic
- Create immersive atmosphere that appeals to technical audience
- Differentiate the site with unique terminal-inspired visual identity
- Align with personal brand as engineering executive with deep technical roots

## What
Dark theme with terminal-inspired UI featuring:
- Dark backgrounds (#0a0a0a to #1a1a1a)
- Green phosphor text (#33ff33, #66ff66) with glow effects
- CRT monitor effects (scan lines, flicker, glow)
- Terminal/monospace typography
- ASCII art elements
- Glitch animations
- Command-line inspired navigation
- Matrix-style digital rain effects (optional)

### Success Criteria
- [ ] Dark theme implemented across all pages
- [ ] Terminal-style typography and color scheme active
- [ ] CRT effects visible but not distracting
- [ ] Navigation redesigned with command-line aesthetic
- [ ] Blog posts formatted like terminal output
- [ ] Site remains readable and accessible
- [ ] Performance not significantly impacted
- [ ] Mobile responsive design maintained

## All Needed Context

### Documentation & References
```yaml
# MUST READ - Include these in your context window
- url: https://css-tricks.com/old-timey-terminal-styling/
  why: CRT monitor effects implementation in CSS
  
- url: https://codepen.io/somethingformed/pen/raWJXV
  why: Terminal text effects and animations
  
- url: https://github.com/Swordfish90/cool-retro-term
  why: Reference for authentic terminal aesthetics
  
- file: /Users/iolloyd/code/blog/assets/css/style.css
  why: Current CSS to be replaced/modified
  
- file: /Users/iolloyd/code/blog/_layouts/default.html
  why: Main layout template to modify
  
- file: /Users/iolloyd/code/blog/_config.yml
  why: Jekyll configuration for site metadata

- docfile: /Users/iolloyd/code/blog/APPLE-DESIGN-GUIDE.md
  why: Current design system to understand what's being replaced
```

### Current Codebase tree
```bash
/Users/iolloyd/code/blog
├── _config.yml
├── _includes
│   └── analytics.html
├── _layouts
│   ├── apple-default.html
│   ├── apple-home.html
│   ├── default.html
│   ├── home.html
│   ├── page.html
│   └── post.html
├── _posts
│   ├── 2025-01-03-makefile-as-development-environment.md
│   ├── 2025-01-30-tokenization-platforms-regulation-as-competitive-advantage.md
│   ├── 2025-01-30-when-boring-tech-is-best.md
│   ├── 2025-07-06-sqlite-postgresql-right-database-for-most-use-cases.md
│   ├── 2025-07-07-just-postgresql.md
│   └── 2025-07-14-duckdb-the-surprising-swiss-army-knife-of-data.md
├── assets
│   ├── css
│   │   ├── resume.css
│   │   └── style.css
│   └── js
│       └── animations.js
```

### Desired Codebase tree with files to be added
```bash
/Users/iolloyd/code/blog
├── assets
│   ├── css
│   │   ├── mr-robot.css          # Main Mr. Robot theme styles
│   │   ├── terminal-effects.css  # CRT and terminal effects
│   │   └── resume.css           # Keep existing (update colors)
│   └── js
│       ├── mr-robot.js          # Theme-specific interactions
│       └── terminal.js          # Terminal effects and animations
├── _layouts
│   ├── mr-robot-default.html    # New base layout
│   ├── mr-robot-home.html       # New homepage layout
│   ├── mr-robot-post.html       # New blog post layout
│   └── [keep existing for fallback]
├── _includes
│   ├── terminal-header.html     # Terminal-style header
│   └── ascii-art.html          # ASCII art components
```

### Known Gotchas & Design Considerations
```css
/* CRITICAL: Mr. Robot aesthetic specifics */
/* 1. Colors must be muted/dark - no pure white (#ffffff) */
/* 2. Green phosphor should glow using text-shadow */
/* 3. CRT effects should be subtle on mobile for performance */
/* 4. Monospace fonts required throughout */
/* 5. Animation performance matters - use CSS transforms */
/* 6. Accessibility: maintain contrast ratios despite dark theme */
```

## Implementation Blueprint

### Data models and structure

Create the core visual language components:
```css
/* Color palette - Mr. Robot cyberpunk theme */
:root {
  --mr-bg-primary: #0a0a0a;      /* Near black background */
  --mr-bg-secondary: #1a1a1a;    /* Slightly lighter black */
  --mr-text-primary: #33ff33;    /* Classic terminal green */
  --mr-text-secondary: #66ff66;  /* Brighter green for emphasis */
  --mr-accent: #ff0066;          /* Danger/alert red-pink */
  --mr-warning: #ffaa00;         /* Warning amber */
  --mr-gray: #666666;            /* Muted gray for secondary text */
  --mr-terminal-font: 'Fira Code', 'Courier New', monospace;
}
```

### List of tasks to be completed in order

```yaml
Task 1:
CREATE assets/css/mr-robot.css:
  - MIRROR structure from: assets/css/style.css
  - MODIFY all color variables to dark theme
  - REPLACE font stacks with monospace options
  - ADD terminal-specific utility classes

Task 2:
CREATE assets/css/terminal-effects.css:
  - ADD CRT monitor effects (scan lines, glow)
  - ADD text animations (typewriter, flicker)
  - ADD glitch effects for hover states
  - ENSURE performance with will-change

Task 3:
CREATE _layouts/mr-robot-default.html:
  - COPY from: _layouts/default.html
  - MODIFY CSS imports to use mr-robot.css
  - ADD terminal-effects.css import
  - UPDATE navigation to terminal style
  - ADD ASCII art header element

Task 4:
CREATE assets/js/terminal.js:
  - ADD typewriter effect for headings
  - ADD cursor blink animation
  - ADD command prompt interactions
  - ADD subtle CRT flicker effect

Task 5:
CREATE assets/js/mr-robot.js:
  - ADD theme initialization
  - ADD glitch effects on interaction
  - ADD terminal command navigation
  - ADD Easter eggs (konami code, etc)

Task 6:
CREATE _includes/terminal-header.html:
  - ADD ASCII art logo/banner
  - ADD terminal prompt navigation
  - ADD system status indicators
  - STYLE like actual terminal header

Task 7:
CREATE _layouts/mr-robot-home.html:
  - COPY from: _layouts/home.html
  - MODIFY hero section to terminal boot sequence
  - ADD typewriter effect to intro text
  - STYLE sections as terminal windows

Task 8:
CREATE _layouts/mr-robot-post.html:
  - COPY from: _layouts/post.html
  - STYLE content as terminal output
  - ADD line numbers to code blocks
  - FORMAT metadata as terminal comments

Task 9:
MODIFY assets/css/resume.css:
  - UPDATE colors to match Mr. Robot theme
  - MAINTAIN professional readability
  - ADD subtle terminal styling

Task 10:
UPDATE _config.yml:
  - ADD theme configuration variables
  - UPDATE site description for new aesthetic
```

### Per task pseudocode

```css
# Task 1 - Main theme CSS structure
/* mr-robot.css pseudocode */
:root {
  /* Color variables as defined above */
  /* Add glow/shadow variables */
  --mr-glow: 0 0 10px rgba(51, 255, 51, 0.8);
  --mr-scanline: repeating-linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.15),
    rgba(0, 0, 0, 0.15) 1px,
    transparent 1px,
    transparent 2px
  );
}

/* Global reset with terminal styling */
* { cursor: default; } /* Terminal cursor */
*::selection { 
  background: var(--mr-text-primary);
  color: var(--mr-bg-primary);
}

body {
  background: var(--mr-bg-primary);
  color: var(--mr-text-primary);
  font-family: var(--mr-terminal-font);
  /* Add scan line overlay */
}

/* Terminal window styling */
.terminal-window {
  border: 1px solid var(--mr-text-primary);
  box-shadow: var(--mr-glow);
  /* Terminal chrome styling */
}
```

```javascript
# Task 4 - Terminal effects JavaScript
// terminal.js pseudocode
class TerminalEffect {
  constructor(element) {
    this.element = element;
    this.text = element.textContent;
    this.speed = 50; // ms per character
  }
  
  typewriter() {
    // Clear element
    // Add characters one by one with delay
    // Add blinking cursor at end
  }
  
  addCursor() {
    // Create span with cursor character
    // Add blink animation
  }
}

// CRT flicker effect
function addCRTFlicker() {
  // Random subtle opacity changes
  // Use requestAnimationFrame for performance
}
```

### Integration Points
```yaml
LAYOUTS:
  - update to: index.md
  - frontmatter: "layout: mr-robot-home"
  
  - update to: blog.md  
  - frontmatter: "layout: mr-robot-default"
  
  - update to: cv.md
  - frontmatter: "layout: mr-robot-default"
  
CSS LOADING:
  - in: _layouts/mr-robot-default.html
  - replace: <link rel="stylesheet" href="/assets/css/style.css">
  - with: |
      <link rel="stylesheet" href="/assets/css/mr-robot.css">
      <link rel="stylesheet" href="/assets/css/terminal-effects.css">
  
JAVASCRIPT:
  - in: _layouts/mr-robot-default.html
  - before: </body>
  - add: |
      <script src="/assets/js/terminal.js"></script>
      <script src="/assets/js/mr-robot.js"></script>
```

## Validation Loop

### Level 1: Syntax & Style
```bash
# Check CSS syntax
npx stylelint "assets/css/*.css" --fix

# Validate HTML
npx htmlhint "_layouts/*.html"

# Expected: No errors. If errors, READ and fix.
```

### Level 2: Visual Testing
```bash
# Start Jekyll server
bundle exec jekyll serve

# Visual checks:
# 1. Dark theme applied to all pages
# 2. Green text visible and glowing
# 3. Terminal effects working
# 4. Navigation functional
# 5. Mobile responsive

# Browser testing
# - Chrome/Firefox/Safari
# - Mobile viewports
# - Check contrast ratios
```

### Level 3: Performance Testing
```bash
# Check page load performance
# Terminal effects shouldn't impact core web vitals

# Test animations
# - Smooth 60fps
# - No layout shifts
# - GPU acceleration working
```

## Final Validation Checklist
- [ ] All pages use Mr. Robot theme
- [ ] Terminal effects working (scan lines, glow)
- [ ] Typography is monospace throughout
- [ ] Dark color scheme properly implemented
- [ ] Navigation redesigned with terminal aesthetic
- [ ] Mobile responsive design maintained
- [ ] No accessibility issues (contrast ratios OK)
- [ ] Performance acceptable (no jank)
- [ ] ASCII art renders correctly
- [ ] Glitch effects subtle and intentional

---

## Anti-Patterns to Avoid
- ❌ Don't make effects too heavy (performance)
- ❌ Don't sacrifice readability for aesthetics
- ❌ Don't use pure black (#000000) - too harsh
- ❌ Don't overdo glitch effects - less is more
- ❌ Don't break existing functionality
- ❌ Don't forget mobile experience
- ❌ Don't use copyrighted Mr. Robot assets

## Additional Notes

### Accessibility Considerations
- Maintain WCAG AA contrast ratios (4.5:1 minimum)
- Provide option to disable animations
- Ensure keyboard navigation works
- Screen reader compatibility

### Performance Optimizations
- Use CSS transforms for animations
- Implement will-change for animated elements
- Lazy load heavy effects on mobile
- Use CSS containment for terminal windows

### Progressive Enhancement
- Start with basic dark theme
- Layer on CRT effects
- Add animations last
- Ensure graceful degradation

### Easter Eggs Ideas
- Konami code triggers special effect
- Hidden terminal commands in navigation
- ASCII art variations on refresh
- fsociety references (subtle)

## PRP Quality Score: 9/10

High confidence for one-pass implementation due to:
- Comprehensive color and design specifications
- Clear file structure and naming
- Specific implementation steps in order
- Existing codebase patterns to follow
- Validation steps at each level
- Performance and accessibility considerations included

The only uncertainty is around specific ASCII art creation, but core theme implementation should succeed in one pass.