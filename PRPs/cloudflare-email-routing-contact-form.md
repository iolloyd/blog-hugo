# PRP: Implement Cloudflare Email Routing for Contact Form

## Overview

Replace the current Resend API implementation with Cloudflare Email Routing for the contact form. This simplifies the email infrastructure by eliminating external dependencies and API keys while leveraging Cloudflare's native email capabilities for a more integrated solution.

## Current Implementation Analysis

### Existing Resend Implementation
**File**: `/Users/iolloyd/code/blog/src/index.js`

**Current Dependencies** (Line 1):
```javascript
import { Resend } from 'resend';
```

**Current Email Sending Logic** (Lines 202-210):
```javascript
const resend = new Resend(env.RESEND_API_KEY);

const { data, error } = await resend.emails.send({
  from: 'noreply@lloydmoore.com',
  to: 'lloyd@lloydmoore.com',
  subject: `New Contact Form Submission from ${sanitizedData.name}`,
  html: generateEmailTemplate(sanitizedData),
});
```

**Configuration**: Requires `RESEND_API_KEY` secret and external Resend account setup.

## Cloudflare Email Routing Implementation

### Prerequisites & Setup Requirements

**Cloudflare Dashboard Configuration**:
1. Enable Email Routing for `lloydmoore.com` domain
2. Verify destination email address (`lloyd@lloydmoore.com`)
3. Confirm DNS records (automatically managed by Cloudflare)

**Documentation Reference**: https://developers.cloudflare.com/email-routing/email-workers/enable-email-workers/

### Key Technical Changes Required

#### 1. Wrangler Configuration Update
**File**: `/Users/iolloyd/code/blog/wrangler.toml`

**Add Email Binding** (after line 12):
```toml
[[send_email]]
name = "SEND_EMAIL"
destination_address = "lloyd@lloydmoore.com"
```

**Alternative Unrestricted Binding**:
```toml
[[send_email]]
name = "SEND_EMAIL"
```

#### 2. Worker Code Transformation
**File**: `/Users/iolloyd/code/blog/src/index.js`

**Replace Import** (Line 1):
```javascript
// Remove: import { Resend } from 'resend';
// Add:
import { EmailMessage } from "cloudflare:email";
import { createMimeMessage } from "mimetext";
```

**Replace Email Sending Logic** (Lines 202-223):
```javascript
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
  console.error('Email sending error:', error);
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
```

#### 3. Package Dependencies Update
**File**: `/Users/iolloyd/code/blog/package.json`

**Remove Resend Dependency**:
```bash
npm uninstall resend
```

**Add MimeText Dependency**:
```bash
npm install mimetext
```

## Implementation Architecture

### Email Flow Comparison

**Current (Resend)**:
Contact Form → Cloudflare Worker → Resend API → Email Delivery

**New (Cloudflare Email Routing)**:
Contact Form → Cloudflare Worker → Cloudflare Email Routing → Email Delivery

### Security & Configuration Benefits

1. **No External API Keys**: Eliminates `RESEND_API_KEY` secret management
2. **Native Integration**: Fully integrated with Cloudflare infrastructure
3. **Simplified Setup**: No external account verification required
4. **Free Operation**: No usage limits or external service costs

## Email Template Compatibility

The existing `generateEmailTemplate()` function remains unchanged. The HTML email template will work identically with both implementations.

