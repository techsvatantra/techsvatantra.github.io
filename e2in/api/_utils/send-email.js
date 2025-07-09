import { Resend } from 'resend';
import ApplicantConfirmationEmail from '../emails/ApplicantConfirmationEmail';
import NewApplicationEmail from '../emails/NewApplicationEmail';
import CareRequestConfirmationEmail from '../emails/CareRequestConfirmationEmail';
import NewCareRequestEmail from '../emails/NewCareRequestEmail';

const resend = new Resend('re_CjRAAhH2_3tYKqP5kTNPsnap94A98a9j9');
const ADMIN_EMAIL = 'anup@e2ihomecare.com';
const FROM_EMAIL = 'onboarding@resend.dev';

export async function sendCareRequestEmails(data) {
  try {
    const userName = data.name || 'New Client';
    const userEmail = data.email;

    // Send email to admin
    await resend.emails.send({
      from: `e2i Care Request <${FROM_EMAIL}>`,
      to: ADMIN_EMAIL,
      subject: 'New Care Request Received',
      react: NewCareRequestEmail({ data }),
    });

    // Send confirmation email to user, if email is provided
    if (userEmail) {
      await resend.emails.send({
        from: `e2i Home Care <${FROM_EMAIL}>`,
        to: userEmail,
        subject: 'We\'ve Received Your Care Request!',
        react: CareRequestConfirmationEmail({ userName }),
      });
    }
  } catch (error) {
    console.error('Error sending care request email:', error);
    throw new Error('Failed to send one or more care request emails.');
  }
}

export async function sendApplicationEmails(data) {
  try {
    const applicantName = data.fullName || 'New Applicant';
    const applicantEmail = data.email;

    const attachments = [];
    if (data.resume && data.resume.size > 0) {
      const resumeFile = data.resume;
      const buffer = Buffer.from(await resumeFile.arrayBuffer());
      attachments.push({
        filename: resumeFile.name,
        content: buffer,
      });
    }

    // Send email to admin
    await resend.emails.send({
      from: `e2i Careers <${FROM_EMAIL}>`,
      to: ADMIN_EMAIL,
      subject: `New Job Application: ${data.positionApplyingFor}`,
      react: NewApplicationEmail({ data }),
      attachments,
    });

    // Send confirmation email to applicant
    await resend.emails.send({
      from: `e2i Home Care <${FROM_EMAIL}>`,
      to: applicantEmail,
      subject: 'We\'ve Received Your Application!',
      react: ApplicantConfirmationEmail({ applicantName }),
    });
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send one or more emails.');
  }
}