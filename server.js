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
    ${sanitizedName}, Welcome to our newsletter! View our latest updates and images.
  </div>
  <div style="font-family: Helvetica, Arial, sans-serif; font-weight: bold; max-width: 600px; margin: 0 auto; text-align: center; padding: 20px; background-color: #f1f1f4;">
    <img src="https://freshknots.in/wp-content/uploads/2023/03/rose.png" alt="logo" style="width: 50px; height: 50px; border-radius: 50%; object-fit: cover; border: 2px solid #3498db; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);">
    <h1 style="font-family: 'Bebas Neue', sans-serif; font-size: 32px; margin: 30px 0;">Welcome to Our Newsletter</h1>
    <p style="font-size: 18px; text-align: left; line-height: 1.5;">
      Hello ${sanitizedName},<br>Thank you for subscribing! Here's a test email with some thumbnail images. Here's a test email with some thumbnail images.
    </p>
    <a href="https://millxore.github.io/start/" style="display: inline-block; color: #ffffff; padding: 15px 40px; background-color: #007AFF; color: white; text-decoration: none; border-radius: 25px; font-size: 16px; margin: 10px 0;">Explore</a>
  </div>
      
      <div style="background-color: #f1f1f4; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center;">
              <img src="https://freshknots.in/wp-content/uploads/2023/03/rose.png" alt="logo" style="width: 50px; height: 50px; border-radius: 50%; object-fit: cover; border: 2px solid #3498db; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);">
              <hr style="margin: 30px auto;">
          </div>
          <div style="text-align: center;">
      <a href="#" style="font-size: 14px; font-weight: bold; color: #1a73e8; text-decoration: none; padding: 0 10px;">Help & Contact</a>
      <a href="#" style="font-size: 14px; font-weight: bold; color: #1a73e8; text-decoration: none; padding: 0 10px; border-left: 1px solid;">Security</a>
      <a href="#" style="font-size: 14px; font-weight: bold; color: #1a73e8; text-decoration: none; padding: 0 10px; border-left: 1px solid;">Apps</a>
          </div>
          <div style="text-align: center; margin: 10px auto;">
      <a href="#" style="margin-right: 10px;"><img src="https://simpleicons.org/icons/x.svg" alt="X" width="40" height="40" style="display: inline-block; vertical-align: middle; border-radius: 50%; border: 2px solid black;"></a>
      <a href="#" style="margin-right: 10px;"><img src="https://cdn.jsdelivr.net/npm/simple-icons@v5/icons/instagram.svg" alt="Instagram" width="40" height="40" style="display: inline-block; vertical-align: middle; border-radius: 50%; border: 2px solid black;"></a>
      <a href="#" style="margin-right: 10px;"><img src="https://cdn.jsdelivr.net/npm/simple-icons@v5/icons/facebook.svg" alt="Facebook" width="40" height="40" style="display: inline-block; vertical-align: middle; border-radius: 50%; border: 2px solid black;"></a>
      <a href="#"><img src="https://cdn.jsdelivr.net/npm/simple-icons@v5/icons/linkedin.svg" alt="LinkedIn" width="40" height="40" style="display: inline-block; vertical-align: middle; border-radius: 50%; border: 2px solid black;"></a>
          </div>
          <p style="color: #555; font-size: 14px;">
      For more new updates, visit our website! For more new updates, visit our website! For more new updates, visit our website!
          </p>
          <p style="color: #555; font-size: 14px;">
      For more new updates, visit our website!   
          </p>
          <p style="color: #555; font-size: 14px;">
      For more new updates, visit our website! For more new updates, visit our website!
          </p>
          <p style="color: #555; font-size: 14px;">
      For more new updates, visit our website!   
          </p>
          <p style="color: #555; font-size: 14px;">
      For more new updates, visit our website!   
          </p>
          <p style="color: #555; font-size: 14px;">
      For more new updates, visit our website! For more new updates, visit our website! For more new updates, visit our website!
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
