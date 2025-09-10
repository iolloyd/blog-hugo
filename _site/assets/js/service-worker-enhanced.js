// Enhanced Service Worker for Progressive Web App
// Modern caching strategies, performance optimizations, and offline support
// Implements Stale-While-Revalidate, Cache-First, and Network-First patterns

const CACHE_VERSION = '2.0';
const CACHE_NAME = `lloyd-blog-v${CACHE_VERSION}`;
const RUNTIME_CACHE = `lloyd-blog-runtime-v${CACHE_VERSION}`;
const IMAGE_CACHE = `lloyd-blog-images-v${CACHE_VERSION}`;
const FONT_CACHE = `lloyd-blog-fonts-v${CACHE_VERSION}`;

// Cache expiration times (in milliseconds)
const CACHE_EXPIRY = {
  STATIC: 7 * 24 * 60 * 60 * 1000, // 7 days
  RUNTIME: 24 * 60 * 60 * 1000,    // 1 day
  IMAGES: 30 * 24 * 60 * 60 * 1000, // 30 days
  FONTS: 365 * 24 * 60 * 60 * 1000  // 1 year
};

// Essential files to cache on install
const STATIC_CACHE_URLS = [
  '/',
  '/offline.html',
  '/assets/css/style.css',
  '/assets/css/mobile.css',
  '/assets/css/typography.css',
  '/assets/js/animations.js',
  '/assets/js/mobile-nav.js',
  '/assets/js/lazy-load.js',
  '/assets/js/web-share.js',
  '/assets/fonts/inter-var.woff2',
  '/manifest.json'
];

// Routes that should always fetch from network first
const NETWORK_FIRST_ROUTES = [
  /\/api\//,
  /\.json$/
];

// Routes that should use cache first
const CACHE_FIRST_ROUTES = [
  /\.(?:png|jpg|jpeg|svg|gif|webp|avif)$/,
  /\.(?:woff|woff2|ttf|otf)$/,
  /\.(?:css|js)$/
];

// Install event - cache essential assets with better error handling
self.addEventListener('install', event => {
  console.log('Service Worker: Installing version', CACHE_VERSION);
  
  event.waitUntil(
    (async () => {
      try {
        const cache = await caches.open(CACHE_NAME);
        console.log('Service Worker: Caching essential files');
        
        // Cache files individually to handle failures gracefully
        const cachePromises = STATIC_CACHE_URLS.map(async (url) => {
          try {
            const response = await fetch(url);
            if (response.ok) {
              await cache.put(url, response);
              console.log('Cached:', url);
            } else {
              console.warn('Failed to cache (non-200):', url, response.status);
            }
          } catch (error) {
            console.warn('Failed to cache:', url, error);
          }
        });
        
        await Promise.allSettled(cachePromises);
        console.log('Service Worker: Installation complete');
        
        // Force activation
        await self.skipWaiting();
      } catch (error) {
        console.error('Service Worker: Installation failed', error);
        throw error;
      }
    })()
  );
});

// Activate event - clean up old caches and claim clients
self.addEventListener('activate', event => {
  console.log('Service Worker: Activating version', CACHE_VERSION);
  
  event.waitUntil(
    (async () => {
      try {
        const cacheNames = await caches.keys();
        const currentCaches = [CACHE_NAME, RUNTIME_CACHE, IMAGE_CACHE, FONT_CACHE];
        
        // Delete old caches
        const deletePromises = cacheNames.map(cacheName => {
          if (!currentCaches.includes(cacheName)) {
            console.log('Service Worker: Removing old cache', cacheName);
            return caches.delete(cacheName);
          }
        });
        
        await Promise.all(deletePromises);
        
        // Clean up expired entries
        await cleanExpiredCaches();
        
        // Claim all clients
        await self.clients.claim();
        
        console.log('Service Worker: Activation complete');
      } catch (error) {
        console.error('Service Worker: Activation failed', error);
      }
    })()
  );
});

// Enhanced fetch event with multiple caching strategies
self.addEventListener('fetch', event => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }
  
  // Skip chrome-extension and other non-http requests
  if (!event.request.url.startsWith('http')) {
    return;
  }
  
  const { request } = event;
  const url = new URL(request.url);
  
  // Choose strategy based on request type
  if (isImageRequest(url)) {
    event.respondWith(handleImageRequest(request));
  } else if (isFontRequest(url)) {
    event.respondWith(handleFontRequest(request));
  } else if (isStaticAsset(url)) {
    event.respondWith(handleStaticAssetRequest(request));
  } else if (isNetworkFirst(url)) {
    event.respondWith(handleNetworkFirstRequest(request));
  } else {
    event.respondWith(handleStaleWhileRevalidate(request));
  }
});

// Helper functions for request identification
function isImageRequest(url) {
  return CACHE_FIRST_ROUTES[0].test(url.pathname);
}

function isFontRequest(url) {
  return CACHE_FIRST_ROUTES[1].test(url.pathname);
}

function isStaticAsset(url) {
  return CACHE_FIRST_ROUTES[2].test(url.pathname);
}

function isNetworkFirst(url) {
  return NETWORK_FIRST_ROUTES.some(pattern => pattern.test(url.pathname));
}

