// Mobile Navigation Enhancement
// Implements accessible, touch-friendly navigation with gesture support

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
    
    this.init();
  }
  
  init() {
    if (!this.toggle || !this.menu) return;
    
    // Toggle button click
    this.toggle.addEventListener('click', () => this.toggleMenu());
    
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
    
    // Focus management
    setTimeout(() => {
      if (this.closeBtn) {
        this.closeBtn.focus();
      }
    }, 300);
    
    // Announce to screen readers
    this.announceToScreenReader('Navigation menu opened');
  }
  
  closeMenu() {
    this.isOpen = false;
    document.body.classList.remove('menu-open');
    this.toggle.setAttribute('aria-expanded', 'false');
    this.overlay.setAttribute('aria-hidden', 'true');
    
    // Return focus to toggle button
    this.toggle.focus();
    
    // Announce to screen readers
    this.announceToScreenReader('Navigation menu closed');
  }
  
  initTouchGestures() {
    // Swipe right to close menu
    this.menu.addEventListener('touchstart', (e) => {
      this.touchStartX = e.touches[0].clientX;
      this.touchStartY = e.touches[0].clientY;
    }, { passive: true });
    
    this.menu.addEventListener('touchmove', (e) => {
      if (!this.touchStartX || !this.touchStartY) return;
      
      this.touchEndX = e.touches[0].clientX;
      this.touchEndY = e.touches[0].clientY;
      
      // Calculate swipe distance
      const diffX = this.touchEndX - this.touchStartX;
      const diffY = Math.abs(this.touchEndY - this.touchStartY);
      
      // If horizontal swipe is greater than vertical, and swipe right
      if (diffX > 50 && diffY < 50) {
        // Visual feedback during swipe
        const progress = Math.min(diffX / 200, 1);
        this.menu.style.transform = `translateX(${diffX}px)`;
        this.overlay.style.opacity = 1 - (progress * 0.5);
      }
    }, { passive: true });
    
    this.menu.addEventListener('touchend', () => {
      const diffX = this.touchEndX - this.touchStartX;
      
      // If swipe right is more than 100px, close menu
      if (diffX > 100) {
        this.closeMenu();
      } else {
        // Reset position
        this.menu.style.transform = '';
        this.overlay.style.opacity = '';
      }
      
      // Reset touch coordinates
      this.touchStartX = 0;
      this.touchStartY = 0;
      this.touchEndX = 0;
      this.touchEndY = 0;
    }, { passive: true });
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
      document.body.removeChild(announcement);
    }, 1000);
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new MobileNav();
});

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