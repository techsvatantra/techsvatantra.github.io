
import { sendCareRequestEmails } from './_utils/send-email';

export default async function handler(req) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ message: 'Method Not Allowed' }), { 
      status: 405,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const data = await req.json();
    
    if (!data.name || (!data.phone && !data.email)) {
      return new Response(JSON.stringify({ message: 'Required fields are missing.' }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    await sendCareRequestEmails(data);

    return new Response(JSON.stringify({ message: 'Emails sent successfully!' }), { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error in handler:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return new Response(JSON.stringify({ message: 'Failed to send care request', error: errorMessage }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
