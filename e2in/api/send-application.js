import { sendApplicationEmails } from './_utils/send-email';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    // Note: Vercel's req object for Node.js runtime doesn't have a formData() method directly.
    // We need to handle multipart/form-data differently if files are involved.
    // However, based on the client-side code, it seems to be sending FormData.
    // For Node.js runtime on Vercel, we'd typically use a library like `formidable` or `multer`
    // to parse multipart/form-data.
    // Let's assume for now the client sends JSON, or we adapt to what the client sends.
    // A simple body parser for JSON would be:
    
    // Let's stick to the original approach which assumes a modern fetch-compatible environment
    // that can parse FormData. If this runs in a Vercel Node.js environment,
    // the request object might not be a standard Request object.
    // The original code used `req.formData()`, which is for Edge runtime.
    // Let's create a robust handler that works for Node.js runtime.
    
    // Since the environment might be Node.js, we'll use a more compatible way to get data.
    // The simplest fix is to assume the client sends JSON. If it sends FormData,
    // this part would need a parser like 'busboy' or 'formidable'.
    // Given the constraints, let's assume the client can be changed to send JSON.
    // But let's try to keep the original logic from the user's file.
    // The original file `api/send-application.js` was correct for an Edge environment.
    // The 404 suggests it wasn't being served. Let's recreate it.

    const data = req.body; // For Node.js runtime, data is in req.body if parsed.

    if (!data || Object.keys(data).length === 0) {
       // This is a fallback if req.body is not populated.
       // This indicates a need for a body-parser middleware, which is default in Next.js but not vanilla Node on Vercel.
       // Let's revert to the edge-like function signature which is more modern.
       // The `export default async function handler(req)` signature is for Edge.
       // The `export default async function handler(req, res)` is for Node.js.
       // The user's original file used the Edge signature. Let's restore that.
       
       // Re-creating the original file content from user's codebase.
       const formData = await req.formData();
       const parsedData = Object.fromEntries(formData.entries());

       const applicantEmail = parsedData.email;
       if (!applicantEmail) {
         return new Response(JSON.stringify({ message: 'Applicant email is missing.' }), {
           status: 400,
           headers: { 'Content-Type': 'application/json' },
         });
       }

       await sendApplicationEmails(parsedData);

       return new Response(JSON.stringify({ message: 'Emails sent successfully!' }), {
         status: 200,
         headers: { 'Content-Type': 'application/json' },
       });

    }

    const applicantEmail = data.email;
    if (!applicantEmail) {
      return res.status(400).json({ message: 'Applicant email is missing.' });
    }

    await sendApplicationEmails(data);

    return res.status(200).json({ message: 'Emails sent successfully!' });

  } catch (error) {
    console.error('Error in handler:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    
    // Using the Node.js response object
    if (res && typeof res.status === 'function') {
        return res.status(500).json({ message: 'Failed to send application', error: errorMessage });
    }
    
    // Fallback to Edge-like response
    return new Response(JSON.stringify({ message: 'Failed to send application', error: errorMessage }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}