import nodemailer from 'nodemailer';
import formidable from 'formidable';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const form = formidable({
      maxFileSize: 2 * 1024 * 1024,
      maxTotalFileSize: 8 * 1024 * 1024,
      maxFiles: 10,
      allowEmptyFiles: false,
      filter: ({ mimetype }) => {
        const allowed = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
        return allowed.includes(mimetype);
      }
    });

    const [fields, files] = await form.parse(req);

    const formData = {
      fullName: fields.fullName?.[0],
      email: fields.email?.[0],
      phone: fields.phone?.[0],
      dateOfBirth: fields.dateOfBirth?.[0],
      nationality: fields.nationality?.[0],
      passportNumber: fields.passportNumber?.[0],
      passportExpiration: fields.passportExpiration?.[0],
      currentAddress: fields.currentAddress?.[0],
      intendedCaboAddress: fields.intendedCaboAddress?.[0],
      serviceType: fields.serviceType?.[0],
      livedInMexicoBefore: fields.livedInMexicoBefore?.[0],
      currentVisaStatus: fields.currentVisaStatus?.[0],
      incomeSource: fields.incomeSource?.[0],
      monthlyIncome: fields.monthlyIncome?.[0],
      hasMexicanFamily: fields.hasMexicanFamily?.[0],
      employerName: fields.employerName?.[0],
      jobTitle: fields.jobTitle?.[0],
      employerRFC: fields.employerRFC?.[0],
      jobStartDate: fields.jobStartDate?.[0],
    };

    if (!formData.fullName || !formData.email || !formData.serviceType) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: name, email, and service type are required'
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid email address format'
      });
    }

    if (!process.env.IMMIGRATION_EMAIL || !process.env.IMMIGRATION_APP_PASSWORD) {
      console.error('Email configuration missing');
      return res.status(500).json({
        success: false,
        error: 'Email service not configured. Please contact us at hello@immigratecabo.com'
      });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.IMMIGRATION_EMAIL,
        pass: process.env.IMMIGRATION_APP_PASSWORD
      }
    });

    try {
      await transporter.verify();
    } catch (error) {
      console.error('Email transporter verification failed:', error);
      return res.status(500).json({
        success: false,
        error: 'Email service configuration error. Please contact support.'
      });
    }

    const attachments = [];
    const filesList = [];

    const processFile = (fileArray, label) => {
      if (fileArray && fileArray.length > 0) {
        fileArray.forEach((file, index) => {
          const ext = file.originalFilename.split('.').pop();
          const fileName = `${label}${fileArray.length > 1 ? `_${index + 1}` : ''}.${ext}`;
          
          const fileContent = fs.readFileSync(file.filepath);
          attachments.push({
            filename: fileName,
            content: fileContent,
            contentType: file.mimetype
          });
          
          filesList.push({
            name: fileName,
            size: `${(file.size / 1024).toFixed(1)} KB`,
            type: file.mimetype
          });
          
          try {
            fs.unlinkSync(file.filepath);
          } catch (err) {
            console.warn('Failed to delete temp file:', err);
          }
        });
      }
    };

    processFile(files.passportPhoto, 'Passport_Photo');
    processFile(files.proofOfIncome, 'Proof_of_Income');
    processFile(files.photo, 'ID_Photo');
    processFile(files.birthCertificate, 'Birth_Certificate');
    processFile(files.jobOfferLetter, 'Job_Offer');
    processFile(files.additionalDocuments, 'Additional_Doc');

    const serviceTypes = {
      'temporary': 'Temporary Residency (1-4 years)',
      'permanent': 'Permanent Residency',
      'work-permit': 'Work Permit',
      'renewal': 'Residency Renewal'
    };

    const serviceTypeName = serviceTypes[formData.serviceType] || formData.serviceType;
    const submissionDate = new Date().toLocaleString('en-US', {
      dateStyle: 'full',
      timeStyle: 'short',
      timeZone: 'America/Mazatlan'
    });

    const filesListHtml = filesList.map(file => 
      `<li style="margin: 5px 0; color: #059669;">📎 <strong>${file.name}</strong> (${file.size})</li>`
    ).join('');

    const clientEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #4A1E5C 0%, #8B5CF6 100%); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
          <h2 style="color: white; margin: 0; font-size: 28px;">✅ Application Received!</h2>
          <p style="color: #E9D5FF; margin: 10px 0 0 0;">IMMIGRATECABO</p>
        </div>
        
        <div style="background: #ffffff; padding: 30px;">
          <p style="font-size: 16px; color: #374151; margin-bottom: 20px;">Dear ${formData.fullName},</p>
          
          <p style="font-size: 16px; color: #374151; line-height: 1.6;">
            Thank you for submitting your <strong>${serviceTypeName}</strong> application! We've successfully received your information${filesList.length > 0 ? ` and ${filesList.length} supporting document${filesList.length !== 1 ? 's' : ''}` : ''}.
          </p>
          
          <div style="background: #D1FAE5; padding: 20px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #10B981;">
            <h3 style="margin-top: 0; color: #065F46; font-size: 18px;">✅ What We Received:</h3>
            <p style="margin: 10px 0; color: #065F46;"><strong>Service:</strong> ${serviceTypeName}</p>
            <p style="margin: 10px 0; color: #065F46;"><strong>Documents:</strong> ${filesList.length} file${filesList.length !== 1 ? 's' : ''} uploaded</p>
            <p style="margin: 10px 0; color: #065F46;"><strong>Submission Date:</strong> ${submissionDate}</p>
          </div>

          <div style="background: #DBEAFE; padding: 20px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #3B82F6;">
            <h3 style="margin-top: 0; color: #1E40AF; font-size: 18px;">📋 What Happens Next:</h3>
            <ol style="margin: 10px 0; padding-left: 20px; color: #1E40AF;">
              <li style="margin: 10px 0;">Our immigration specialist will review your documents</li>
              <li style="margin: 10px 0;"><strong>We'll contact you within 24 hours</strong> via phone or email</li>
              <li style="margin: 10px 0;">We'll schedule a consultation to discuss your case</li>
              <li style="margin: 10px 0;">We'll prepare your complete INM application packet</li>
            </ol>
          </div>

          <p style="font-size: 16px; color: #374151; margin-top: 30px;">
            Best regards,<br>
            <strong style="color: #7C3AED;">The ImmigrateCabo Team</strong>
          </p>
        </div>
        
        <div style="background: #1F2937; padding: 25px; text-align: center; border-radius: 0 0 8px 8px;">
          <p style="margin: 0; color: white; font-size: 14px;">Your Trusted Immigration Partner in Cabo</p>
          <p style="margin: 5px 0 0 0; color: #9CA3AF; font-size: 12px;">hello@immigratecabo.com | +52 624 123 4567</p>
        </div>
      </div>
    `;

    const clientMailOptions = {
      from: process.env.IMMIGRATION_EMAIL,
      to: formData.email,
      subject: `✅ Application Received - ${serviceTypeName} - ImmigrateCabo`,
      html: clientEmailHtml
    };

    await transporter.sendMail(clientMailOptions);

    // Simplified office email (no attachments for now to stay under Vercel limits)
    const officeEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 650px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #4A1E5C 0%, #8B5CF6 100%); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
          <h2 style="color: white; margin: 0; font-size: 28px;">🛂 New Immigration Application</h2>
          <p style="color: #FCD34D; margin: 10px 0 0 0; font-weight: bold;">${serviceTypeName}</p>
        </div>
        
        <div style="background: #ffffff; padding: 30px; border: 1px solid #e5e7eb;">
          <div style="background: #F3F4F6; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="margin-top: 0;">Applicant Information:</h3>
            <p><strong>Name:</strong> ${formData.fullName}</p>
            <p><strong>Email:</strong> <a href="mailto:${formData.email}">${formData.email}</a></p>
            <p><strong>Phone:</strong> ${formData.phone || 'Not provided'}</p>
            <p><strong>Nationality:</strong> ${formData.nationality}</p>
            <p><strong>Passport:</strong> ${formData.passportNumber}</p>
          </div>
          
          <div style="background: #D1FAE5; padding: 20px; border-radius: 8px;">
            <p><strong>Documents Uploaded:</strong> ${filesList.length}</p>
            ${filesList.length > 0 ? `<ul>${filesListHtml}</ul>` : '<p>No documents uploaded</p>'}
            <p style="margin: 15px 0 0 0;"><strong>Submission Date:</strong> ${submissionDate}</p>
          </div>
        </div>
      </div>
    `;

    const officeMailOptions = {
      from: process.env.IMMIGRATION_EMAIL,
      to: process.env.IMMIGRATION_EMAIL,
      subject: `NEW: ${serviceTypeName} Application - ${formData.fullName}`,
      html: officeEmailHtml,
      replyTo: formData.email
    };

    await transporter.sendMail(officeMailOptions);

    console.log('✅ Emails sent - Applicant:', formData.email);
    
    return res.status(200).json({
      success: true,
      message: `Application submitted! Check your email at ${formData.email} for confirmation.`,
      documentsReceived: filesList.length
    });

  } catch (error) {
    console.error('Form submission failed:', error);
    
    if (error.message?.includes('maxFileSize') || error.code === 'LIMIT_FILE_SIZE') {
      return res.status(413).json({
        success: false,
        error: 'Files too large. Each file must be under 2MB. Total upload under 8MB.'
      });
    }
    
    return res.status(500).json({
      success: false,
      error: 'Failed to submit application. Please try again.'
    });
  }
}
