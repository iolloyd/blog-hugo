// Tactical Mobile Navigation
// Military command center interface with precision controls
// Tactical-themed mobile navigation with accessibility and modern interactions

class TacticalMobileNav {
  constructor() {
    this.toggle = document.querySelector('.tactical-mobile-toggle');
    this.overlay = document.querySelector('.tactical-mobile-overlay');
    this.menu = document.querySelector('.tactical-mobile-menu');
    this.closeBtn = document.querySelector('.tactical-mobile-close');
    this.links = document.querySelectorAll('.tactical-mobile-link');
    this.isOpen = false;
    this.touchStartX = 0;
    this.touchStartY = 0;
    this.isDragging = false;
    this.dragProgress = 0;
    
    // Tactical animation settings
    this.supportsWebAnimations = 'animate' in HTMLElement.prototype;
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.supportsHapticFeedback = 'vibrate' in navigator;
    
    this.init();
  }
  
  init() {
    if (!this.toggle || !this.menu || !this.overlay) {
      console.warn('Tactical mobile nav elements not found');
      return;
    }
    
    console.log('Initializing tactical mobile navigation...');
    
    // Toggle button click
    this.toggle.addEventListener('click', (e) => {
      e.preventDefault();
      this.toggleMenu();
    });
    
    // Close button click
    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.closeMenu();
      });
    }
    
    // Overlay click to close
    this.overlay.addEventListener('click', (e) => {
      if (e.target === this.overlay) {
        this.closeMenu();
      }
    });
    
    // Close on link click
    this.links.forEach(link => {
      link.addEventListener('click', () => {
        this.closeMenu();
      });
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.closeMenu();
      }
    });
    
    // Touch gestures for swipe to close
    this.initTouchGestures();
    
    // Prevent body scroll when menu is open
    this.initBodyScrollLock();
    
    // Focus management
    this.initFocusTrap();
    
    // Handle resize
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768 && this.isOpen) {
        this.closeMenu();
      }
    });
  }
  
  toggleMenu() {
    if (this.isOpen) {
      this.closeMenu();
    } else {
      this.openMenu();
    }
  }
  
  openMenu() {
    this.isOpen = true;
    document.body.classList.add('tactical-menu-open');
    
    // Update ARIA attributes
    this.toggle.setAttribute('aria-expanded', 'true');
    this.overlay.setAttribute('aria-hidden', 'false');
    
    // Haptic feedback for tactical response
    this.triggerTacticalFeedback('engage');
    
    // Tactical animation sequence
    if (this.supportsWebAnimations && !this.reducedMotion) {
      this.animateMenuOpen();
    }
    
    // Focus management - move to first interactive element
    setTimeout(() => {
      if (this.closeBtn) {
        this.closeBtn.focus();
      }
    }, this.reducedMotion ? 0 : 250);
    
    // Screen reader announcement
    this.announceTacticalStatus('NAVIGATION MENU ACTIVATED');
  }
  
  closeMenu() {
    this.isOpen = false;
    document.body.classList.remove('tactical-menu-open');
    
    // Update ARIA attributes
    this.toggle.setAttribute('aria-expanded', 'false');
    this.overlay.setAttribute('aria-hidden', 'true');
    
    // Haptic feedback for tactical response
    this.triggerTacticalFeedback('disengage');
    
    // Tactical animation sequence
    if (this.supportsWebAnimations && !this.reducedMotion) {
      this.animateMenuClose();
    }
    
    // Return focus to toggle
    this.toggle.focus();
    
    // Screen reader announcement
    this.announceTacticalStatus('NAVIGATION MENU DEACTIVATED');
  }
  
  initTouchGestures() {
    // Touch events for swipe to close
    this.menu.addEventListener('touchstart', (e) => {
      const touch = e.touches[0];
      this.touchStartX = touch.clientX;
      this.touchStartY = touch.clientY;
      this.isDragging = false;
      this.dragProgress = 0;
    }, { passive: true });
    
    this.menu.addEventListener('touchmove', (e) => {
      if (!this.isOpen) return;
      
      const touch = e.touches[0];
      const deltaX = touch.clientX - this.touchStartX;
      const deltaY = Math.abs(touch.clientY - this.touchStartY);
      
      // Only start dragging if horizontal movement is greater than vertical
      if (!this.isDragging && Math.abs(deltaX) > 10 && Math.abs(deltaX) > deltaY) {
        this.isDragging = true;
      }
      
      // If dragging to the right (closing gesture)
      if (this.isDragging && deltaX > 0) {
        this.dragProgress = Math.min(deltaX / 200, 1);
        
        // Visual feedback during drag
        this.menu.style.transform = `translateX(${deltaX * 0.8}px)`;
        this.overlay.style.opacity = Math.max(0.2, 1 - (this.dragProgress * 0.6));
        
        // Prevent default scrolling when dragging
        if (this.dragProgress > 0.1) {
          e.preventDefault();
        }
        
        // Tactical haptic feedback at threshold
        if (this.dragProgress > 0.4 && !this.hapticTriggered) {
          this.triggerTacticalFeedback('warning');
          this.hapticTriggered = true;
        }
      }
    }, { passive: false });
    
    this.menu.addEventListener('touchend', (e) => {
      if (!this.isDragging) {
        this.resetDragState();
        return;
      }
      
      // Close menu if drag progress is sufficient
      if (this.dragProgress > 0.4) {
        this.triggerTacticalFeedback('disengage');
        this.closeMenu();
      } else {
        // Reset menu position with animation
        if (this.supportsWebAnimations && !this.reducedMotion) {
          this.animateMenuReset();
        } else {
          this.menu.style.transform = '';
          this.overlay.style.opacity = '';
        }
      }
      
      this.resetDragState();
    }, { passive: true });
  }
  
  resetDragState() {
    this.isDragging = false;
    this.dragProgress = 0;
    this.touchStartX = 0;
    this.touchStartY = 0;
    this.hapticTriggered = false;
  }
  
  initBodyScrollLock() {
    // Prevent body scrolling when tactical menu is active
    const originalOverflow = document.body.style.overflow;
    const originalPosition = document.body.style.position;
    
    const observer = new MutationObserver(() => {
      if (document.body.classList.contains('tactical-menu-open')) {
        const scrollY = window.scrollY;
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollY}px`;
        document.body.style.width = '100%';
      } else {
        const scrollY = parseInt(document.body.style.top || '0') * -1;
        document.body.style.overflow = originalOverflow;
        document.body.style.position = originalPosition;
        document.body.style.top = '';
        document.body.style.width = '';
        window.scrollTo(0, scrollY);
      }
    });
    
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['class']
    });
  }
  
  initFocusTrap() {
    // Focus trap for tactical menu accessibility
    const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    
    this.menu.addEventListener('keydown', (e) => {
      if (e.key !== 'Tab' || !this.isOpen) return;
      
      const focusables = this.menu.querySelectorAll(focusableElements);
      const firstFocusable = focusables[0];
      const lastFocusable = focusables[focusables.length - 1];
      
      if (e.shiftKey) {
        // Shift + Tab - backwards
        if (document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable.focus();
        }
      } else {
        // Tab - forwards
        if (document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable.focus();
        }
      }
    });
  }
  
  // Tactical-themed animations
  animateMenuOpen() {
    // Tactical slide-in animation
    const menuKeyframes = [
      { transform: 'translateX(100%)', opacity: 0 },
      { transform: 'translateX(0)', opacity: 1 }
    ];
    
    const overlayKeyframes = [
      { opacity: 0 },
      { opacity: 1 }
    ];
    
    const options = {
      duration: 250,
      easing: 'cubic-bezier(0.2, 0, 0.2, 1)',
      fill: 'forwards'
    };
    
    this.menu.animate(menuKeyframes, options);
    this.overlay.animate(overlayKeyframes, { ...options, duration: 200 });
  }
  
  animateMenuClose() {
    // Tactical slide-out animation
    const menuKeyframes = [
      { transform: 'translateX(0)', opacity: 1 },
      { transform: 'translateX(100%)', opacity: 0 }
    ];
    
    const overlayKeyframes = [
      { opacity: 1 },
      { opacity: 0 }
    ];
    
    const options = {
      duration: 200,
      easing: 'cubic-bezier(0.4, 0, 1, 1)',
      fill: 'forwards'
    };
    
    this.menu.animate(menuKeyframes, options);
    this.overlay.animate(overlayKeyframes, options);
  }
  
  animateMenuReset() {
    // Reset menu position after partial drag
    const currentTransform = this.menu.style.transform;
    
    this.menu.animate([
      { transform: currentTransform },
      { transform: 'translateX(0)' }
    ], {
      duration: 150,
      easing: 'cubic-bezier(0.2, 0, 0.2, 1)'
    }).addEventListener('finish', () => {
      this.menu.style.transform = '';
      this.overlay.style.opacity = '';
    });
  }
  
  // Tactical haptic feedback patterns
  triggerTacticalFeedback(pattern = 'engage') {
    if (!this.supportsHapticFeedback) return;
    
    const tacticalPatterns = {
      engage: [20, 50, 20],      // Short-long-short
      disengage: [10],           // Single short
      warning: [30, 100, 30]     // Alert pattern
    };
    
    if (navigator.vibrate && tacticalPatterns[pattern]) {
      navigator.vibrate(tacticalPatterns[pattern]);
    }
  }
  
  // Screen reader announcements with tactical terminology
  announceTacticalStatus(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.classList.add('tactical-sr-only');
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
      if (document.body.contains(announcement)) {
        document.body.removeChild(announcement);
      }
    }, 1000);
  }
}

// Initialize tactical mobile navigation
function initTacticalMobileNav() {
  console.log('Initializing tactical mobile navigation...');
  
  // Only initialize on tactical-themed pages
  const isTacticalTheme = document.querySelector('.nav-tactical');
  if (!isTacticalTheme) {
    console.log('Not a tactical-themed page, skipping tactical mobile nav');
    return;
  }
  
  const tacticalNav = new TacticalMobileNav();
  
  // Debug information
  console.log('Tactical nav elements found:', {
    toggle: !!tacticalNav.toggle,
    overlay: !!tacticalNav.overlay,
    menu: !!tacticalNav.menu,
    closeBtn: !!tacticalNav.closeBtn
  });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initTacticalMobileNav);
} else {
  initTacticalMobileNav();
}

// Add tactical screen reader styles
const tacticalSRStyles = document.createElement('style');
tacticalSRStyles.textContent = `
  .tactical-sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
`;
document.head.appendChild(tacticalSRStyles);