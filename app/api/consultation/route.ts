import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, preferredDate, message } = await req.json();

    // Create email transporter using your existing environment variables
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.IMMIGRATION_EMAIL,
        pass: process.env.IMMIGRATION_APP_PASSWORD,
      },
    });

    // Format the preferred date
    const formattedDate = preferredDate 
      ? new Date(preferredDate).toLocaleDateString('en-US', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })
      : 'Not specified';

    // Email content
    const mailOptions = {
      from: process.env.IMMIGRATION_EMAIL,
      to: process.env.IMMIGRATION_EMAIL, // Send to the same email
      subject: `New Consultation Request - ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #501027; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
            .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #501027; }
            .value { margin-top: 5px; padding: 10px; background: white; border-radius: 4px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>🎯 New Consultation Request</h2>
              <p>Cabo Immigration Services</p>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">👤 Name:</div>
                <div class="value">${name}</div>
              </div>
              
              <div class="field">
                <div class="label">📧 Email:</div>
                <div class="value"><a href="mailto:${email}">${email}</a></div>
              </div>
              
              <div class="field">
                <div class="label">📞 Phone:</div>
                <div class="value"><a href="tel:${phone}">${phone}</a></div>
              </div>
              
              <div class="field">
                <div class="label">📅 Preferred Date:</div>
                <div class="value">${formattedDate}</div>
              </div>
              
              ${message ? `
              <div class="field">
                <div class="label">💬 Message:</div>
                <div class="value">${message.replace(/\n/g, '<br>')}</div>
              </div>
              ` : ''}
              
              <div style="margin-top: 30px; padding-top: 20px; border-top: 2px solid #ddd;">
                <p style="color: #666; font-size: 14px;">
                  <strong>Action Required:</strong> Please contact this client within 24 hours to schedule their consultation.
                </p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
New Consultation Request - Cabo Immigration Services

Name: ${name}
Email: ${email}
Phone: ${phone}
Preferred Date: ${formattedDate}

Message:
${message || 'No message provided'}

---
Please contact this client within 24 hours to schedule their consultation.
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ 
      success: true, 
      message: 'Consultation request sent successfully' 
    });
  } catch (error) {
    console.error('Error sending consultation email:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to send consultation request' },
      { status: 500 }
    );
  }
}
