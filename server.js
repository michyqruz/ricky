const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const app = express();

// Use the port assigned by Render or default to 3000 for local development
const port = process.env.PORT || 4000;

// Middleware to parse JSON and form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the 'public' folder
app.use(express.static('public'));

// Nodemailer transporter configuration using environment variables
const transporter = nodemailer.createTransport({
  service: 'gmail', // Replace with your email service
  auth: {
    user: process.env.EMAIL_USER, // Use environment variable
    pass: process.env.EMAIL_PASS // Use environment variable
  },
});

// API endpoint to send email
app.post('/send-email', (req, res) => {
  const { to } = req.body; // Get recipient email from frontend

  // Validate email
  if (!to || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to)) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  // Email options
  const mailOptions = {
    from: `"Paypal" <${process.env.EMAIL_USER}>`,    // Sender address
    to: 'sheunrex@gmail.com', // Recipient email from frontend
    subject: 'Test Email',
    text: 'This is a test email sent from Node.js using Nodemailer!',
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
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
