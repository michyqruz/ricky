const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000; // Render provides the PORT environment variable

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from React/Vue/HTML frontend if you have one
app.use(express.static(path.join(__dirname, 'public')));

// API Routes
app.get('/api/data', (req, res) => {
    res.json({ message: 'Hello from Render server!' });
});

// API endpoint to send email
app.post('/api/data', (req, res) => {
  const { to, name } = req.body; // Get recipient email from frontend

  // Validate email
  if (!to || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to)) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

    // Sanitize name; use default if not provided
  const sanitizedName = name && name.trim() ? name.trim() : 'Subscriber';

// Nodemailer transporter configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS 
  },
});

  // Email options
  const mailOptions = {
    from: `"Ricky" <${process.env.EMAIL_USER}>`,
    to: to, // Recipient email from frontend
    subject: 'A transaction is pending and been reviewed (Ref ID - TY-U-753194873157)',
    text: `Welcome to Our Newsletter. ${sanitizedName}!\n\nThank you for subscribing! This email contains updates and images in HTML format, but your email client is displaying the plain-text version. Visit our website for more information: https://example.com`,
    html: `
  <p style="text-align: center; color: #999999; font-size: 12px;">Hello ${sanitizedName}</p>
  <div style="font-family: Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; text-align: center; padding: 20px; background-color: #f1f4f7;">
    <img src="https://michyqruz.github.io/The-money-box/IMG_8211.JPG" alt="logo" style="width: 60px; height: 60px; border-radius: 50%; object-fit: cover;">
    <h1 style="color: #000000; font-size: 36px; margin: 40px 0; font-weight: 900;">Welcome to Our Newsletter</h1>
    <p style="color: #000000; font-size: 20px; font-weight: bold; text-align: left; line-height: 1.5;">
        Thank you for subscribing! Here's a test email with some thumbnail images. Here's a test email with some thumbnail images.
    </p>
    <a href="https://millxore.github.io/start/" style="display: inline-block; color: #ffffff; padding: 15px 40px; background-color: #000000; color: white; text-decoration: none; border-radius: 25px; font-size: 16px; margin: 10px 0; font-weight: bold;">Explore</a>
  </div>
      
      <div style="background-color: #f1f4f7; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center;">
              <img src="https://michyqruz.github.io/The-money-box/IMG_8211.JPG" alt="logo" style="width: 60px; height: 60px; border-radius: 50%; object-fit: cover;">
              <hr style="margin: 30px auto; border: 1px solid #D3D3D3;">
          </div>
          <div style="text-align: center;">
              <a href="#" style="font-size: 12px; color: #1a73e8; text-decoration: none; padding: 0 8px;">Help & Contact</a>
              <a href="#" style="font-size: 12px; color: #1a73e8; text-decoration: none; padding: 0 8px; border-left: 2px solid black;">Security</a>
              <a href="#" style="font-size: 12px; color: #1a73e8; text-decoration: none; padding: 0 8px; border-left: 2px solid black;">Apps</a>
          </div>
          <p style="color: #555; font-size: 14px;">
     We are committed to preventing fraudulent emails. Emails from us will always contain your full name. <span style="font-size: 12px; color: #1a73e8; text-decoration: none;">Learn to identify phishing</span>
          </p>
          <p style="color: #555; font-size: 14px;">
      Please don't reply to this email. To get in touch with us, click <span style="font-size: 12px; color: #1a73e8; text-decoration: none;">Help & Contact.</span>   
          </p>
          <p style="color: #555; font-size: 14px;">
      Not sure why you received this email? <span style="font-size: 12px; color: #1a73e8; text-decoration: none;">Learn more</span>
          </p>
          <p style="color: #555; font-size: 14px;">
      Copyright © 1999-2025. All rights reserved. 
          </p>
          <p style="color: #555; font-size: 14px;">
      Rts. Ltd. is licensed by the Monetary Authority of Singapore as a Major Payment Institution under the Payment Services Act 2019.  
          </p>
      </div>
`
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).json({ error: 'Failed to send email' });
    }
    console.log('Email sent:', info.response);
    res.status(200).json({ message: 'Email sent successfully' });
  });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
