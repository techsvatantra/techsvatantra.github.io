import { Resend } from 'resend';
import { render } from '@react-email/components';
import ApplicantConfirmationEmail from '../emails/ApplicantConfirmationEmail';
import NewApplicationEmail from '../emails/NewApplicationEmail';

const resend = new Resend('re_CjRAAhH2_3tYKqP5kTNPsnap94A98a9j9');
const ADMIN_EMAIL = 'anup@e2ihomecare.com';
const FROM_EMAIL = 'anup@e2ihomecare.com';

export async function sendApplicationEmails(data) {
  try {
    const applicantName = data.fullName || 'New Applicant';
    const applicantEmail = data.email;

    const attachments = [];
    if (data.resume && data.resume.size > 0) {
      const resumeFile = data.resume;
      // Vercel Edge functions do not support Buffer.
      const fileContent = await resumeFile.arrayBuffer(); 
      attachments.push({
        filename: resumeFile.name,
        content: new Uint8Array(fileContent),
      });
    }

    // Render email templates to HTML strings
    const newApplicationHtml = render(NewApplicationEmail({ data }));
    const applicantConfirmationHtml = render(ApplicantConfirmationEmail({ applicantName }));

    // Send email to admin
    await resend.emails.send({
      from: `e2i Careers <${FROM_EMAIL}>`,
      to: ADMIN_EMAIL,
      subject: `New Job Application: ${data.positionApplyingFor}`,
      html: newApplicationHtml,
      attachments,
    });

    // Send confirmation email to applicant
    await resend.emails.send({
      from: `e2i Home Care <${FROM_EMAIL}>`,
      to: applicantEmail,
      subject: 'We\'ve Received Your Application!',
      html: applicantConfirmationHtml,
    });
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send one or more emails.');
  }
}