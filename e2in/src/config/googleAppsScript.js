/**
 * Google Apps Script URLs Configuration
 * 
 * This file contains all Google Apps Script URLs used across the application.
 * Centralized for easy maintenance and updates.
 */

export const GOOGLE_APPS_SCRIPT_URLS = {
  /**
   * Contact Form Submission
   * Project: e2iHealth_ContactUs
   * Project URL: https://script.google.com/home/projects/1WoOOrF3xMYZbHAOUvbEdX4VzW3eITvNwtvPmqA4cJ4-TYtGwYlxOF3YD/edit
   * Purpose: Handles contact form submissions from the Contact component
   * Used in: src/components/Contact.jsx
   * Features: Supports reCAPTCHA v2 verification (recaptchaToken field)
   */
  CONTACT_FORM: 'https://script.google.com/macros/s/AKfycbwOYlwNun_aYtHmzMCvSuvrN3EELelomGDaUVhfKiDGKIpH2ps6Jx9yokKqkve9hxHa/exec',

  /**
   * Services Request Form
   * Project: e2iHealth_Services
   * Project URL: https://script.google.com/home/projects/15A9FHwijmzqOwHBq1R8HYIf98psCMbmFqDDo8YG-dKt-EfbHAQ3aV_UV/edit
   * Purpose: Handles service request submissions from the All Services page
   * Used in: src/pages/AllServicesPage.jsx
   */
  SERVICES_REQUEST: 'https://script.google.com/macros/s/AKfycbzjIxxwYCxIGg-5XmCjVt4HcdJGzfIJjc9ttetkOPsBwvDZ4wU4R2p6hRDKs4qK_LEOSw/exec',

  /**
   * Careers/Job Application Form
   * Project: e2iHealth_Careers
   * Project URL: https://script.google.com/home/projects/1_UVXGLJWPtwnqB9dXgp_1i0ypAH_HXonmCoGZm9uD6p9JfrwsF55r15J/edit
   * Purpose: Handles job application submissions from the Careers component
   * Used in: src/components/Careers.jsx
   * Note: Supports file uploads (resume) via base64 encoding
   */
  CAREERS_APPLICATION: 'https://script.google.com/macros/s/AKfycbxM7dCyEC5pKbAnv0RqwHizQTlUnTB6kIqXJFXv6Fq-geyEFFyWgl7ebUiwgAn61CXupg/exec',
};

/**
 * Project URLs for easy reference and management
 * These are the Google Apps Script project management URLs
 */
export const GOOGLE_APPS_SCRIPT_PROJECTS = {
  CONTACT_FORM: 'https://script.google.com/home/projects/1WoOOrF3xMYZbHAOUvbEdX4VzW3eITvNwtvPmqA4cJ4-TYtGwYlxOF3YD/edit',
  SERVICES_REQUEST: 'https://script.google.com/home/projects/15A9FHwijmzqOwHBq1R8HYIf98psCMbmFqDDo8YG-dKt-EfbHAQ3aV_UV/edit',
  CAREERS_APPLICATION: 'https://script.google.com/home/projects/1_UVXGLJWPtwnqB9dXgp_1i0ypAH_HXonmCoGZm9uD6p9JfrwsF55r15J/edit',
};

/**
 * Default configuration for Google Apps Script requests
 */
export const GOOGLE_APPS_SCRIPT_CONFIG = {
  /**
   * Standard headers for form-encoded data
   * Most Google Apps Scripts expect this content type
   */
  HEADERS: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  
  /**
   * Request method - all our scripts use POST
   */
  METHOD: 'POST',
  
  /**
   * Standard fields added to all form submissions
   */
  getStandardFields: () => ({
    timestamp: new Date().toISOString(),
  }),
};

/**
 * Helper function to create URLSearchParams with standard fields
 * @param {Object} data - Form data to submit
 * @param {string} source - Source identifier (e.g., 'Contact Form', 'Careers Form')
 * @returns {URLSearchParams} - Ready to submit form data
 */
export const createFormData = (data, source) => {
  const formData = new URLSearchParams();
  
  // Add all data fields
  Object.keys(data).forEach(key => {
    formData.append(key, data[key]);
  });
  
  // Add standard fields
  const standardFields = GOOGLE_APPS_SCRIPT_CONFIG.getStandardFields();
  Object.keys(standardFields).forEach(key => {
    formData.append(key, standardFields[key]);
  });
  
  // Add source identifier
  if (source) {
    formData.append('source', source);
  }
  
  return formData;
};

/**
 * Helper function to make requests to Google Apps Script
 * @param {string} url - The Google Apps Script URL
 * @param {URLSearchParams|string} body - The form data to submit
 * @returns {Promise<Response>} - The fetch response
 */
export const submitToGoogleScript = async (url, body) => {
  return fetch(url, {
    method: GOOGLE_APPS_SCRIPT_CONFIG.METHOD,
    headers: GOOGLE_APPS_SCRIPT_CONFIG.HEADERS,
    body: body.toString(),
  });
};
