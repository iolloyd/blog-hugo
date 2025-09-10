// Enhanced Progressive Image Loading
// Modern lazy loading with performance optimizations, WebP support, and responsive images
// Implements native lazy loading with enhanced fallback for older browsers

class LazyLoader {
  constructor() {
    this.images = document.querySelectorAll('img[loading="lazy"], img.lazy-image, img[data-src]');
    this.imageContainers = document.querySelectorAll('.lazy-image-container');
    this.supportsNativeLazyLoading = 'loading' in HTMLImageElement.prototype;
    this.supportsWebP = this.checkWebPSupport();
    this.supportsAVIF = this.checkAVIFSupport();
    this.connectionSpeed = this.getConnectionSpeed();
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.observerOptions = {
      root: null,
      rootMargin: '50px 0px 50px 0px', // Load images 50px before they enter viewport
      threshold: 0.01
    };
    
    this.init();
  }
  
  init() {
    // Add enhanced styles
    this.addStyles();
    
    // Initialize based on browser support
    if (this.supportsNativeLazyLoading) {
      this.enhanceNativeLazyLoading();
    } else {
      this.initIntersectionObserver();
    }
    
    // Handle images that are already visible
    this.loadVisibleImages();
    
    // Add performance optimizations
    this.optimizeForConnection();
    this.handleViewportChanges();
    
    // Preload critical images
    this.preloadCriticalImages();
    
    console.log('LazyLoader initialized:', {
      nativeSupport: this.supportsNativeLazyLoading,
      webpSupport: this.supportsWebP,
      avifSupport: this.supportsAVIF,
      connectionSpeed: this.connectionSpeed
    });
  }
  
  addStyles() {
    const style = document.createElement('style');
    style.textContent = `
      /* Lazy loading styles */
      .lazy-image-container {
        position: relative;
        overflow: hidden;
        background-color: var(--apple-gray-lighter);
      }
      
      .lazy-image {
        display: block;
        width: 100%;
        height: auto;
        transition: opacity 0.3s ease-in-out, filter 0.3s ease-in-out;
      }
      
      /* Blur effect while loading */
      .lazy-image:not(.loaded) {
        filter: blur(5px);
        opacity: 0.8;
      }
      
      .lazy-image.loaded {
        filter: blur(0);
        opacity: 1;
      }
      
      /* Loading placeholder */
      .lazy-image-container::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(
          90deg,
          var(--apple-gray-lighter) 0%,
          var(--apple-gray-light) 50%,
          var(--apple-gray-lighter) 100%
        );
        background-size: 200% 100%;
        animation: loading-shimmer 1.5s ease-in-out infinite;
        z-index: 1;
        opacity: 0;
        transition: opacity 0.3s;
      }
      
      .lazy-image-container.loading::before {
        opacity: 1;
      }
      
      .lazy-image-container.loaded::before {
        opacity: 0;
        animation: none;
      }
      
      @keyframes loading-shimmer {
        0% {
          background-position: 200% 0;
        }
        100% {
          background-position: -200% 0;
        }
      }
      
      /* Aspect ratio preservation */
      .lazy-image-container[data-aspect-ratio] {
        position: relative;
        width: 100%;
        padding-bottom: var(--aspect-ratio);
      }
      
      .lazy-image-container[data-aspect-ratio] .lazy-image {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      
      /* Error state */
      .lazy-image.error {
        opacity: 0.5;
        filter: grayscale(100%);
      }
    `;
    document.head.appendChild(style);
  }
  
  enhanceNativeLazyLoading() {
    // Add loaded class when images finish loading
    this.images.forEach(img => {
      if (img.complete) {
        this.markAsLoaded(img);
      } else {
        img.addEventListener('load', () => this.markAsLoaded(img));
        img.addEventListener('error', () => this.handleError(img));
      }
      
      // Set aspect ratio if dimensions are provided
      this.setAspectRatio(img);
    });
  }
  
