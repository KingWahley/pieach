import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request) {
  try {
    const body = await request.json();
    const { clientName, clientEmail, preferredDate, preferredTime, service } = body;

    if (!clientEmail) {
      return NextResponse.json({ error: 'Missing client email' }, { status: 400 });
    }

    const emailSubject = `Appointment Confirmed: ${service} with Pieach`;
    const formattedDateString = new Date(preferredDate + 'T00:00:00').toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    });

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
        <div style="text-align: center; margin-bottom: 24px;">
          <h2 style="color: #420C0C; margin: 0;">Appointment Confirmed</h2>
          <p style="color: #8b7355; font-size: 14px; margin: 4px 0 0 0; text-transform: uppercase; letter-spacing: 0.1em;">Pieach Architects</p>
        </div>
        
        <p style="font-size: 15px; color: #333; line-height: 1.5;">Dear ${clientName},</p>
        <p style="font-size: 15px; color: #333; line-height: 1.5;">We are pleased to inform you that your appointment request has been approved and confirmed. Here are your schedule coordinates:</p>
        
        <div style="background-color: #FAF6EE; padding: 18px; border-radius: 6px; margin: 20px 0; border-left: 4px solid #8b7355;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 6px 0; font-size: 14px; color: #555; font-weight: bold; width: 120px;">Service:</td>
              <td style="padding: 6px 0; font-size: 14px; color: #333;">${service}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-size: 14px; color: #555; font-weight: bold;">Date:</td>
              <td style="padding: 6px 0; font-size: 14px; color: #333;">${formattedDateString}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-size: 14px; color: #555; font-weight: bold;">Time:</td>
              <td style="padding: 6px 0; font-size: 14px; color: #333;">${preferredTime}</td>
            </tr>
          </table>
        </div>
        
        <p style="font-size: 13px; color: #666; line-height: 1.5; font-style: italic;">
          Note: If this is a virtual session, a calendar invitation containing the meeting coordinate links (Google Meet / Zoom) will be sent to your inbox shortly.
        </p>
        
        <hr style="border: 0; border-top: 1px solid #e0e0e0; margin: 24px 0;" />
        
        <div style="text-align: center; font-size: 12px; color: #888;">
          <p style="margin: 0 0 4px 0;">&copy; ${new Date().getFullYear()} Pieach. All rights reserved.</p>
          <p style="margin: 0;">Designing Spaces With Purpose.</p>
        </div>
      </div>
    `;

    const resendApiKey = process.env.RESEND_API_KEY;

    if (resendApiKey) {
      const resend = new Resend(resendApiKey);
      const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
      
      let targetEmail = clientEmail;
      let finalSubject = emailSubject;

      // Unverified Resend accounts using onboarding@resend.dev can only send to the registered account owner.
      // We automatically reroute non-owner emails to the registered address for testing to prevent 403 API errors.
      if (fromEmail === 'onboarding@resend.dev' && clientEmail.toLowerCase() !== 'kingwahley2@gmail.com') {
        targetEmail = 'kingwahley2@gmail.com';
        finalSubject = `[TEST FOR: ${clientEmail}] ${emailSubject}`;
        console.log(`[Resend Sandbox Redirect]: Re-routing test email for "${clientEmail}" to account owner "${targetEmail}"`);
      }

      const { data, error } = await resend.emails.send({
        from: fromEmail,
        to: targetEmail,
        subject: finalSubject,
        html: emailHtml,
      });

      if (error) {
        console.error('[Resend Error]', error);
        return NextResponse.json({ error: error.message }, { status: 400 });
      }

      console.log(`[Resend Email Sent Success] Message ID: ${data?.id} sent to ${clientEmail}`);
      return NextResponse.json({ success: true, message: 'Email sent successfully via Resend', data });
    } else {
      // Fallback: log notification to server console for testing/development
      console.log('==================================================');
      console.log(`[MOCK EMAIL NOTIFICATION] (Configure RESEND_API_KEY env var for live delivery)`);
      console.log(`To: ${clientEmail}`);
      console.log(`Subject: ${emailSubject}`);
      console.log(`Content HTML:\n${emailHtml}`);
      console.log('==================================================');
      return NextResponse.json({ success: true, message: 'Email logged to server console (Resend API key not configured)' });
    }
  } catch (err) {
    console.error('[Email Send Error]', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
