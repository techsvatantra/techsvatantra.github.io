/**
 * Tech Svatantra - Form Handler
 * Handles form submissions to Google Apps Script
 */

(function() {
  'use strict';

  /**
   * Initialize form handling when DOM is ready
   */
  function initFormHandler() {
    const form = document.forms['submit-to-google-sheet'];
    
    if (!form) {
      return; // No form on this page
    }

    // Get the script URL from data attribute
    const scriptURL = form.getAttribute('data-script-url');
    
    if (!scriptURL) {
      console.error('Form is missing data-script-url attribute');
      return;
    }

    form.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const successMessage = document.getElementById('success-message');
      const errorMessage = document.getElementById('error-message');
      const sendingMessage = document.getElementById('sending-message');
      const submitButton = form.querySelector('[type="submit"]');
      
      // Show loading state
      if (sendingMessage) sendingMessage.style.display = 'block';
      if (successMessage) successMessage.style.display = 'none';
      if (errorMessage) errorMessage.style.display = 'none';
      if (submitButton) submitButton.disabled = true;

      try {
        const response = await fetch(scriptURL, {
          method: 'POST',
          body: new FormData(form),
        });

        if (sendingMessage) sendingMessage.style.display = 'none';

        if (response.ok) {
          console.log('Form submitted successfully!');
          if (successMessage) successMessage.style.display = 'block';
          if (errorMessage) errorMessage.style.display = 'none';
          form.reset(); // Clear the form
        } else {
          console.error('Error submitting form:', response.statusText);
          if (successMessage) successMessage.style.display = 'none';
          if (errorMessage) errorMessage.style.display = 'block';
        }
      } catch (error) {
        console.error('Network error:', error);
        if (sendingMessage) sendingMessage.style.display = 'none';
        if (successMessage) successMessage.style.display = 'none';
        if (errorMessage) errorMessage.style.display = 'block';
      } finally {
        if (submitButton) submitButton.disabled = false;
      }
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFormHandler);
  } else {
    initFormHandler();
  }
})();
