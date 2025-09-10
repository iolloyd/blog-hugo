/**
 * Mr. Robot Theme JavaScript
 * Theme initialization, glitch effects, and Easter eggs
 */

(function() {
  'use strict';

  // Theme configuration
  const config = {
    glitchEnabled: true,
    particlesEnabled: false,
    audioEnabled: false,
    easterEggsEnabled: true
  };

  // Konami Code sequence
  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  let konamiIndex = 0;

  // Initialize theme
  function initTheme() {
    // Add theme class to body
    document.body.classList.add('mr-robot-theme');
    
    // Initialize navigation effects
    initNavigation();
    
    // Initialize glitch effects
    if (config.glitchEnabled) {
      initGlitchEffects();
    }
    
    // Initialize easter eggs
    if (config.easterEggsEnabled) {
      initEasterEggs();
    }
    
    // Initialize terminal prompts
    initTerminalPrompts();
    
    // Initialize smooth scrolling
    initSmoothScroll();
  }

  // Navigation effects
  function initNavigation() {
    const navLinks = document.querySelectorAll('.terminal-nav-link');
    
    navLinks.forEach(link => {
      // Add hover sound effect (if enabled)
      link.addEventListener('mouseenter', () => {
        if (config.audioEnabled) {
          playSound('hover');
        }
      });
      
      // Add click effect
      link.addEventListener('click', (e) => {
        if (link.getAttribute('href').startsWith('#')) {
          e.preventDefault();
          const target = document.querySelector(link.getAttribute('href'));
          if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
          }
        }
      });
    });
  }

  // Glitch effects
  function initGlitchEffects() {
    // Add glitch effect to headers on hover
    const headers = document.querySelectorAll('h1, h2, h3');
    
    headers.forEach(header => {
      header.setAttribute('data-text', header.textContent);
      
      header.addEventListener('mouseenter', () => {
        header.classList.add('glitch');
        setTimeout(() => {
          header.classList.remove('glitch');
        }, 1000);
      });
    });
    
    // Random glitch on page elements
    setInterval(() => {
      if (Math.random() > 0.95) {
        const elements = document.querySelectorAll('p, a, span');
        const randomElement = elements[Math.floor(Math.random() * elements.length)];
        
        if (randomElement && !randomElement.classList.contains('no-glitch')) {
          randomElement.classList.add('glitch');
          setTimeout(() => {
            randomElement.classList.remove('glitch');
          }, 200);
        }
      }
    }, 5000);
  }

  // Easter eggs
  function initEasterEggs() {
    // Konami code listener
    document.addEventListener('keydown', (e) => {
      if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
          activateEasterEgg();
          konamiIndex = 0;
        }
      } else {
        konamiIndex = 0;
      }
    });
    
    // Hidden terminal command
    let commandBuffer = '';
    document.addEventListener('keypress', (e) => {
      commandBuffer += e.key;
      
      if (commandBuffer.includes('fsociety')) {
        fsocietyMode();
        commandBuffer = '';
      }
      
      // Clear buffer after 2 seconds
      setTimeout(() => {
        commandBuffer = '';
      }, 2000);
    });
  }

  // Activate Easter egg
  function activateEasterEgg() {
    console.log('%c EASTER EGG ACTIVATED! ', 'background: #33ff33; color: #0a0a0a; font-size: 20px;');
    
    // Create glitch overlay
    const overlay = document.createElement('div');
    overlay.className = 'easter-egg-overlay';
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: #0a0a0a;
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: var(--mr-terminal-font);
      color: var(--mr-text-primary);
      font-size: 2rem;
      text-shadow: var(--mr-glow-intense);
    `;
    
    overlay.innerHTML = `
      <div class="easter-egg-content">
        <pre style="font-size: 1rem; line-height: 1.2;">
 _____ ____  ___   ____ ___ _____ _______   __
|  ___/ ___| / _ \\ / ___|_ _| ____|_   _\\ \\ / /
| |_  \\___ \\| | | | |    | ||  _|   | |  \\ V / 
|  _|  ___) | |_| | |___ | || |___  | |   | |  
|_|   |____/ \\___/ \\____|___|_____| |_|   |_|  
        </pre>
        <p style="margin-top: 2rem;">Hello, friend.</p>
      </div>
    `;
    
    document.body.appendChild(overlay);
    
    // Remove overlay after 3 seconds
    setTimeout(() => {
      overlay.style.opacity = '0';
      overlay.style.transition = 'opacity 1s';
      setTimeout(() => {
        document.body.removeChild(overlay);
      }, 1000);
    }, 3000);
  }

  // fsociety mode
  function fsocietyMode() {
    document.body.classList.add('fsociety-mode');
    
    // Change all text to fsociety message
    const textElements = document.querySelectorAll('h1, h2, h3, p');
    const originalText = [];
    
    textElements.forEach((el, index) => {
      originalText[index] = el.textContent;
      el.setAttribute('data-original', el.textContent);
      window.glitchText(el);
      
      setTimeout(() => {
        el.textContent = 'We are fsociety';
      }, 1000);
    });
    
    // Restore after 5 seconds
    setTimeout(() => {
      textElements.forEach((el, index) => {
        window.glitchText(el);
        setTimeout(() => {
          el.textContent = originalText[index];
        }, 1000);
      });
      document.body.classList.remove('fsociety-mode');
    }, 5000);
  }

  // Terminal prompts
  function initTerminalPrompts() {
    // Add blinking cursor to elements with .prompt class
    const prompts = document.querySelectorAll('.prompt');
    
    prompts.forEach(prompt => {
      const cursor = document.createElement('span');
      cursor.className = 'terminal-cursor';
      cursor.textContent = '_';
      prompt.appendChild(cursor);
    });
  }

  // Smooth scroll with terminal effect
  function initSmoothScroll() {
    // Override default anchor behavior
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
          // Add terminal transition effect
          document.body.style.opacity = '0.8';
          
          setTimeout(() => {
            target.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
            document.body.style.opacity = '1';
          }, 100);
        }
      });
    });
  }

  // Console Easter egg
  function initConsoleEasterEgg() {
    console.log('%c MR. ROBOT THEME ACTIVE ', 'background: #0a0a0a; color: #33ff33; font-size: 16px; padding: 5px;');
    console.log('%c Hello, friend. ', 'color: #33ff33; font-size: 14px;');
    console.log('%c Try the Konami code... ', 'color: #666666; font-size: 12px;');
    console.log('%c Or type "fsociety" ', 'color: #666666; font-size: 12px;');
  }

  // Performance monitoring
  function monitorPerformance() {
    // Check if animations are causing performance issues
    let lastTime = performance.now();
    let frames = 0;
    let fps = 0;
    
    function checkFPS() {
      frames++;
      const currentTime = performance.now();
      
      if (currentTime >= lastTime + 1000) {
        fps = Math.round((frames * 1000) / (currentTime - lastTime));
        frames = 0;
        lastTime = currentTime;
        
        // Disable heavy effects if FPS drops below 30
        if (fps < 30 && config.glitchEnabled) {
          console.warn('Low FPS detected, disabling some effects');
          document.body.classList.add('reduced-effects');
        }
      }
      
      requestAnimationFrame(checkFPS);
    }
    
    // Start monitoring after page load
    setTimeout(checkFPS, 1000);
  }

  // Initialize everything when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initTheme();
      initConsoleEasterEgg();
      monitorPerformance();
    });
  } else {
    initTheme();
    initConsoleEasterEgg();
    monitorPerformance();
  }

  // Export functions for external use
  window.mrRobot = {
    config: config,
    activateEasterEgg: activateEasterEgg,
    fsocietyMode: fsocietyMode
  };

})();