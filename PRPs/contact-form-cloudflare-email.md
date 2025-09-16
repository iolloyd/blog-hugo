# PRP: Contact Form with Cloudflare Email Service

## Overview

Implement a production-ready contact form with email functionality leveraging the existing Hugo-based blog infrastructure and Cloudflare Workers deployment. This contact form will be secure, performant, and maintainable while following existing design patterns.

## Current Codebase Context

### Existing Infrastructure
- **Static Site Generator**: Hugo with Ananke theme
- **Cloudflare Workers**: Already configured (`/Users/iolloyd/code/blog/src/index.js`, `wrangler.toml`)
- **Styling System**: Apple-inspired design with Tachyons CSS + custom variables (`/Users/iolloyd/code/blog/assets/css/style.css`)
- **Existing Form Component**: `/Users/iolloyd/code/blog/themes/ananke/layouts/shortcodes/form-contact.html`
- **Internationalization**: `/Users/iolloyd/code/blog/themes/ananke/i18n/en.toml`

### Current Form Component Analysis
The existing contact form shortcode includes:
- HTML5 form with name, email, message fields
- Built-in validation (`required` attributes) 
- i18n support for multilingual sites
- Tachyons CSS styling classes
- Configurable `action` parameter for form submission endpoint

```html
<form class="black-80 sans-serif" accept-charset="UTF-8" action="{{ .Get "action" }}" method="POST" role="form">
    <label class="f6 b db mb1 mt3 sans-serif mid-gray" for="name">{{ lang.Translate "yourName" }}</label>
    <input type="text" id="name" name="name" class="w-100 f5 pv3 ph3 bg-light-gray bn" required />
    <!-- Additional fields... -->
</form>
```

## Email Service Recommendations & Documentation

### Primary Recommendation: Resend API
**Documentation**: https://developers.cloudflare.com/workers/tutorials/send-emails-with-resend/

**Advantages**:
- Modern, developer-friendly API
- Officially recommended by Cloudflare (2025)
- Excellent deliverability and analytics
- Straightforward integration with Workers

**Setup Requirements**:
1. Create Resend account
2. Verify domain ownership in Resend dashboard
3. Add DNS records to Cloudflare DNS
4. Generate API key and store as Worker secret

**Implementation Code**:
```javascript
import { Resend } from "resend";

const resend = new Resend(env.RESEND_API_KEY);
const { data, error } = await resend.emails.send({
  from: "noreply@lloydmoore.com",
  to: "lloyd@lloydmoore.com",
  subject: "New Contact Form Submission",
  html: emailTemplate
});
```

### Alternative: Cloudflare Email Routing
**Documentation**: https://developers.cloudflare.com/email-routing/email-workers/send-email-workers/

**Requirements**:
- Enable Email Routing in Cloudflare dashboard
- Verify destination email addresses
- Configure email bindings in `wrangler.toml`

**Configuration**:
```toml
[vars]
[[env.production.send_email]]
name = "SEB"
destination_address = "lloyd@lloydmoore.com"
```

### MailChannels Status (Not Recommended)
**Important**: MailChannels ended their free service for Cloudflare Workers as of August 31, 2024. Now requires paid account setup.

## Security Implementation Requirements

### Multi-Layer Security Approach
Based on 2025 best practices from community research:

1. **Rate Limiting** (IP-based)
   - 5 submissions per 60-minute window per IP
   - Store submission timestamps in Worker memory/KV
   
2. **Input Validation & Sanitization**
   - Server-side validation of all fields
   - Email format validation
   - Message length limits (min: 10 chars, max: 2000 chars)
   - XSS prevention through proper escaping

3. **Spam Prevention**
   - Honeypot field (hidden from users, flagged if filled)
   - CAPTCHA integration (hCaptcha recommended for privacy)
   - Content pattern analysis for common spam indicators

4. **Security Headers**
   ```javascript
   const securityHeaders = {
     'X-XSS-Protection': '1; mode=block',
     'X-Content-Type-Options': 'nosniff',
     'Referrer-Policy': 'strict-origin-when-cross-origin',
     'Permissions-Policy': 'geolocation=(), microphone=(), camera=()'
   };
   ```

## Implementation Architecture

### Frontend Enhancement
Extend existing form component with:
- Client-side validation for immediate feedback
- Loading states during submission
- Success/error message display
- Progressive enhancement (works without JavaScript)

### Cloudflare Worker Extension
Extend `/Users/iolloyd/code/blog/src/index.js` to handle `POST /contact` requests:

```javascript
// Pseudocode structure for worker
if (request.method === 'POST' && url.pathname === '/contact') {
  // 1. Rate limiting check
  // 2. Honeypot validation
  // 3. Input sanitization and validation
  // 4. Email composition and sending
  // 5. Success/error response
}
```

### Database Requirements
**Not Required**: Using Worker memory/KV for rate limiting only. No persistent storage needed for form submissions (email notification is sufficient).

## Design System Integration

### Form Styling (Apple-Inspired)
Leverage existing CSS custom properties:
- `--apple-blue` for primary actions
- `--apple-gray-light` for input backgrounds
- `--font-system` for consistent typography
- `--space-*` variables for consistent spacing

### Component Integration
- Use existing Tachyons classes where possible
- Extend with custom Apple design system variables
- Maintain mobile-first responsive approach
- Follow existing button styling patterns (`.apple-btn-primary`)

## Error Handling & User Experience

### Success States
- Clear confirmation message
- Optional redirect to thank-you page
- Email confirmation to sender (optional)

### Error States
- Network/server errors
- Validation errors (field-specific feedback)
- Rate limiting notifications
- Spam detection (silent failure)

