// Apple-style animations and interactions
document.addEventListener('DOMContentLoaded', function() {
  
  // Parallax effect for hero section
  const hero = document.querySelector('.apple-hero');
  if (hero) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const parallax = scrolled * -0.5;
      hero.style.transform = `translateY(${parallax}px)`;
    });
  }
  
  // Smooth reveal animations
  const animateOnScroll = () => {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    elements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const elementBottom = element.getBoundingClientRect().bottom;
      const windowHeight = window.innerHeight;
      
      if (elementTop < windowHeight * 0.8 && elementBottom > 0) {
        element.classList.add('animated');
      }
    });
  };
  
  // Add animation classes to elements
  const addAnimationClasses = () => {
    // Feature cards
    document.querySelectorAll('.apple-feature-card').forEach((card, index) => {
      card.classList.add('animate-on-scroll', 'fade-up');
      card.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Philosophy items
    document.querySelectorAll('.apple-philosophy-item').forEach((item, index) => {
      item.classList.add('animate-on-scroll', 'fade-up');
      item.style.animationDelay = `${index * 0.15}s`;
    });
    
    // Blog preview items
    document.querySelectorAll('.apple-blog-preview-item').forEach((item, index) => {
      item.classList.add('animate-on-scroll', 'fade-up');
      item.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Blog list items
    document.querySelectorAll('.apple-blog-item').forEach((item, index) => {
      item.classList.add('animate-on-scroll', 'fade-left');
      item.style.animationDelay = `${Math.min(index * 0.05, 0.3)}s`;
    });
  };
  
  // Navigation background opacity on scroll
  const nav = document.querySelector('.apple-nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      if (scrolled > 50) {
        nav.style.background = 'rgba(251, 251, 253, 0.95)';
      } else {
        nav.style.background = 'rgba(251, 251, 253, 0.8)';
      }
    });
  }
  
  // Smooth scroll for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const navHeight = 52;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Enhanced button interactions with touch support
  const enhanceButtons = () => {
    document.querySelectorAll('.apple-btn, .btn, button').forEach(btn => {
      // Skip if already enhanced
      if (btn.dataset.enhanced) return;
      btn.dataset.enhanced = 'true';
      
      // Mouse hover effects
      btn.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
      });
      
      btn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
      });
      
      // Touch interactions with haptic feedback
      btn.addEventListener('touchstart', function(e) {
        // Prevent double-tap zoom
        e.preventDefault();
        
        // Visual feedback
        this.style.transform = 'scale(0.95)';
        this.classList.add('touch-active');
        
        // Haptic feedback (if supported)
        if (window.navigator && window.navigator.vibrate) {
          window.navigator.vibrate(10); // Light haptic tap
        }
      }, { passive: false });
      
      btn.addEventListener('touchend', function() {
        this.style.transform = 'scale(1)';
        this.classList.remove('touch-active');
      });
      
      // Handle touch cancel
      btn.addEventListener('touchcancel', function() {
        this.style.transform = 'scale(1)';
        this.classList.remove('touch-active');
      });
    });
  };
  
  // Enhanced link interactions
  const enhanceLinks = () => {
    document.querySelectorAll('a').forEach(link => {
      // Skip if already enhanced or is navigation
      if (link.dataset.enhanced || link.closest('.apple-nav')) return;
      link.dataset.enhanced = 'true';
      
      link.addEventListener('touchstart', function() {
        this.classList.add('touch-active');
      }, { passive: true });
      
      link.addEventListener('touchend', function() {
        this.classList.remove('touch-active');
      });
    });
  };
  
  // Touch-friendly card interactions
  const enhanceCards = () => {
    const cards = document.querySelectorAll('.apple-feature-card, .apple-blog-preview-item, .apple-blog-item');
    
    cards.forEach(card => {
      if (card.dataset.enhanced) return;
      card.dataset.enhanced = 'true';
      
      // Make entire card tappable if it contains a link
      const link = card.querySelector('a');
      if (link) {
        card.style.cursor = 'pointer';
        
        card.addEventListener('click', function(e) {
          if (e.target.tagName !== 'A') {
            link.click();
          }
        });
        
        // Touch feedback
        card.addEventListener('touchstart', function() {
          this.style.transform = 'scale(0.98)';
          this.classList.add('touch-active');
        }, { passive: true });
        
        card.addEventListener('touchend', function() {
          this.style.transform = '';
          this.classList.remove('touch-active');
        });
      }
    });
  };
  
  enhanceButtons();
  enhanceLinks();
  enhanceCards();
  
  // Mobile menu functionality moved to mobile-nav.js for better organization
  
  // Initialize
  addAnimationClasses();
  animateOnScroll();
  
  // Mobile navigation is now handled in mobile-nav.js
  
  // Listen for scroll events
  let ticking = false;
  function requestTick() {
    if (!ticking) {
      window.requestAnimationFrame(animateOnScroll);
      ticking = true;
      setTimeout(() => { ticking = false; }, 100);
    }
  }
  
  window.addEventListener('scroll', requestTick);
  window.addEventListener('resize', () => {
    animateOnScroll();
    // Mobile navigation is now handled in mobile-nav.js
  });
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
  /* Animation classes */
  .animate-on-scroll {
    opacity: 0;
    transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
                transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  }
  
  .animate-on-scroll.animated {
    opacity: 1;
  }
  
  .fade-up {
    transform: translateY(30px);
  }
  
  .fade-up.animated {
    transform: translateY(0);
  }
  
  .fade-left {
    transform: translateX(-30px);
  }
  
  .fade-left.animated {
    transform: translateX(0);
  }
  
  /* Mobile menu styles are now in mobile.css */
  
  /* Touch interaction styles */
  .touch-active {
    opacity: 0.7 !important;
    transition: all 0.1s ease !important;
  }
  
  .apple-btn.touch-active,
  .btn.touch-active {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15) !important;
  }
  
  .apple-feature-card.touch-active,
  .apple-blog-preview-item.touch-active,
  .apple-blog-item.touch-active {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1) !important;
  }
  
  /* Prevent text selection on touch */
  @media (pointer: coarse) {
    .apple-btn,
    .btn,
    button,
    .apple-feature-card,
    .apple-blog-preview-item,
    .apple-blog-item {
      -webkit-touch-callout: none;
      -webkit-user-select: none;
      user-select: none;
    }
  }
  
  /* Performance optimizations */
  .apple-hero,
  .apple-nav {
    will-change: transform;
  }
  
  .apple-btn,
  .btn,
  button {
    will-change: transform;
    -webkit-tap-highlight-color: transparent;
  }
  
  /* Smooth transitions for touch */
  * {
    -webkit-tap-highlight-color: transparent;
  }
`;
document.head.appendChild(style);