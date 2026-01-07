// Vercel Serverless Function for Contact Form
export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Get form data
  const { name, email, phone, location, 'project-type': projectType, timeline, description } = req.body;

  // Validate required fields
  if (!name || !email || !phone || !location || !description) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Email configuration - using environment variables
  const recipientEmail = process.env.CONTACT_EMAIL || 'jordan@trueluxconstruction.com';
  const emailService = process.env.EMAIL_SERVICE || 'resend'; // 'resend' or 'nodemailer'

  try {
    if (emailService === 'resend') {
      // Using Resend (recommended - modern and reliable)
      const RESEND_API_KEY = process.env.RESEND_API_KEY;
      
      if (!RESEND_API_KEY) {
        return res.status(500).json({ 
          error: 'Email service not configured. Please set RESEND_API_KEY in Vercel environment variables.' 
        });
      }

      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: process.env.FROM_EMAIL || 'True Lux Construction <onboarding@resend.dev>',
          to: [recipientEmail],
          replyTo: email,
          subject: `New Consultation Request from ${name}`,
          html: `
            <h2>New Consultation Request</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Project Location:</strong> ${location}</p>
            <p><strong>Project Type:</strong> ${projectType || 'Not specified'}</p>
            <p><strong>Timeline:</strong> ${timeline || 'Not specified'}</p>
            <p><strong>Description:</strong></p>
            <p>${description.replace(/\n/g, '<br>')}</p>
          `,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to send email');
      }

      return res.status(200).json({ success: true, message: 'Email sent successfully' });
    } else {
      // Fallback: Using Nodemailer with SMTP
      // This would require installing nodemailer package
      return res.status(500).json({ 
        error: 'Please configure Resend API key. See README for setup instructions.' 
      });
    }
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ 
      error: 'Failed to send email. Please try again later.',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}

