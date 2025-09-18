// Pass i18n messages to JavaScript
window.contactFormMessages = window.contactFormMessages || {
  nameRequired: 'Name must be 2-100 characters',
  emailInvalid: 'Please enter a valid email address',
  messageInvalid: 'Message must be 10-2000 characters'
};

// Try immediate binding instead of waiting for DOMContentLoaded
function bindContactForm() {
  console.log('Contact form JavaScript loaded');
  const form = document.getElementById('contact-form');
  
  if (!form) {
    console.log('Contact form not found yet, retrying...');
    setTimeout(bindContactForm, 100);
    return;
  }
  
  console.log('Contact form found, binding events');
  const submitBtn = document.getElementById('submit-btn');
  const submitText = document.getElementById('submit-text');
  const loadingText = document.getElementById('loading-text');
  const successMessage = document.getElementById('success-message');
  const errorMessage = document.getElementById('error-message');
  const errorText = document.getElementById('error-text');

  // Field validation
  const validateField = (field, validator, errorMsg) => {
    const value = field.value.trim();
    const errorElement = document.getElementById(field.id + '-error');
    
    if (!validator(value)) {
      errorElement.textContent = errorMsg;
      errorElement.style.display = 'block';
      field.style.borderColor = 'var(--apple-red, #ff3b30)';
      return false;
    } else {
      errorElement.style.display = 'none';
      field.style.borderColor = '';
      return true;
    }
  };

  // Validators
  const isValidName = (value) => value.length >= 2 && value.length <= 100;
  const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  const isValidMessage = (value) => value.length >= 10 && value.length <= 2000;

  // Real-time validation
  document.getElementById('name').addEventListener('blur', function() {
    validateField(this, isValidName, window.contactFormMessages.nameRequired);
  });

  document.getElementById('email').addEventListener('blur', function() {
    validateField(this, isValidEmail, window.contactFormMessages.emailInvalid);
  });

  document.getElementById('message').addEventListener('blur', function() {
    validateField(this, isValidMessage, window.contactFormMessages.messageInvalid);
  });

  // Override form submission completely
  console.log('Adding submit event listener to form');
  
  // Override the form's submit method
  const originalSubmit = form.submit;
  form.submit = function() {
    console.log('Form.submit() called - intercepting');
    handleFormSubmission();
    return false;
  };
  
  form.addEventListener('submit', async function(e) {
    console.log('Form submit event intercepted - preventing default');
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    handleFormSubmission();
  }, true);
  
  async function handleFormSubmission() {

    // Clear previous messages
    successMessage.style.display = 'none';
    errorMessage.style.display = 'none';

    // Validate all fields
    const nameValid = validateField(document.getElementById('name'), isValidName, window.contactFormMessages.nameRequired);
    const emailValid = validateField(document.getElementById('email'), isValidEmail, window.contactFormMessages.emailInvalid);
    const messageValid = validateField(document.getElementById('message'), isValidMessage, window.contactFormMessages.messageInvalid);

    if (!nameValid || !emailValid || !messageValid) {
      return;
    }

    // Show loading state
    submitBtn.disabled = true;
    submitText.style.display = 'none';
    loadingText.style.display = 'inline';

    try {
      const formData = new FormData(form);
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData
      });

      const result = await response.json();

      if (response.ok && result.success) {
        // Success
        form.style.display = 'none';
        successMessage.style.display = 'block';
      } else {
        // Error
        throw new Error(result.error || 'Failed to send message');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      errorText.textContent = error.message || 'An unexpected error occurred. Please try again.';
      errorMessage.style.display = 'block';
    } finally {
      // Reset button state
      submitBtn.disabled = false;
      submitText.style.display = 'inline';
      loadingText.style.display = 'none';
    }
  }
}

// Try both immediate and DOMContentLoaded
bindContactForm();
document.addEventListener('DOMContentLoaded', bindContactForm);