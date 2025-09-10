# PRP: Fix Mobile Links Functionality

**Date**: 2025-07-15  
**Status**: Ready for Implementation  
**Confidence Score**: 9/10

## Problem Statement

Links styled as buttons (with classes `.btn` or `.apple-btn`) are not working on mobile devices. The issue is caused by `e.preventDefault()` in the touchstart event handler in `assets/js/animations.js` (line 105), which prevents the default link navigation behavior.

## Context and Research

### Root Cause Analysis
- **File**: `/Users/iolloyd/code/blog/assets/js/animations.js`
- **Function**: `enhanceButtons()` (lines 87-128)
- **Issue**: The touchstart event handler calls `preventDefault()` on ALL elements matching `.apple-btn, .btn, button`
- **Impact**: Anchor tags (`<a>`) with button classes cannot navigate to their href destinations on mobile

### Affected Elements
```html
<!-- Examples of broken links -->
<a href="/experience" class="apple-btn apple-btn-secondary">View experience</a>
<a href="mailto:lloyd@lloydmoore.com" class="apple-btn apple-btn-primary">Email me</a>
<a href="/blog/{{ post.url }}" class="btn btn-sm">Read more</a>
```

### Current Implementation Context
```javascript
// Current problematic code (animations.js:105)
btn.addEventListener('touchstart', function(e) {
  // Prevent double-tap zoom
  e.preventDefault(); // THIS BREAKS LINK NAVIGATION
  
  // Visual feedback
  this.style.transform = 'scale(0.95)';
  this.classList.add('touch-active');
  
  // Haptic feedback (if supported)
  if (window.navigator && window.navigator.vibrate) {
    window.navigator.vibrate(10);
  }
}, { passive: false });
```

## Implementation Blueprint

### Approach 1: CSS-Based Solution (Recommended)
```javascript
// Pseudocode for fix
function enhanceButtons() {
  buttons = querySelectorAll('.apple-btn, .btn, button')
  
  for each button:
    // Add CSS touch-action to prevent double-tap zoom
    button.style.touchAction = 'manipulation'
    
    button.addEventListener('touchstart', function(e) {
      // Remove preventDefault() - let links work naturally
      // Keep visual feedback
      this.style.transform = 'scale(0.95)'
      this.classList.add('touch-active')
      
      // Keep haptic feedback
      if (window.navigator?.vibrate) {
        window.navigator.vibrate(10)
      }
    }, { passive: true }) // Change to passive since no preventDefault
}
```

### Approach 2: Conditional preventDefault (Alternative)
```javascript
// Only prevent default for actual buttons, not links
button.addEventListener('touchstart', function(e) {
  // Only prevent default for button elements, not anchors
  if (this.tagName !== 'A') {
    e.preventDefault()
  }
  
  // Rest of the code remains the same
})
```

## Tasks to Complete

1. **Update animations.js**
   - Remove `e.preventDefault()` from touchstart handler
   - Add `touch-action: manipulation` CSS property to buttons
   - Change event listener to passive
   - Test visual feedback still works

2. **Add CSS touch-action property**
   - Update `assets/css/style.css` to include:
   ```css
   .apple-btn,
   .btn,
   button {
     touch-action: manipulation;
   }
   ```

3. **Verify other touch handlers**
   - Ensure no other event handlers interfere with links
   - Check mobile-nav.js for conflicts

4. **Test comprehensively**
   - Test all button-styled links work on mobile
   - Verify double-tap zoom is still prevented
   - Ensure visual feedback (scale animation) works
   - Confirm haptic feedback functions

## Reference Documentation

- [MDN touch-action CSS property](https://developer.mozilla.org/en-US/docs/Web/CSS/touch-action)
- [Preventing double-tap zoom best practices](https://developers.google.com/web/updates/2013/12/300ms-tap-delay-gone-away)
- [Touch events and preventDefault](https://developer.mozilla.org/en-US/docs/Web/API/TouchEvent)

## Patterns to Follow

- Match existing code style in animations.js
- Use the same visual feedback patterns (scale transform, touch-active class)
- Maintain consistency with other touch handlers (enhanceLinks, enhanceCards)
- Follow the passive event listener pattern used elsewhere

## Error Handling Strategy

1. Feature detection for vibrate API is already implemented
2. Graceful fallback if CSS touch-action not supported (older browsers)
3. Ensure no JavaScript errors break the entire page

## Validation Gates

```bash
# 1. Check JavaScript syntax
npx eslint assets/js/animations.js

# 2. Validate HTML/CSS changes
npx html-validate _site/**/*.html

# 3. Test on actual mobile devices
# Manual testing required - use mobile-test-guide.md checklist

# 4. Verify no console errors
# Open browser DevTools in mobile mode and check console

# 5. Performance check
# Ensure touch responsiveness is maintained
```

## Testing Checklist

- [ ] All navigation button links work on mobile
- [ ] Email/contact links function properly
- [ ] Blog "Read more" links navigate correctly
- [ ] Download CV link works
- [ ] Double-tap zoom is still prevented
- [ ] Visual feedback (scale animation) works
- [ ] Haptic feedback triggers on supported devices
- [ ] No JavaScript errors in console
- [ ] Touch responsiveness feels natural

## Known Gotchas

1. **Passive vs Active Listeners**: When removing preventDefault(), the listener can be passive for better performance
2. **Browser Compatibility**: `touch-action: manipulation` is well-supported but check older iOS versions
3. **Testing**: Must test on actual devices, not just browser DevTools
4. **Related Files**: Changes might affect mobile-nav.js behavior - test mobile menu thoroughly

## Success Criteria

- All links with button classes navigate properly on mobile devices
- Double-tap zoom prevention still works
- No regression in visual/haptic feedback
- No new JavaScript errors
- Performance remains smooth

**Confidence Score: 9/10** - The solution is straightforward with clear implementation path. Only deduction is for the need to test on actual mobile devices.