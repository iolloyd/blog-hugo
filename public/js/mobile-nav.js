// Enhanced Mobile Navigation
// Modern touch interactions, accessibility, and gesture support
// Includes: haptic feedback, pointer events, modern animation APIs

class MobileNav {
  constructor() {
    this.toggle = document.querySelector('.mobile-nav-toggle');
    this.overlay = document.querySelector('.mobile-nav-overlay');
    this.menu = document.querySelector('.mobile-nav-menu');
    this.closeBtn = document.querySelector('.mobile-nav-close');
    this.links = document.querySelectorAll('.mobile-nav-link');
    this.isOpen = false;
    this.touchStartX = 0;
    this.touchStartY = 0;
    this.touchEndX = 0;
    this.touchEndY = 0;
    this.dragProgress = 0;
    this.isDragging = false;
    
    // Animation and feedback
    this.supportsHapticFeedback = 'vibrate' in navigator;
    this.supportsWebAnimations = 'animate' in HTMLElement.prototype;
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    this.init();
  }
  
  init() {
    if (!this.toggle || !this.menu) {
      console.error('Mobile nav elements not found:', {
        toggle: this.toggle,
        menu: this.menu
      });
      return;
    }
    
    console.log('Setting up mobile nav event listeners');
    
    // Toggle button click
    this.toggle.addEventListener('click', () => {
      console.log('Toggle button clicked');
      this.toggleMenu();
    });
    
    // Close button click
    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.closeMenu());
    }
    
    // Overlay click to close
    if (this.overlay) {
      this.overlay.addEventListener('click', (e) => {
        if (e.target === this.overlay) {
          this.closeMenu();
        }
      });
    }
    
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
    this.preventBodyScroll();
    
    // Handle focus trap
    this.initFocusTrap();
    
    // Update aria attributes on resize
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768 && this.isOpen) {
        this.closeMenu();
      }
    });
  }
  
  toggleMenu() {
    console.log('toggleMenu called, isOpen:', this.isOpen);
    if (this.isOpen) {
      this.closeMenu();
    } else {
      this.openMenu();
    }
  }
  
  openMenu() {
    this.isOpen = true;
    document.body.classList.add('menu-open');
    this.toggle.setAttribute('aria-expanded', 'true');
    this.overlay.setAttribute('aria-hidden', 'false');
    
    // Haptic feedback on supported devices
    this.triggerHapticFeedback('light');
    
    // Modern animation with Web Animations API
    if (this.supportsWebAnimations && !this.reducedMotion) {
      this.animateMenuOpen();
    }
    
    // Focus management
    setTimeout(() => {
      if (this.closeBtn) {
        this.closeBtn.focus();
      }
    }, this.reducedMotion ? 0 : 300);
    
    // Announce to screen readers
    this.announceToScreenReader('Navigation menu opened');
  }
  
  closeMenu() {
    this.isOpen = false;
    document.body.classList.remove('menu-open');
    this.toggle.setAttribute('aria-expanded', 'false');
    this.overlay.setAttribute('aria-hidden', 'true');
    
    // Haptic feedback on supported devices
    this.triggerHapticFeedback('light');
    
    // Modern animation with Web Animations API
    if (this.supportsWebAnimations && !this.reducedMotion) {
      this.animateMenuClose();
    }
    
    // Return focus to toggle button
    this.toggle.focus();
    
    // Announce to screen readers
    this.announceToScreenReader('Navigation menu closed');
  }
  
  initTouchGestures() {
    // Enhanced touch gestures with pointer events and better feedback
    this.initPointerEvents();
    this.initTouchEvents();
  }
  
  initPointerEvents() {
    // Modern pointer events for better cross-platform support
    if ('PointerEvent' in window) {
      this.menu.addEventListener('pointerdown', (e) => {
        if (e.pointerType === 'touch') {
          this.handlePointerStart(e);
        }
      });
      
      this.menu.addEventListener('pointermove', (e) => {
        if (e.pointerType === 'touch' && this.isDragging) {
          this.handlePointerMove(e);
        }
      });
      
      this.menu.addEventListener('pointerup', (e) => {
        if (e.pointerType === 'touch') {
          this.handlePointerEnd(e);
        }
      });
      
      this.menu.addEventListener('pointercancel', (e) => {
        if (e.pointerType === 'touch') {
          this.resetDragState();
        }
      });
    }
  }
  
  initTouchEvents() {
    // Fallback to touch events for older browsers
    this.menu.addEventListener('touchstart', (e) => {
      this.handleTouchStart(e);
    }, { passive: true });
    
    this.menu.addEventListener('touchmove', (e) => {
      this.handleTouchMove(e);
    }, { passive: false }); // Not passive to prevent default when needed
    
    this.menu.addEventListener('touchend', (e) => {
      this.handleTouchEnd(e);
    }, { passive: true });
    
    this.menu.addEventListener('touchcancel', (e) => {
      this.resetDragState();
    }, { passive: true });
  }
  
  handlePointerStart(e) {
    this.startDrag(e.clientX, e.clientY);
  }
  
  handlePointerMove(e) {
    this.updateDrag(e.clientX, e.clientY);
  }
  
  handlePointerEnd(e) {
    this.endDrag();
  }
  
  handleTouchStart(e) {
    const touch = e.touches[0];
    this.startDrag(touch.clientX, touch.clientY);
  }
  
  handleTouchMove(e) {
    if (!this.isDragging) return;
    
    const touch = e.touches[0];
    this.updateDrag(touch.clientX, touch.clientY);
    
    // Prevent default scroll if we're dragging horizontally
    if (this.dragProgress > 0.1) {
      e.preventDefault();
    }
  }
  
  handleTouchEnd(e) {
    this.endDrag();
  }
  
  startDrag(x, y) {
    this.touchStartX = x;
    this.touchStartY = y;
    this.isDragging = false;
    this.dragProgress = 0;
  }
  
  updateDrag(x, y) {
    const diffX = x - this.touchStartX;
    const diffY = Math.abs(y - this.touchStartY);
    
    // Only start dragging if horizontal movement is greater than vertical
    if (!this.isDragging && Math.abs(diffX) > 10 && diffX > diffY) {
      this.isDragging = true;
    }
    
    if (this.isDragging && diffX > 0) {
      this.dragProgress = Math.min(diffX / 200, 1);
      
      // Smooth visual feedback
      if (this.supportsWebAnimations && !this.reducedMotion) {
        this.menu.style.transform = `translateX(${diffX * 0.8}px)`;
      } else {
        this.menu.style.transform = `translateX(${diffX}px)`;
      }
      
      this.overlay.style.opacity = Math.max(0.1, 1 - (this.dragProgress * 0.7));
      
      // Haptic feedback at certain thresholds
      if (this.dragProgress > 0.3 && !this.hapticTriggered) {
        this.triggerHapticFeedback('light');
        this.hapticTriggered = true;
      }
    }
  }
  
  endDrag() {
    if (!this.isDragging) {
      this.resetDragState();
      return;
    }
    
    // Close menu if drag progress is sufficient
    if (this.dragProgress > 0.4) {
      this.triggerHapticFeedback('medium');
      this.closeMenu();
    } else {
      // Animate back to original position
      if (this.supportsWebAnimations && !this.reducedMotion) {
        this.animateMenuReset();
      } else {
        this.menu.style.transform = '';
        this.overlay.style.opacity = '';
      }
    }
    
    this.resetDragState();
  }
  
  resetDragState() {
    this.isDragging = false;
    this.dragProgress = 0;
    this.touchStartX = 0;
    this.touchStartY = 0;
    this.hapticTriggered = false;
  }
  
  preventBodyScroll() {
    // Save original body overflow style
    const originalOverflow = document.body.style.overflow;
    const originalPosition = document.body.style.position;
    
    // Prevent scrolling when menu is open
    const observer = new MutationObserver(() => {
      if (document.body.classList.contains('menu-open')) {
        // Save scroll position
        const scrollY = window.scrollY;
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollY}px`;
        document.body.style.width = '100%';
      } else {
        // Restore scroll position
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
    const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    
    this.menu.addEventListener('keydown', (e) => {
      if (e.key !== 'Tab' || !this.isOpen) return;
      
      const focusables = this.menu.querySelectorAll(focusableElements);
      const firstFocusable = focusables[0];
      const lastFocusable = focusables[focusables.length - 1];
      
      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable.focus();
        }
      }
    });
  }
  
  announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.classList.add('sr-only');
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
      if (document.body.contains(announcement)) {
        document.body.removeChild(announcement);
      }
    }, 1000);
  }
  
  // Modern animation methods
  animateMenuOpen() {
    if (!this.menu || this.reducedMotion) return;
    
    const keyframes = [
      { transform: 'translateX(100%)', opacity: 0 },
      { transform: 'translateX(0)', opacity: 1 }
    ];
    
    const options = {
      duration: 300,
      easing: 'cubic-bezier(0.2, 0, 0.2, 1)',
      fill: 'forwards'
    };
    
    this.menu.animate(keyframes, options);
    
    // Animate overlay
    this.overlay.animate(
      [{ opacity: 0 }, { opacity: 1 }],
      { duration: 200, easing: 'ease-out', fill: 'forwards' }
    );
  }
  
  animateMenuClose() {
    if (!this.menu || this.reducedMotion) return;
    
    const keyframes = [
      { transform: 'translateX(0)', opacity: 1 },
      { transform: 'translateX(100%)', opacity: 0 }
    ];
    
    const options = {
      duration: 250,
      easing: 'cubic-bezier(0.4, 0, 1, 1)',
      fill: 'forwards'
    };
    
    this.menu.animate(keyframes, options);
    
    // Animate overlay
    this.overlay.animate(
      [{ opacity: 1 }, { opacity: 0 }],
      { duration: 200, easing: 'ease-in', fill: 'forwards' }
    );
  }
  
  animateMenuReset() {
    if (!this.menu || this.reducedMotion) return;
    
    const currentTransform = this.menu.style.transform;
    
    this.menu.animate([
      { transform: currentTransform },
      { transform: 'translateX(0)' }
    ], {
      duration: 200,
      easing: 'cubic-bezier(0.2, 0, 0.2, 1)'
    }).addEventListener('finish', () => {
      this.menu.style.transform = '';
      this.overlay.style.opacity = '';
    });
  }
  
  // Haptic feedback for supported devices
  triggerHapticFeedback(intensity = 'light') {
    if (!this.supportsHapticFeedback) return;
    
    const patterns = {
      light: [10],
      medium: [20],
      heavy: [50]
    };
    
    if (navigator.vibrate && patterns[intensity]) {
      navigator.vibrate(patterns[intensity]);
    }
  }
}

// Initialize mobile navigation
// Handle both immediate and deferred script loading
function initializeMobileNav() {
  console.log('Initializing mobile navigation...');
  const mobileNav = new MobileNav();
  
  // Add debug info
  console.log('Mobile nav elements found:', {
    toggle: !!mobileNav.toggle,
    overlay: !!mobileNav.overlay,
    menu: !!mobileNav.menu,
    closeBtn: !!mobileNav.closeBtn
  });
}

// Check if DOM is already loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeMobileNav);
} else {
  // DOM is already loaded, initialize immediately
  initializeMobileNav();
}

// Add screen reader only styles
const srStyles = document.createElement('style');
srStyles.textContent = `
  .sr-only {
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
document.head.appendChild(srStyles);