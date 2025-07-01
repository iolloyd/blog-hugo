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
  
  // Button hover effects
  document.querySelectorAll('.apple-btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.05)';
    });
    
    btn.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1)';
    });
  });
  
  // Mobile menu toggle
  const createMobileMenu = () => {
    const navContainer = document.querySelector('.apple-nav-container');
    if (!navContainer) return;
    
    // Create menu toggle button
    const menuToggle = document.createElement('button');
    menuToggle.className = 'apple-menu-toggle';
    menuToggle.innerHTML = `
      <span></span>
      <span></span>
      <span></span>
    `;
    
    // Create mobile menu backdrop
    const backdrop = document.createElement('div');
    backdrop.className = 'apple-menu-backdrop';
    
    // Insert elements
    navContainer.appendChild(menuToggle);
    document.body.appendChild(backdrop);
    
    // Toggle menu
    menuToggle.addEventListener('click', () => {
      document.body.classList.toggle('menu-open');
    });
    
    backdrop.addEventListener('click', () => {
      document.body.classList.remove('menu-open');
    });
  };
  
  // Initialize
  addAnimationClasses();
  animateOnScroll();
  
  if (window.innerWidth <= 768) {
    createMobileMenu();
  }
  
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
    if (window.innerWidth <= 768 && !document.querySelector('.apple-menu-toggle')) {
      createMobileMenu();
    }
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
  
  /* Mobile menu styles */
  .apple-menu-toggle {
    display: none;
    flex-direction: column;
    gap: 4px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 8px;
    z-index: 1001;
  }
  
  .apple-menu-toggle span {
    display: block;
    width: 20px;
    height: 2px;
    background: var(--apple-black);
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }
  
  .apple-menu-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    z-index: 999;
  }
  
  @media (max-width: 768px) {
    .apple-menu-toggle {
      display: flex;
    }
    
    .apple-nav-menu {
      position: fixed;
      top: 0;
      right: -280px;
      width: 280px;
      height: 100vh;
      background: var(--apple-white);
      flex-direction: column;
      padding: 80px 40px;
      gap: var(--space-lg);
      transition: right 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      z-index: 1000;
      box-shadow: -10px 0 30px rgba(0, 0, 0, 0.1);
    }
    
    .menu-open .apple-nav-menu {
      right: 0;
    }
    
    .menu-open .apple-menu-backdrop {
      opacity: 1;
      visibility: visible;
    }
    
    .menu-open .apple-menu-toggle span:nth-child(1) {
      transform: rotate(45deg) translate(5px, 5px);
    }
    
    .menu-open .apple-menu-toggle span:nth-child(2) {
      opacity: 0;
    }
    
    .menu-open .apple-menu-toggle span:nth-child(3) {
      transform: rotate(-45deg) translate(5px, -5px);
    }
  }
  
  /* Performance optimizations */
  .apple-hero,
  .apple-nav {
    will-change: transform;
  }
  
  .apple-btn {
    will-change: transform;
  }
`;
document.head.appendChild(style);