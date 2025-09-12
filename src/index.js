export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // Handle service worker registration
    if (url.pathname === '/sw.js') {
      const swContent = await env.ASSETS.fetch(new Request(`${url.origin}/js/service-worker.js`));
      if (swContent.ok) {
        const response = new Response(await swContent.text(), {
          headers: {
            'Content-Type': 'application/javascript',
            'Service-Worker-Allowed': '/',
            'Cache-Control': 'public, max-age=0'
          }
        });
        return response;
      }
    }

    // Try to serve the asset from the static assets
    const assetResponse = await env.ASSETS.fetch(request);
    
    // If asset exists, return it with appropriate headers
    if (assetResponse.status < 400) {
      const response = new Response(assetResponse.body, assetResponse);
      
      // Add security headers
      response.headers.set('X-Frame-Options', 'DENY');
      response.headers.set('X-Content-Type-Options', 'nosniff');
      response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
      response.headers.set('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
      
      // Set cache headers for static assets
      if (url.pathname.match(/\.(css|js|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/)) {
        response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
      } else if (url.pathname.match(/\.(html|xml)$/)) {
        response.headers.set('Cache-Control', 'public, max-age=3600');
      }
      
      return response;
    }

    // For 404s, try to serve the custom 404 page
    const notFoundResponse = await env.ASSETS.fetch(new Request(`${url.origin}/404.html`));
    if (notFoundResponse.ok) {
      return new Response(await notFoundResponse.text(), {
        status: 404,
        headers: {
          'Content-Type': 'text/html',
          'X-Frame-Options': 'DENY',
          'X-Content-Type-Options': 'nosniff',
          'Referrer-Policy': 'strict-origin-when-cross-origin',
        }
      });
    }

    // Final fallback
    return new Response('Page not found', { status: 404 });
  }
};