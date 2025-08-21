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
    subject: 'Action Needed',
    text: `Welcome to Our Newsletter. ${sanitizedName}!\n\nThank you for subscribing! This email contains updates and images in HTML format, but your email client is displaying the plain-text version. Visit our website for more information: https://example.com`,
    html: `
    <div style="display: none; max-height: 0; overflow: hidden;">
    Welcome to our newsletter! View our latest updates and images.
  </div>
  <div style="font-family: Arial, sans-serif; color: #000000; font-weight: bold; max-width: 600px; margin: 0 auto; text-align: center; padding: 20px; background-color: #f3f4f2;">
    <img src="https://freshknots.in/wp-content/uploads/2023/03/rose.png" alt="logo" style="width: 50px; height: 50px; border-radius: 50%; object-fit: cover; border: 2px solid #3498db; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);">
    <h1 style="color: #333; font-size: 26px; margin: 30px 0;">Welcome to Our Newsletter</h1>
    <p style="color: #555; font-size: 18px; text-align: left; line-height: 1.5;">
      Dear ${sanitizedName}. Thank you for subscribing! Here's a test email with some thumbnail images. Here's a test email with some thumbnail images.
    </p>
    <a href="https://millxore.github.io/start/" style="display: inline-block; color: #ffffff; padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 10px; font-size: 16px; margin: 10px 0;">Visit Our Website</a>
    <p style="color: #555; font-size: 14px;">
      For more new updates, visit our website!
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
