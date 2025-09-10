// Web Share API Integration
// Provides native mobile sharing functionality with graceful fallbacks
// Supports modern sharing patterns and analytics tracking

class WebShare {
  constructor() {
    this.supported = 'share' in navigator && 'canShare' in navigator;
    this.fallbackShares = new Map();
    this.analytics = window.gtag || window.dataLayer || null;
    
    this.init();
  }
  
  init() {
    console.log('Web Share API support:', this.supported);
    
    // Initialize share buttons
    this.initShareButtons();
    
    // Add share functionality to articles
    this.initArticleSharing();
    
    // Dynamic share button creation
    this.createDynamicShareButtons();
  }
  
  initShareButtons() {
    const shareButtons = document.querySelectorAll('[data-share]');
    
    shareButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        this.handleShare(button);
      });
      
      // Update button appearance based on support
      if (this.supported) {
        button.classList.add('native-share-supported');
        button.setAttribute('aria-label', 'Share using native sharing');
      } else {
        button.classList.add('fallback-share');
        button.setAttribute('aria-label', 'Copy link to share');
      }
    });
  }
  
  initArticleSharing() {
    // Auto-create share buttons for blog posts
    const articles = document.querySelectorAll('article, .post-content, .apple-article');
    
    articles.forEach(article => {
      if (!article.querySelector('.share-button')) {
        this.createArticleShareButton(article);
      }
    });
  }
  
  createArticleShareButton(article) {
    const shareContainer = document.createElement('div');
    shareContainer.className = 'article-share-container';
    shareContainer.innerHTML = `
      <button class="article-share-button touch-target" 
              data-share
              data-analytics="article_share"
              aria-label="Share this article">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span class="share-text">Share</span>
      </button>
    `;
    
    // Insert at the end of the article
    article.appendChild(shareContainer);
  }
  
  createDynamicShareButtons() {
    // Create floating share button for mobile
    if (window.innerWidth <= 768) {
      this.createFloatingShareButton();
    }
    
    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        const existingFloating = document.querySelector('.floating-share-button');
        if (window.innerWidth <= 768 && !existingFloating) {
          this.createFloatingShareButton();
        } else if (window.innerWidth > 768 && existingFloating) {
          existingFloating.remove();
        }
      }, 250);
    });
  }
  
  createFloatingShareButton() {
    // Don't create if already exists
    if (document.querySelector('.floating-share-button')) return;
    
    const floatingButton = document.createElement('button');
    floatingButton.className = 'floating-share-button touch-target';
    floatingButton.setAttribute('data-share', '');
    floatingButton.setAttribute('data-analytics', 'floating_share');
    floatingButton.setAttribute('aria-label', 'Share current page');
    
    floatingButton.innerHTML = `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `;
    
    // Add styles
    this.addFloatingButtonStyles();
    
    document.body.appendChild(floatingButton);
    
    // Initialize the new button
    floatingButton.addEventListener('click', (e) => {
      e.preventDefault();
      this.handleShare(floatingButton);
    });
    
    // Show/hide based on scroll
    this.initScrollVisibility(floatingButton);
  }
  
  addFloatingButtonStyles() {
    if (document.querySelector('#floating-share-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'floating-share-styles';
    style.textContent = `
      .floating-share-button {
        position: fixed;
        bottom: calc(20px + env(safe-area-inset-bottom, 0px));
        right: calc(20px + env(safe-area-inset-right, 0px));
        width: 56px;
        height: 56px;
        border-radius: 50%;
        background: var(--apple-blue);
        color: white;
        border: none;
        box-shadow: 0 4px 12px rgba(0, 113, 227, 0.3);
        cursor: pointer;
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all var(--transition-fast);
        transform: translateY(100px);
        opacity: 0;
        -webkit-tap-highlight-color: transparent;
      }
      
      .floating-share-button.visible {
        transform: translateY(0);
        opacity: 1;
      }
      
      .floating-share-button:hover {
        background: var(--apple-blue-hover);
        transform: translateY(0) scale(1.05);
      }
      
      .floating-share-button:active {
        transform: translateY(0) scale(0.95);
      }
      
      .article-share-container {
        margin: var(--fluid-space-lg) 0;
        text-align: center;
        border-top: 1px solid var(--apple-gray-light);
        padding-top: var(--fluid-space-md);
      }
      
      .article-share-button {
        background: var(--apple-gray-lighter);
        border: 1px solid var(--apple-gray-light);
        border-radius: 8px;
        padding: var(--fluid-space-sm) var(--fluid-space-md);
        font-size: var(--ui-font-size);
        color: var(--apple-black);
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        transition: all var(--transition-fast);
        -webkit-tap-highlight-color: transparent;
      }
      
      .article-share-button:hover {
        background: var(--apple-gray-light);
        border-color: var(--apple-gray);
      }
      
      .article-share-button:active {
        transform: scale(0.98);
      }
      
      .native-share-supported {
        background: linear-gradient(135deg, var(--apple-blue) 0%, var(--apple-blue-hover) 100%);
        color: white;
        border-color: var(--apple-blue);
      }
      
      .native-share-supported:hover {
        background: var(--apple-blue-hover);
        border-color: var(--apple-blue-hover);
      }
      
      @media (prefers-reduced-motion: reduce) {
        .floating-share-button,
        .article-share-button {
          transition: none !important;
        }
      }
    `;
    
    document.head.appendChild(style);
  }
  
  initScrollVisibility(button) {
    let scrollTimeout;
    let isVisible = false;
    
    const showButton = () => {
      if (!isVisible && window.scrollY > 300) {
        button.classList.add('visible');
        isVisible = true;
      }
    };
    
    const hideButton = () => {
      if (isVisible && window.scrollY <= 200) {
        button.classList.remove('visible');
        isVisible = false;
      }
    };
    
    window.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        if (window.scrollY > 300) {
          showButton();
        } else {
          hideButton();
        }
      }, 100);
    }, { passive: true });
    
    // Initial check
    if (window.scrollY > 300) {
      showButton();
    }
  }
  
  async handleShare(button) {
    const shareData = this.getShareData(button);
    const analyticsEvent = button.dataset.analytics || 'share_clicked';
    
    // Track analytics
    this.trackShare(analyticsEvent, shareData);
    
    if (this.supported && this.canShare(shareData)) {
      try {
        await this.nativeShare(shareData);
        this.trackShare(analyticsEvent + '_success', shareData);
      } catch (error) {
        console.log('Native share cancelled or failed:', error);
        if (error.name !== 'AbortError') {
          this.fallbackShare(shareData, button);
        }
      }
    } else {
      this.fallbackShare(shareData, button);
    }
  }
  
  getShareData(button) {
    // Get share data from button attributes or page defaults
    const url = button.dataset.url || window.location.href;
    const title = button.dataset.title || 
                  document.querySelector('h1')?.textContent || 
                  document.title;
    const text = button.dataset.text || 
                 document.querySelector('meta[name="description"]')?.content ||
                 `Check out "${title}"`;
    
    return { url, title, text };
  }
  
  canShare(shareData) {
    if (!navigator.canShare) return true; // Assume supported if canShare not available
    
    try {
      return navigator.canShare(shareData);
    } catch (error) {
      console.warn('Error checking share support:', error);
      return true;
    }
  }
  
  async nativeShare(shareData) {
    try {
      await navigator.share(shareData);
      return true;
    } catch (error) {
      throw error;
    }
  }
  
  async fallbackShare(shareData, button) {
    // Try to copy to clipboard first
    try {
      await navigator.clipboard.writeText(shareData.url);
      this.showShareFeedback(button, 'Link copied to clipboard!', 'success');
      this.trackShare('clipboard_copy_success', shareData);
    } catch (error) {
      // Fallback to text selection
      this.selectTextFallback(shareData.url);
      this.showShareFeedback(button, 'Select and copy the link', 'info');
      this.trackShare('select_text_fallback', shareData);
    }
  }
  
  selectTextFallback(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    setTimeout(() => {
      document.body.removeChild(textArea);
    }, 100);
  }
  
  showShareFeedback(button, message, type = 'success') {
    // Create feedback element
    const feedback = document.createElement('div');
    feedback.className = `share-feedback share-feedback-${type}`;
    feedback.textContent = message;
    feedback.setAttribute('role', 'status');
    feedback.setAttribute('aria-live', 'polite');
    
    // Position near button
    const rect = button.getBoundingClientRect();
    feedback.style.cssText = `
      position: fixed;
      top: ${rect.top - 40}px;
      left: 50%;
      transform: translateX(-50%);
      background: ${type === 'success' ? '#00c896' : '#007aff'};
      color: white;
      padding: 8px 16px;
      border-radius: 6px;
      font-size: 14px;
      z-index: 10001;
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.2s ease;
    `;
    
    document.body.appendChild(feedback);
    
    // Animate in
    requestAnimationFrame(() => {
      feedback.style.opacity = '1';
    });
    
    // Remove after delay
    setTimeout(() => {
      feedback.style.opacity = '0';
      setTimeout(() => {
        if (document.body.contains(feedback)) {
          document.body.removeChild(feedback);
        }
      }, 200);
    }, 2000);
  }
  
  trackShare(event, shareData) {
    // Track with Google Analytics if available
    if (this.analytics && typeof gtag === 'function') {
      gtag('event', 'share', {
        method: event,
        content_type: 'article',
        item_id: shareData.url
      });
    }
    
    // Track with dataLayer if available
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'share_interaction',
        share_method: event,
        share_url: shareData.url,
        share_title: shareData.title
      });
    }
    
    console.log('Share tracked:', event, shareData);
  }
}

// Initialize Web Share
function initWebShare() {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      new WebShare();
    });
  } else {
    new WebShare();
  }
}

// Auto-initialize
initWebShare();

// Export for manual initialization
window.WebShare = WebShare;