  initIntersectionObserver() {
    const options = {
      root: null,
      rootMargin: '50px 0px', // Start loading 50px before entering viewport
      threshold: 0.01
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.loadImage(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, options);
    
    // Observe all lazy images
    this.images.forEach(img => {
      if (!img.src || img.src === img.dataset.src) {
        observer.observe(img);
      }
      this.setAspectRatio(img);
    });
  }
  
  loadImage(img) {
    const container = img.closest('.lazy-image-container');
    if (container) {
      container.classList.add('loading');
    }
    
    // Create a new image to preload
    const tempImg = new Image();
    
    tempImg.onload = () => {
      // Set the actual source
      if (img.dataset.src) {
        img.src = img.dataset.src;
      }
      if (img.dataset.srcset) {
        img.srcset = img.dataset.srcset;
      }
      
      this.markAsLoaded(img);
    };
    
    tempImg.onerror = () => {
      this.handleError(img);
    };
    
    // Start loading
    tempImg.src = img.dataset.src || img.src;
    if (img.dataset.srcset) {
      tempImg.srcset = img.dataset.srcset;
    }
  }
  
  markAsLoaded(img) {
    img.classList.add('loaded');
    const container = img.closest('.lazy-image-container');
    if (container) {
      container.classList.remove('loading');
      container.classList.add('loaded');
    }
    
    // Remove data attributes to prevent reprocessing
    delete img.dataset.src;
    delete img.dataset.srcset;
  }
  
  handleError(img) {
    img.classList.add('error');
    const container = img.closest('.lazy-image-container');
    if (container) {
      container.classList.remove('loading');
      container.classList.add('error');
    }
    
    // Log error for debugging
    console.error('Failed to load image:', img.src || img.dataset.src);
  }
  
  setAspectRatio(img) {
    if (img.width && img.height) {
      const aspectRatio = (img.height / img.width) * 100;
      const container = img.closest('.lazy-image-container');
      if (container) {
        container.style.setProperty('--aspect-ratio', `${aspectRatio}%`);
        container.setAttribute('data-aspect-ratio', 'true');
      }
    }
  }
  
  loadVisibleImages() {
    // Load images that are already in viewport on page load
    this.images.forEach(img => {
      const rect = img.getBoundingClientRect();
      const inViewport = rect.top < window.innerHeight && rect.bottom > 0;
      
      if (inViewport && !img.classList.contains('loaded')) {
        if (this.supportsNativeLazyLoading) {
          // Native lazy loading will handle it
          return;
        }
        this.loadImage(img);
      }
    });
  }
  
  // Modern format detection
  checkWebPSupport() {
    if (typeof document.createElement === 'undefined') return false;
    const canvas = document.createElement('canvas');
    return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  }
  
  async checkAVIFSupport() {
    if (!window.createImageBitmap) return false;
    
    const avifData = 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgABogQEAwgMg8f8D///8WfhwB8+ErK42A=';
    
    try {
      const response = await fetch(avifData);
      const blob = await response.blob();
      await createImageBitmap(blob);
      return true;
    } catch {
      return false;
    }
  }
  
  getConnectionSpeed() {
    if ('connection' in navigator) {
      const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
      if (connection) {
        return connection.effectiveType || 'unknown';
      }
    }
    return 'unknown';
  }
  
  optimizeForConnection() {
    if (this.connectionSpeed === 'slow-2g' || this.connectionSpeed === '2g') {
      this.observerOptions.rootMargin = '20px 0px 20px 0px';
      this.enableDataSaver();
    } else if (this.connectionSpeed === '4g') {
      this.observerOptions.rootMargin = '100px 0px 100px 0px';
      this.preloadNextImages();
    }
  }
  
  enableDataSaver() {
    this.images.forEach(img => {
      if (img.dataset.lowQuality) {
        img.dataset.src = img.dataset.lowQuality;
      }
    });
  }
  
  preloadNextImages() {
    const currentScroll = window.scrollY;
    const viewportHeight = window.innerHeight;
    
    this.images.forEach(img => {
      const rect = img.getBoundingClientRect();
      const imageTop = rect.top + currentScroll;
      
      if (imageTop < currentScroll + (viewportHeight * 2) && imageTop > currentScroll) {
        if (!img.classList.contains('loaded') && img.dataset.src) {
          const preloadImg = new Image();
          preloadImg.src = img.dataset.src;
        }
      }
    });
  }
  
  handleViewportChanges() {
    let resizeTimeout;
    
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        this.images.forEach(img => this.setAspectRatio(img));
        this.loadVisibleImages();
      }, 250);
    }, { passive: true });
    
    window.addEventListener('orientationchange', () => {
      setTimeout(() => {
        this.loadVisibleImages();
      }, 500);
    }, { passive: true });
  }
  
  preloadCriticalImages() {
    const criticalImages = document.querySelectorAll('img[data-critical="true"], .hero img, .above-fold img');
    
    criticalImages.forEach(img => {
      if (img.dataset.src && !img.classList.contains('loaded')) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = img.dataset.src;
        
        if (img.dataset.srcset) {
          link.imagesrcset = img.dataset.srcset;
          link.imagesizes = img.sizes || '100vw';
        }
        
        document.head.appendChild(link);
        this.loadImage(img);
      }
    });
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new LazyLoader();
  });
} else {
  new LazyLoader();
}

// Re-initialize when new content is added dynamically
window.LazyLoader = LazyLoader;