**Current Template Function** (Lines 88-129):
```javascript
const generateEmailTemplate = ({ name, email, message }) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', Helvetica, Arial, sans-serif; }
        /* ... existing styles ... */
      </style>
    </head>
    <body>
      <!-- ... existing template content ... -->
    </body>
    </html>
  `;
};
```

## Error Handling & Validation

### Error Handling Patterns

**Cloudflare Email Routing Errors**:
- Network connectivity issues
- Invalid sender/recipient addresses
- Email Routing service unavailability
- MIME message construction errors

**Error Response Strategy**:
```javascript
try {
  await env.SEND_EMAIL.send(message);
} catch (error) {
  console.error('Cloudflare Email Routing error:', error);
  // Same error response as current implementation
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
```

## Local Development & Testing

### Local Testing Approach
**Documentation**: https://developers.cloudflare.com/email-routing/email-workers/local-development/

**Wrangler Dev Behavior**:
- `wrangler dev` simulates email sending
- Writes emails to local `.eml` files in temp directory
- Provides file paths for inspection during development

**Local Testing Validation**:
```bash
# Start local development server
npx wrangler dev

# Submit contact form in browser (localhost:8080)
# Check console output for email file paths
# Inspect .eml files to verify email content
```

### Email Content Validation
**Local Email File Inspection**:
1. Submit test form during `wrangler dev`
2. Check console for output like: "Email written to: /tmp/email-xyz.eml"
3. Open `.eml` file to verify HTML content and formatting
4. Validate sender, recipient, and subject fields

## Implementation Tasks (Execution Order)

### Phase 1: Prerequisites Setup
1. **Enable Email Routing**
   - [ ] Access Cloudflare Dashboard → Email → Email Routing
   - [ ] Follow setup wizard for `lloydmoore.com`
   - [ ] Verify destination address: `lloyd@lloydmoore.com`
   - [ ] Confirm DNS records are properly configured

### Phase 2: Code Migration
2. **Update Dependencies**
   - [ ] Remove Resend: `npm uninstall resend`
   - [ ] Add MimeText: `npm install mimetext`
   - [ ] Update imports in worker code

3. **Configure Wrangler**
   - [ ] Add `send_email` binding to `/Users/iolloyd/code/blog/wrangler.toml`
   - [ ] Test configuration with `npx wrangler types`

4. **Transform Worker Code**
   - [ ] Replace Resend import with Cloudflare imports
   - [ ] Update email sending logic in `handleContactForm` function
   - [ ] Maintain existing error handling patterns
   - [ ] Preserve existing security features (rate limiting, validation, etc.)

### Phase 3: Testing & Validation
5. **Local Development Testing**
   - [ ] Test with `npx wrangler dev`
   - [ ] Submit forms and verify .eml file generation
   - [ ] Validate email content and formatting

6. **Production Deployment**
   - [ ] Deploy worker: `npx wrangler deploy`
   - [ ] Test contact form submission
   - [ ] Verify email delivery to `lloyd@lloydmoore.com`

### Phase 4: Cleanup
7. **Remove Legacy Configuration**
   - [ ] Remove `RESEND_API_KEY` secret: `npx wrangler secret delete RESEND_API_KEY`
   - [ ] Update documentation references

## External Dependencies & Documentation

### Essential Documentation Links
- **Email Workers Setup**: https://developers.cloudflare.com/email-routing/email-workers/enable-email-workers/
- **Send Email API**: https://developers.cloudflare.com/email-routing/email-workers/send-email-workers/
- **Runtime API Reference**: https://developers.cloudflare.com/email-routing/email-workers/runtime-api/
- **Local Development**: https://developers.cloudflare.com/email-routing/email-workers/local-development/
- **Wrangler Configuration**: https://developers.cloudflare.com/workers/wrangler/configuration/

### Required npm Dependencies
```json
{
  "dependencies": {
    "mimetext": "^2.0.0"
  }
}
```

**Remove**:
```json
{
  "dependencies": {
    "resend": "^6.0.3"
  }
}
```

## Security Considerations & Best Practices

### Security Advantages
1. **Reduced Attack Surface**: No external API keys to compromise
2. **Native Security**: Leverages Cloudflare's built-in security features
3. **Audit Trail**: Email routing activity logged in Cloudflare dashboard

### Maintained Security Features
- All existing rate limiting (5 submissions per hour per IP)
- Input validation and sanitization
- Honeypot spam prevention
- XSS protection
- Security headers on all responses

### Email Routing Specific Security
- Sender domain verification (must be `lloydmoore.com`)
- Recipient verification (must be verified in Email Routing)
- MIME message validation

## Validation Gates (Executable)

### Build & Syntax Validation
```bash
# Install new dependencies
npm install

# Remove old dependencies
npm uninstall resend

# Build site
npm run build

# Validate worker syntax
npx wrangler types
```

### Local Development Testing
```bash
# Start local development server
npx wrangler dev --port 8080

# Test contact form submission (in another terminal)
curl -X POST http://localhost:8080/contact \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "name=Test%20User&email=test%40example.com&message=This%20is%20a%20test%20message%20with%20enough%20characters"

# Check console output for email file path
# Verify .eml file exists and contains expected content
```

### Production Deployment Validation
```bash
# Deploy to Cloudflare
npx wrangler deploy

# Test production endpoint
curl -X POST https://lloydmoore.com/contact \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "name=Production%20Test&email=test%40example.com&message=Testing%20production%20email%20delivery%20functionality"

# Verify email delivery to lloyd@lloydmoore.com
```

### Functional Testing Checklist
- [ ] Contact form loads correctly
- [ ] Client-side validation works unchanged
- [ ] Server-side validation prevents invalid submissions
- [ ] Rate limiting continues to function
- [ ] Email notifications delivered to `lloyd@lloydmoore.com`
- [ ] Success/error states display correctly
- [ ] Mobile responsiveness maintained
- [ ] Email content matches expected template format

## Migration Strategy & Risk Mitigation

### Rollback Plan
1. **Keep Resend Implementation**: Maintain current code as backup
2. **Feature Flag Approach**: Use environment variable to switch between implementations
3. **Quick Revert**: If issues arise, redeploy previous Resend implementation

### Potential Issues & Solutions
1. **Email Routing Setup Issues**: Follow Cloudflare dashboard setup wizard carefully
2. **MIME Message Formatting**: Use mimetext library examples for proper formatting
3. **Local Development Confusion**: Remember that .eml files are expected during dev
4. **Domain Verification**: Ensure `lloydmoore.com` is properly configured in Cloudflare

### Implementation Validation
- Test thoroughly in local development before production deployment
- Verify email delivery end-to-end before removing Resend dependencies
- Monitor Cloudflare dashboard for email routing activity and errors

## Success Metrics

### Technical Metrics
- Form submission success rate maintained > 98%
- Email delivery rate > 99% (same as current)
- Response time improvement (no external API calls)
- Zero configuration management overhead

### Operational Benefits
- Eliminated external dependency (Resend)
- Simplified secret management (no API keys)
- Integrated monitoring via Cloudflare dashboard
- Reduced infrastructure complexity

## Confidence Score: 8/10

This PRP provides comprehensive context for one-pass implementation success with:
- ✅ Complete current implementation analysis with exact file references
- ✅ Detailed Cloudflare Email Routing documentation and examples
- ✅ Step-by-step migration strategy with executable validation gates
- ✅ Specific code transformation requirements
- ✅ Local testing approach with expected behaviors
- ✅ Risk mitigation and rollback strategies

**Minor considerations**: Requires Cloudflare Email Routing dashboard setup as prerequisite, which is straightforward but must be completed before code deployment.

The implementation replaces external email service dependency with native Cloudflare functionality while maintaining all existing security features and user experience.