/* Font Loading Strategy
   Progressive enhancement approach for optional web fonts
   Uses Font Loading API with fallback
   Never blocks critical rendering path
*/

(function() {
  'use strict';
  
  // Only load custom fonts if user hasn't opted for system fonts
  const prefersSystemFonts = localStorage.getItem('prefersSystemFonts') === 'true';
  if (prefersSystemFonts) {
    return;
  }
  
  // Check if browser supports variable fonts
  const supportsVariableFonts = CSS.supports('font-variation-settings', 'normal');
  
  if (!supportsVariableFonts) {
    // Browser doesn't support variable fonts, stick with system fonts
    return;
  }
  
  // Font loading configuration
  const fontConfig = {
    family: 'Inter var',
    weight: '100 900',
    style: 'normal',
    src: '/assets/fonts/inter-var.woff2',
    format: 'woff2-variations',
    unicodeRange: 'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD'
  };
  
  // Create @font-face rule dynamically
  function createFontFace() {
    const fontFaceRule = `
      @font-face {
        font-family: '${fontConfig.family}';
        font-style: ${fontConfig.style};
        font-weight: ${fontConfig.weight};
        font-display: swap;
        src: url('${fontConfig.src}') format('${fontConfig.format}');
        unicode-range: ${fontConfig.unicodeRange};
      }
    `;
    
    const style = document.createElement('style');
    style.textContent = fontFaceRule;
    document.head.appendChild(style);
  }
  
  // Load font using Font Loading API
  function loadFont() {
    if ('fonts' in document) {
      // Modern browsers with Font Loading API
      createFontFace();
      
      // Load the font
      document.fonts.load(`1em "${fontConfig.family}"`).then(function(fonts) {
        if (fonts.length > 0) {
          // Font loaded successfully
          document.documentElement.classList.add('fonts-loaded');
          document.documentElement.style.setProperty('--font-loaded', '1');
          
          // Store successful load in session
          sessionStorage.setItem('fontsLoaded', 'true');
          
          // Emit custom event for other scripts
          window.dispatchEvent(new CustomEvent('fontsloaded', {
            detail: { font: fontConfig.family }
          }));
        }
      }).catch(function(error) {
        // Font loading failed, fallback to system fonts
        console.warn('Font loading failed:', error);
      });
    } else {
      // Fallback for older browsers - use FontFaceObserver if critical
      // For now, just use system fonts
      console.info('Font Loading API not supported, using system fonts');
    }
  }
  
  // Check if fonts were already loaded in this session
  if (sessionStorage.getItem('fontsLoaded') === 'true') {
    // Fonts were already loaded, apply immediately
    createFontFace();
    document.documentElement.classList.add('fonts-loaded');
    document.documentElement.style.setProperty('--font-loaded', '1');
  } else {
    // Load fonts after critical content
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', loadFont);
    } else {
      // DOM already loaded
      requestAnimationFrame(loadFont);
    }
  }
  
  // Provide method to toggle between system and custom fonts
  window.toggleSystemFonts = function(useSystem) {
    if (useSystem) {
      localStorage.setItem('prefersSystemFonts', 'true');
      document.documentElement.classList.remove('fonts-loaded');
      document.documentElement.style.setProperty('--font-loaded', '0');
    } else {
      localStorage.removeItem('prefersSystemFonts');
      loadFont();
    }
  };
  
  // Monitor connection speed and adapt
  if ('connection' in navigator) {
    const connection = navigator.connection;
    
    function handleConnectionChange() {
      // Skip custom fonts on slow connections
      if (connection.saveData || connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
        console.info('Slow connection detected, using system fonts');
        window.toggleSystemFonts(true);
      }
    }
    
    connection.addEventListener('change', handleConnectionChange);
    handleConnectionChange(); // Check initial state
  }
})();