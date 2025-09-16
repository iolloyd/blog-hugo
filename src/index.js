import { EmailMessage } from "cloudflare:email";
import { createMimeMessage } from "mimetext";

// Rate limiting configuration
const RATE_LIMIT = 5;
const TIME_FRAME = 60 * 60 * 1000; // 60 minutes

// In-memory storage for rate limiting (per-Worker instance)
const rateLimitStore = new Map();

// Security headers for all responses
const getSecurityHeaders = () => ({
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'geolocation=(), microphone=(), camera=()',
});

// Rate limiting check
const checkRateLimit = (ip) => {
  const now = Date.now();
  const submissions = rateLimitStore.get(ip) || [];
  
  // Filter out old submissions
  const recentSubmissions = submissions.filter(time => now - time < TIME_FRAME);
  
  if (recentSubmissions.length >= RATE_LIMIT) {
    return false;
  }
  
  // Add current submission and update store
  recentSubmissions.push(now);
  rateLimitStore.set(ip, recentSubmissions);
  
  return true;
};

// Input validation and sanitization
const validateInput = ({ name, email, message, honeypot }) => {
  const errors = {};
  
  // Check honeypot (if filled, it's spam)
  if (honeypot && honeypot.trim() !== '') {
    return { spam: true };
  }
  
  // Name validation
  if (!name || typeof name !== 'string') {
    errors.name = 'Name is required';
  } else if (name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters';
  } else if (name.trim().length > 100) {
    errors.name = 'Name must be less than 100 characters';
  }
  
  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || typeof email !== 'string') {
    errors.email = 'Email is required';
  } else if (!emailRegex.test(email.trim())) {
    errors.email = 'Please enter a valid email address';
  }
  
  // Message validation
  if (!message || typeof message !== 'string') {
    errors.message = 'Message is required';
  } else if (message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters';
  } else if (message.trim().length > 2000) {
    errors.message = 'Message must be less than 2000 characters';
  }
  
  return errors;
};

// Sanitize input to prevent XSS
const sanitizeInput = (input) => {
  if (typeof input !== 'string') return '';
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .trim();
};

// Generate email HTML template
const generateEmailTemplate = ({ name, email, message }) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', Helvetica, Arial, sans-serif; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #f5f5f7; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
        .content { background: white; padding: 20px; border: 1px solid #d2d2d7; border-radius: 8px; }
        .field { margin-bottom: 15px; }
        .label { font-weight: 600; color: #1d1d1f; }
        .value { margin-top: 5px; color: #424245; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>New Contact Form Submission</h2>
          <p>Received from lloydmoore.com</p>
        </div>
        <div class="content">
          <div class="field">
            <div class="label">Name:</div>
            <div class="value">${name}</div>
          </div>
          <div class="field">
            <div class="label">Email:</div>
            <div class="value">${email}</div>
          </div>
          <div class="field">
            <div class="label">Message:</div>
            <div class="value">${message}</div>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
};

// Handle contact form submission
const handleContactForm = async (request, env) => {
  try {
    // Get client IP for rate limiting
    const clientIP = request.headers.get('CF-Connecting-IP') || 
                    request.headers.get('X-Forwarded-For') || 
                    'unknown';
    
    // Check rate limit
    if (!checkRateLimit(clientIP)) {
      return new Response(JSON.stringify({ 
        error: 'Too many submissions. Please try again later.' 
      }), {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          ...getSecurityHeaders()
        }
      });
    }
    
    // Parse form data
    const contentType = request.headers.get('Content-Type');
    let formData;
    
    if (contentType && contentType.includes('application/json')) {
      formData = await request.json();
    } else {
      const formDataObj = await request.formData();
      formData = {};
      for (const [key, value] of formDataObj.entries()) {
        formData[key] = value;
      }
    }
    
    // Validate input
    const validation = validateInput(formData);
    
    // Check for spam
    if (validation.spam) {
      // Silent failure for spam
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          ...getSecurityHeaders()
        }
      });
    }
    
    // Check for validation errors
    if (Object.keys(validation).length > 0) {
      return new Response(JSON.stringify({ 
        error: 'Validation failed',
        errors: validation 
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          ...getSecurityHeaders()
        }
      });
    }
    
    // Sanitize inputs
    const sanitizedData = {
      name: sanitizeInput(formData.name),
      email: sanitizeInput(formData.email),
      message: sanitizeInput(formData.message)
    };
    
    // Send email using Cloudflare Email Routing
    // Create MIME message
    const msg = createMimeMessage();
    msg.setSender({ name: "Contact Form", addr: "noreply@lloydmoore.com" });
    msg.setRecipient("lloyd@lloydmoore.com");
    msg.setSubject(`New Contact Form Submission from ${sanitizedData.name}`);
    msg.addMessage({
      contentType: "text/html",
      data: generateEmailTemplate(sanitizedData),
    });

    // Create EmailMessage
    const message = new EmailMessage(
      "noreply@lloydmoore.com",
      "lloyd@lloydmoore.com",
      msg.asRaw()
    );

    try {
      await env.SEND_EMAIL.send(message);
    } catch (error) {
      console.error('Cloudflare Email Routing error:', error);
      return new Response(JSON.stringify({ 
        error: 'Failed to send message. Please try again later.' 
      }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          ...getSecurityHeaders()
        }
      });
    }
    
    // Success response
    return new Response(JSON.stringify({ 
      success: true,
      message: 'Thank you for your message! I\'ll get back to you soon.' 
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        ...getSecurityHeaders()
      }
    });
    
  } catch (error) {
    console.error('Contact form error:', error);
    return new Response(JSON.stringify({ 
      error: 'An unexpected error occurred. Please try again later.' 
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        ...getSecurityHeaders()
      }
    });
  }
};

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // Handle contact form submission
    if (request.method === 'POST' && url.pathname === '/contact') {
      return handleContactForm(request, env);
    }
    
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
      const securityHeaders = getSecurityHeaders();
      Object.entries(securityHeaders).forEach(([key, value]) => {
        response.headers.set(key, value);
      });
      
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
          ...getSecurityHeaders()
        }
      });
    }

    // Final fallback
    return new Response('Page not found', { 
      status: 404,
      headers: getSecurityHeaders()
    });
  }
};