// Cache-first strategy for images
async function handleImageRequest(request) {
  try {
    const cache = await caches.open(IMAGE_CACHE);
    const cached = await cache.match(request);
    
    if (cached && !isExpired(cached, CACHE_EXPIRY.IMAGES)) {
      return cached;
    }
    
    const response = await fetch(request);
    
    if (response.ok) {
      // Clone response for caching
      const responseClone = response.clone();
      await cache.put(request, responseClone);
      
      // Add cache timestamp
      const headers = new Headers(response.headers);
      headers.set('sw-cache-timestamp', Date.now().toString());
      
      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: headers
      });
    }
    
    return response;
  } catch (error) {
    console.error('Image request failed:', error);
    // Return cached version if available, even if expired
    const cache = await caches.open(IMAGE_CACHE);
    const cached = await cache.match(request);
    return cached || createErrorResponse('Image unavailable');
  }
}

// Cache-first strategy for fonts
async function handleFontRequest(request) {
  try {
    const cache = await caches.open(FONT_CACHE);
    const cached = await cache.match(request);
    
    if (cached) {
      return cached;
    }
    
    const response = await fetch(request);
    
    if (response.ok) {
      await cache.put(request, response.clone());
    }
    
    return response;
  } catch (error) {
    console.error('Font request failed:', error);
    const cache = await caches.open(FONT_CACHE);
    return await cache.match(request) || createErrorResponse('Font unavailable');
  }
}

// Cache-first strategy for static assets
async function handleStaticAssetRequest(request) {
  try {
    const cache = await caches.open(CACHE_NAME);
    const cached = await cache.match(request);
    
    if (cached && !isExpired(cached, CACHE_EXPIRY.STATIC)) {
      return cached;
    }
    
    const response = await fetch(request);
    
    if (response.ok) {
      await cache.put(request, response.clone());
    }
    
    return response;
  } catch (error) {
    const cache = await caches.open(CACHE_NAME);
    return await cache.match(request) || createErrorResponse('Asset unavailable');
  }
}

// Network-first strategy for API calls
async function handleNetworkFirstRequest(request) {
  try {
    const response = await fetch(request, {
      headers: {
        'Cache-Control': 'no-cache'
      }
    });
    
    if (response.ok) {
      const cache = await caches.open(RUNTIME_CACHE);
      await cache.put(request, response.clone());
    }
    
    return response;
  } catch (error) {
    console.error('Network-first request failed:', error);
    const cache = await caches.open(RUNTIME_CACHE);
    const cached = await cache.match(request);
    return cached || createErrorResponse('Service unavailable');
  }
}

// Stale-while-revalidate strategy for HTML pages
async function handleStaleWhileRevalidate(request) {
  const cache = await caches.open(RUNTIME_CACHE);
  const cached = await cache.match(request);
  
  // Background fetch to update cache
  const fetchPromise = fetch(request).then(response => {
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  }).catch(error => {
    console.error('Background fetch failed:', error);
    return null;
  });
  
  // Return cached version immediately if available
  if (cached && !isExpired(cached, CACHE_EXPIRY.RUNTIME)) {
    return cached;
  }
  
  // Otherwise wait for network
  try {
    const response = await fetchPromise;
    return response || cached || createOfflineResponse();
  } catch (error) {
    return cached || createOfflineResponse();
  }
}

// Utility functions
function isExpired(response, maxAge) {
  const timestamp = response.headers.get('sw-cache-timestamp');
  if (!timestamp) return false;
  
  return Date.now() - parseInt(timestamp) > maxAge;
}

function createErrorResponse(message) {
  return new Response(`<html><body><h1>Offline</h1><p>${message}</p></body></html>`, {
    status: 503,
    statusText: 'Service Unavailable',
    headers: {
      'Content-Type': 'text/html'
    }
  });
}

function createOfflineResponse() {
  return caches.match('/offline.html') || createErrorResponse('You are offline');
}

// Clean expired cache entries
async function cleanExpiredCaches() {
  const cacheNames = [RUNTIME_CACHE, IMAGE_CACHE];
  
  for (const cacheName of cacheNames) {
    try {
      const cache = await caches.open(cacheName);
      const requests = await cache.keys();
      
      for (const request of requests) {
        const response = await cache.match(request);
        const maxAge = cacheName === IMAGE_CACHE ? CACHE_EXPIRY.IMAGES : CACHE_EXPIRY.RUNTIME;
        
        if (response && isExpired(response, maxAge)) {
          await cache.delete(request);
          console.log('Cleaned expired cache entry:', request.url);
        }
      }
    } catch (error) {
      console.error('Error cleaning cache:', cacheName, error);
    }
  }
}

// Handle background sync for offline actions
self.addEventListener('sync', event => {
  if (event.tag === 'background-sync') {
    event.waitUntil(handleBackgroundSync());
  }
});

async function handleBackgroundSync() {
  console.log('Service Worker: Background sync triggered');
  // Implement background sync logic here
  // For example: sync offline form submissions, analytics, etc.
}

// Handle push notifications (if needed)
self.addEventListener('push', event => {
  if (event.data) {
    const options = {
      body: event.data.text(),
      icon: '/assets/icons/icon-192x192.png',
      badge: '/assets/icons/badge-72x72.png',
      vibrate: [100, 50, 100],
      tag: 'blog-notification',
      actions: [
        { action: 'view', title: 'View' },
        { action: 'dismiss', title: 'Dismiss' }
      ]
    };
    
    event.waitUntil(
      self.registration.showNotification('Lloyd\'s Blog', options)
    );
  }
});

// Handle notification clicks
self.addEventListener('notificationclick', event => {
  event.notification.close();
  
  if (event.action === 'view') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});