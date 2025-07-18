# Google reCAPTCHA Integration Guide

## Setup Instructions

### 1. Get Google reCAPTCHA Keys

1. Go to [Google reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin)
2. Click "+" to create a new site
3. Choose **reCAPTCHA v2** → "I'm not a robot" Checkbox
4. Add your domain(s):
   - `localhost` (for development)
   - Your production domain (e.g., `yourdomain.com`)
5. Copy the **Site Key** and **Secret Key**

### 2. Configure Environment Variables

Update your `.env` file:
```bash
VITE_RECAPTCHA_SITE_KEY=your_actual_site_key_here
```

### 3. Update Google Apps Script (Contact Form)

Your Google Apps Script needs to verify the reCAPTCHA token on the server side. Update your `doPost` function:

```javascript
function doPost(e) {
  try {
    const data = e.parameter;
    
    // Verify reCAPTCHA token if present
    if (data.recaptchaToken) {
      const isValidRecaptcha = verifyRecaptcha(data.recaptchaToken);
      if (!isValidRecaptcha) {
        return ContentService.createTextOutput(
          JSON.stringify({
            success: false,
            message: "reCAPTCHA verification failed. Please try again."
          })
        )
        .setMimeType(ContentService.MimeType.JSON)
        .setHeaders({
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        });
      }
    }

    // Your existing email sending logic here...
    const emailResult = sendContactEmail(data);

    return ContentService.createTextOutput(
      JSON.stringify({
        success: true,
        message: "Thank you for your message! We'll get back to you soon."
      })
    )
    .setMimeType(ContentService.MimeType.JSON)
    .setHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    });
    
  } catch (err) {
    Logger.log("Error in doPost: " + err.toString());
    return ContentService.createTextOutput(
      JSON.stringify({ 
        success: false, 
        message: "An error occurred. Please try again." 
      })
    )
    .setMimeType(ContentService.MimeType.JSON)
    .setHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    });
  }
}

function verifyRecaptcha(token) {
  const secretKey = 'YOUR_RECAPTCHA_SECRET_KEY'; // Add your secret key here
  const verifyUrl = 'https://www.google.com/recaptcha/api/siteverify';
  
  const payload = {
    'secret': secretKey,
    'response': token
  };
  
  const options = {
    'method': 'POST',
    'payload': payload
  };
  
  try {
    const response = UrlFetchApp.fetch(verifyUrl, options);
    const responseData = JSON.parse(response.getContentText());
    
    Logger.log('reCAPTCHA verification response: ' + JSON.stringify(responseData));
    
    return responseData.success === true;
  } catch (error) {
    Logger.log('reCAPTCHA verification error: ' + error.toString());
    return false;
  }
}
```

### 4. Add Secret Key to Google Apps Script

1. In your Google Apps Script project, go to **Settings** (gear icon)
2. In the **Script Properties** section, click **Add script property**
3. Add:
   - **Property**: `RECAPTCHA_SECRET_KEY`
   - **Value**: Your reCAPTCHA secret key

Then update the `verifyRecaptcha` function to use the script property:

```javascript
function verifyRecaptcha(token) {
  const secretKey = PropertiesService.getScriptProperties().getProperty('RECAPTCHA_SECRET_KEY');
  // ... rest of the function
}
```

## Features Implemented

### Frontend (React)
- ✅ reCAPTCHA v2 widget integration
- ✅ Token validation before form submission
- ✅ Auto-reset on form success/error
- ✅ Visual feedback for verification status
- ✅ Environment-based configuration
- ✅ Graceful fallback if reCAPTCHA not configured

### Backend (Google Apps Script)
- ✅ Server-side token verification
- ✅ Secure secret key storage
- ✅ Proper error handling
- ✅ CORS headers configuration

## Security Notes

1. **Never expose your secret key** in frontend code
2. **Always verify tokens server-side** - client-side verification can be bypassed
3. **Use HTTPS** for production domains
4. **Set proper domain restrictions** in reCAPTCHA admin console

## Testing

### Development
- Use the test keys provided by Google for localhost testing
- Site key: `6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI`
- Secret key: `6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe`

### Production
- Replace with your actual keys before deploying
- Test with real domain and HTTPS

## Troubleshooting

### Common Issues

1. **reCAPTCHA not loading**
   - Check if VITE_RECAPTCHA_SITE_KEY is set correctly
   - Verify domain is added to reCAPTCHA admin console

2. **Verification failing**
   - Check secret key in Google Apps Script
   - Verify CORS headers are set correctly
   - Check network logs for API errors

3. **Form submission blocked**
   - Ensure reCAPTCHA is completed before submission
   - Check browser console for JavaScript errors
