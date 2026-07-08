import nodemailer from 'nodemailer';

export const BLOOD_COMPATIBILITY = {
  'O-': ['O-'],
  'O+': ['O-', 'O+'],
  'A-': ['O-', 'A-'],
  'A+': ['O-', 'O+', 'A-', 'A+'],
  'B-': ['O-', 'B-'],
  'B+': ['O-', 'O+', 'B-', 'B+'],
  'AB-': ['O-', 'A-', 'B-', 'AB-'],
  'AB+': ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+']
};

export async function sendMatchEmail({
  donorEmail,
  donorName,
  patientName,
  bloodGroup,
  quantity,
  hospitalName,
  urgencyLevel,
  contactPhone
}) {
  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS;

  // If email configuration is missing, log it and skip sending rather than throwing an unhandled exception
  if (!emailUser || !emailPass || emailUser === 'your-email@gmail.com') {
    console.warn('SMTP Email credentials not configured. Skipping notification email to:', donorEmail);
    return false;
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: emailUser,
      pass: emailPass
    }
  });

  const maroonThemeHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
      <div style="background-color: #b91c1c; padding: 24px; text-align: center;">
        <h1 style="color: #ffffff; margin: 0; font-size: 28px; letter-spacing: 1px;">RaktSeva</h1>
        <p style="color: #fca5a5; margin: 4px 0 0 0; font-style: italic; font-size: 14px;">Every Drop, A New Life</p>
      </div>
      <div style="padding: 24px; background-color: #fffafb; color: #1c1917;">
        <p style="font-size: 16px; line-height: 1.5; margin-top: 0;">Dear <strong>${donorName}</strong>,</p>
        <p style="font-size: 16px; line-height: 1.5;">An urgent blood requirement has been matched with your profile. A patient is in critical need of your support.</p>
        
        <div style="background-color: #fef2f2; border-left: 4px solid #b91c1c; padding: 16px; margin: 20px 0; border-radius: 0 4px 4px 0;">
          <h3 style="color: #991b1b; margin: 0 0 12px 0; font-size: 18px;">Request Details</h3>
          <table style="width: 100%; border-collapse: collapse; font-size: 15px;">
            <tr>
              <td style="padding: 4px 0; color: #78716c; width: 40%;">Patient Name:</td>
              <td style="padding: 4px 0; font-weight: bold; color: #1c1917;">${patientName}</td>
            </tr>
            <tr>
              <td style="padding: 4px 0; color: #78716c;">Blood Group Required:</td>
              <td style="padding: 4px 0; font-weight: bold; color: #b91c1c; font-size: 16px;">${bloodGroup}</td>
            </tr>
            <tr>
              <td style="padding: 4px 0; color: #78716c;">Quantity:</td>
              <td style="padding: 4px 0; font-weight: bold; color: #1c1917;">${quantity} Unit(s)</td>
            </tr>
            <tr>
              <td style="padding: 4px 0; color: #78716c;">Hospital Name:</td>
              <td style="padding: 4px 0; font-weight: bold; color: #1c1917;">${hospitalName}</td>
            </tr>
            <tr>
              <td style="padding: 4px 0; color: #78716c;">Urgency Level:</td>
              <td style="padding: 4px 0; font-weight: bold; color: #e11d48; text-transform: uppercase;">${urgencyLevel}</td>
            </tr>
          </table>
        </div>

        <p style="font-size: 16px; line-height: 1.5;">If you are eligible and available to donate, please get in touch immediately:</p>
        <div style="text-align: center; margin: 24px 0;">
          <a href="tel:${contactPhone}" style="background-color: #b91c1c; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block; font-size: 16px; box-shadow: 0 2px 4px rgba(185,28,28,0.2);">
            Call Requester: ${contactPhone}
          </a>
        </div>
        
        <p style="font-size: 14px; color: #78716c; line-height: 1.5; border-top: 1px solid #f3f4f6; padding-top: 16px; margin-bottom: 0;">
          Thank you for your life-saving spirit. Your contribution makes a difference.<br/>
          <em>Team RaktSeva (Affiliated with Parul Sevashram Hospital, Vadodara)</em>
        </p>
      </div>
    </div>
  `;

  try {
    const info = await transporter.sendMail({
      from: `"RaktSeva Notifications" <${emailUser}>`,
      to: donorEmail,
      subject: `[URGENT] ${bloodGroup} Blood Donation Request - RaktSeva`,
      html: maroonThemeHtml
    });
    console.log('Match notification email sent to:', donorEmail, 'MessageId:', info.messageId);
    return true;
  } catch (error) {
    console.error('Error sending match email to:', donorEmail, error);
    return false;
  }
}