### Progressive Enhancement
- Form works without JavaScript
- Enhanced UX with JavaScript (ajax submission, inline validation)
- Graceful fallback for all features

## Implementation Tasks (Execution Order)

1. **Setup Email Service**
   - [ ] Create Resend account
   - [ ] Verify domain ownership
   - [ ] Generate API key and add as Worker secret
   - [ ] Test email sending capability

2. **Extend Cloudflare Worker**
   - [ ] Add form submission handler to `/Users/iolloyd/code/blog/src/index.js`
   - [ ] Implement rate limiting with IP tracking
   - [ ] Add input validation and sanitization
   - [ ] Integrate email sending functionality
   - [ ] Add comprehensive error handling

3. **Enhance Form Component**
   - [ ] Add client-side validation JavaScript
   - [ ] Implement loading states and user feedback
   - [ ] Add honeypot field
   - [ ] Style success/error messages with Apple design system

4. **Security Hardening**
   - [ ] Implement CAPTCHA integration (hCaptcha)
   - [ ] Add security headers
   - [ ] Test spam prevention mechanisms
   - [ ] Verify rate limiting functionality

5. **Testing & Validation**
   - [ ] Test all form scenarios (success, errors, validation)
   - [ ] Verify email delivery and formatting
   - [ ] Test rate limiting behavior
   - [ ] Validate responsive design across devices

6. **Documentation & Deployment**
   - [ ] Update CLAUDE.md with contact form usage
   - [ ] Add environment variable documentation
   - [ ] Deploy to production and verify functionality

## File References for Implementation

### Key Files to Modify/Extend
- **Worker Handler**: `/Users/iolloyd/code/blog/src/index.js:1-50`
- **Form Component**: `/Users/iolloyd/code/blog/themes/ananke/layouts/shortcodes/form-contact.html:1-21`
- **Styling**: `/Users/iolloyd/code/blog/assets/css/style.css:256-303` (button styles)
- **Configuration**: `/Users/iolloyd/code/blog/wrangler.toml`

### Internationalization Files
- **English Labels**: `/Users/iolloyd/code/blog/themes/ananke/i18n/en.toml` (add new success/error messages)

## Security Considerations & Best Practices

### Rate Limiting Implementation
```javascript
// Reference pattern from research
const IP_RATE_LIMIT = 5;
const TIME_FRAME = 60 * 60 * 1000; // 60 minutes

const checkRateLimit = (ip, timestamps) => {
  const now = Date.now();
  const recent = timestamps.filter(time => now - time < TIME_FRAME);
  return recent.length < IP_RATE_LIMIT;
};
```

### Input Validation Pattern
```javascript
const validateInput = ({ name, email, message, honeypot }) => {
  const errors = {};
  
  if (honeypot) return { spam: true };
  if (!name || name.length < 2 || name.length > 100) errors.name = "Invalid name";
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Invalid email";
  if (!message || message.length < 10 || message.length > 2000) errors.message = "Invalid message";
  
  return errors;
};
```

## External Dependencies & Documentation

### Essential Documentation Links
- **Resend API**: https://developers.cloudflare.com/workers/tutorials/send-emails-with-resend/
- **Cloudflare Email Routing**: https://developers.cloudflare.com/email-routing/email-workers/send-email-workers/
- **Workers Security Best Practices**: https://community.cloudflare.com/t/security-considerations-for-a-contact-form/415120
- **hCaptcha Integration**: https://docs.hcaptcha.com/

### npm Dependencies to Add
```json
{
  "dependencies": {
    "resend": "^3.0.0"
  }
}
```

## Validation Gates (Executable)

### Build & Syntax Validation
```bash
# Install dependencies
npm install

# Build check
npm run build

# Worker validation
npx wrangler validate
```

### Deployment Validation
```bash
# Deploy to preview environment
npx wrangler deploy --env staging

# Test form endpoint
curl -X POST https://blog-staging.lloydmoore.workers.dev/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","message":"Test message"}'

# Deploy to production
npx wrangler deploy
```

### Functional Testing Checklist
- [ ] Form loads correctly on blog pages
- [ ] Client-side validation works
- [ ] Server-side validation prevents invalid submissions
- [ ] Rate limiting blocks excessive requests
- [ ] Email notifications are delivered
- [ ] Success/error states display correctly
- [ ] Mobile responsiveness maintained
- [ ] CAPTCHA functions properly (if implemented)

## Success Metrics

### Technical Metrics
- Form submission success rate > 98%
- Email delivery rate > 99%
- Response time < 500ms (95th percentile)
- Zero security vulnerabilities

### User Experience Metrics
- Clear error messages for validation failures
- Successful email delivery within 30 seconds
- Mobile-friendly form interaction
- Accessible to screen readers and keyboard navigation

## Risk Mitigation

### Potential Issues & Solutions
1. **Email Deliverability**: Use verified domain, proper DNS setup
2. **Spam Attacks**: Multi-layer protection (rate limiting, CAPTCHA, honeypot)
3. **Service Downtime**: Graceful error handling, user feedback
4. **Performance**: Edge deployment, minimal JavaScript

### Rollback Plan
- Keep existing contact information in About page
- Form failures redirect to mailto: link
- Progressive enhancement ensures graceful degradation

## Confidence Score: 9/10

This PRP provides comprehensive context for one-pass implementation success with:
- ✅ Complete codebase context with specific file references
- ✅ Multiple email service options with documentation links
- ✅ Detailed security implementation based on 2025 best practices
- ✅ Clear implementation tasks in execution order
- ✅ Executable validation gates
- ✅ Integration with existing design system
- ✅ Risk mitigation strategies

The implementation follows established patterns in the codebase while incorporating modern security practices and maintaining the existing Apple-inspired design aesthetic.