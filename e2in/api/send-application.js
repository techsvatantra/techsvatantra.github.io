import { sendApplicationEmails } from './_utils/send-email';

export default async function handler(req) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ message: 'Method Not Allowed' }), { 
      status: 405,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const formData = await req.formData();
    const data = Object.fromEntries(formData.entries());
    
    const applicantEmail = data.email; 
    if (!applicantEmail) {
      return new Response(JSON.stringify({ message: 'Applicant email is missing.' }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    await sendApplicationEmails(data);

    return new Response(JSON.stringify({ message: 'Emails sent successfully!' }), { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error in handler:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return new Response(JSON.stringify({ message: 'Failed to send application', error: errorMessage }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}