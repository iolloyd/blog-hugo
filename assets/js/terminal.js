/**
 * Terminal Effects JavaScript
 * Provides typewriter effects, cursor animations, and terminal interactions
 */

(function() {
  'use strict';

  // Terminal Effect Class
  class TerminalEffect {
    constructor(element, options = {}) {
      this.element = element;
      this.text = element.textContent || element.innerText;
      this.speed = options.speed || 50;
      this.cursor = options.cursor !== false;
      this.cursorChar = options.cursorChar || '_';
      this.callback = options.callback || null;
      this.preserve = options.preserve || false;
    }

    typewriter() {
      if (!this.preserve) {
        this.element.textContent = '';
      }
      
      let index = 0;
      const type = () => {
        if (index < this.text.length) {
          this.element.textContent += this.text.charAt(index);
          index++;
          setTimeout(type, this.speed + Math.random() * 30);
        } else {
          if (this.cursor) {
            this.addCursor();
          }
          if (this.callback) {
            this.callback();
          }
        }
      };
      
      type();
    }

    addCursor() {
      const cursor = document.createElement('span');
      cursor.className = 'terminal-cursor';
      cursor.textContent = this.cursorChar;
      this.element.appendChild(cursor);
    }
  }

  // Boot sequence animation
  function bootSequence() {
    const messages = [
      'INITIALIZING SYSTEM...',
      'LOADING KERNEL MODULES...',
      'MOUNTING FILE SYSTEMS...',
      'STARTING NETWORK SERVICES...',
      'LOADING USER INTERFACE...',
      'SYSTEM READY.'
    ];

    const bootContainer = document.querySelector('.boot-messages');
    if (!bootContainer) return;

    messages.forEach((message, index) => {
      setTimeout(() => {
        const line = document.createElement('div');
        line.className = 'boot-sequence';
        line.innerHTML = `<span class="terminal-prompt">[  OK  ]</span> ${message}`;
        bootContainer.appendChild(line);
        
        if (index === messages.length - 1) {
          setTimeout(() => {
            bootContainer.style.display = 'none';
          }, 2000);
        }
      }, index * 200);
    });
  }

  // CRT flicker effect
  function addCRTFlicker() {
    const body = document.body;
    const flicker = () => {
      const opacity = 0.95 + Math.random() * 0.05;
      body.style.opacity = opacity;
      
      requestAnimationFrame(() => {
        body.style.opacity = 1;
      });
      
      setTimeout(flicker, 3000 + Math.random() * 7000);
    };
    
    // Start flicker with random delay
    setTimeout(flicker, Math.random() * 5000);
  }

  // Terminal command simulation
  function terminalCommand(element, command, output) {
    const terminal = element;
    const commandLine = document.createElement('div');
    commandLine.className = 'terminal-command-line';
    commandLine.innerHTML = `<span class="terminal-prompt">$</span> `;
    terminal.appendChild(commandLine);

    const commandText = document.createElement('span');
    commandLine.appendChild(commandText);

    // Type the command
    const commandEffect = new TerminalEffect(commandText, {
      speed: 75,
      cursor: false
    });
    commandText.textContent = command;
    commandEffect.text = command;
    commandEffect.typewriter();

    // Show output after command is typed
    setTimeout(() => {
      const outputLine = document.createElement('div');
      outputLine.className = 'terminal-output';
      outputLine.textContent = output;
      terminal.appendChild(outputLine);
    }, command.length * 75 + 500);
  }

  // Apply typewriter effect to elements
  function applyTypewriterEffects() {
    const typewriterElements = document.querySelectorAll('.typewriter');
    
    typewriterElements.forEach((element, index) => {
      const delay = element.getAttribute('data-delay') || index * 1000;
      const speed = element.getAttribute('data-speed') || 50;
      
      setTimeout(() => {
        const effect = new TerminalEffect(element, {
          speed: parseInt(speed),
          cursor: element.hasAttribute('data-cursor')
        });
        effect.typewriter();
      }, delay);
    });
  }

  // Glitch text effect
  function glitchText(element) {
    const originalText = element.textContent;
    const glitchChars = '!@#$%^&*()_+-={}[]|;:,.<>?/~`';
    
    let iterations = 0;
    const maxIterations = originalText.length;
    
    const glitch = setInterval(() => {
      element.textContent = originalText
        .split('')
        .map((char, index) => {
          if (index < iterations) {
            return originalText[index];
          }
          return glitchChars[Math.floor(Math.random() * glitchChars.length)];
        })
        .join('');
      
      iterations += 1;
      
      if (iterations > maxIterations) {
        clearInterval(glitch);
        element.textContent = originalText;
      }
    }, 30);
  }

  // Matrix rain effect (optional)
  function createMatrixRain() {
    const matrixContainer = document.querySelector('.matrix-rain');
    if (!matrixContainer) return;

    const columns = Math.floor(window.innerWidth / 10);
    const drops = [];

    for (let i = 0; i < columns; i++) {
      const drop = document.createElement('div');
      drop.className = 'matrix-drop';
      drop.style.left = i * 10 + 'px';
      drop.style.animationDuration = (5 + Math.random() * 10) + 's';
      drop.style.animationDelay = Math.random() * 5 + 's';
      drop.textContent = String.fromCharCode(0x30A0 + Math.random() * 96);
      matrixContainer.appendChild(drop);
      drops.push(drop);
    }

    // Change characters periodically
    setInterval(() => {
      drops.forEach(drop => {
        if (Math.random() > 0.95) {
          drop.textContent = String.fromCharCode(0x30A0 + Math.random() * 96);
        }
      });
    }, 100);
  }

  // Initialize terminal effects
  function initTerminalEffects() {
    // Apply typewriter effects
    applyTypewriterEffects();
    
    // Add CRT flicker
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      addCRTFlicker();
    }
    
    // Boot sequence for home page
    if (document.querySelector('.boot-messages')) {
      bootSequence();
    }
    
    // Apply glitch effects to headers on hover
    const glitchElements = document.querySelectorAll('.glitch-hover');
    glitchElements.forEach(element => {
      element.addEventListener('mouseenter', () => glitchText(element));
    });
    
    // Terminal command demo
    const demoTerminal = document.querySelector('.terminal-demo');
    if (demoTerminal) {
      setTimeout(() => {
        terminalCommand(demoTerminal, 'whoami', 'root@fsociety');
      }, 1000);
    }
    
    // Initialize matrix rain if enabled
    createMatrixRain();
  }

  // DOM Ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTerminalEffects);
  } else {
    initTerminalEffects();
  }

  // Export for use in other scripts
  window.TerminalEffect = TerminalEffect;
  window.glitchText = glitchText;
  window.terminalCommand = terminalCommand;

})();