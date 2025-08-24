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
  const { to, name, maintext, subject, tag } = req.body; // Get recipient email from frontend

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
    from: `"Wallet Go" <${process.env.EMAIL_USER}>`,
    to: to, // Recipient email from frontend
    subject: `${subject}`,
    text: `Hello ${sanitizedName}!\n\nThank you for subscribing! This email contains updates and images in HTML format, but your email client is displaying the plain-text version. Visit our website for more information: https://x.com`,
    html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Welcome to Our Service</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif; font-size: 16px; color: #333333; background-color: #f4f4f4;">
  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f4f4f4;">
    <tr>
      <td align="center">
        <!-- Main content wrapper -->
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="600" style="background-color: #ffffff; margin: 20px auto;">
          <!-- Header -->
          <tr>
            <td style="padding: 20px; text-align: center; background-color: #ffffff;">
              <h1 style="font-size: 24px; margin: 0; color: #333333;">Welcome to Gwallet</h1>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding: 20px 30px; text-align: left;">
              <p style="margin: 0 0 15px; line-height: 1.5;">Hi ${sanitizedName},</p>
              <p style="margin: 0 0 15px; line-height: 1.5;">
                ${maintext}
              </p>
              <!-- Button -->
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin: 20px auto;">
                <tr>
                  <td style="text-align: center;">
                    <a href="[Your-Link-Here]" style="display: inline-block; padding: 12px 24px; font-size: 16px; font-weight: bold; color: #ffffff; background-color: #007bff; text-decoration: none; border-radius: 5px;">Get Started</a>
                  </td>
                </tr>
              </table>
              <p style="margin: 0 0 15px; line-height: 1.5;">
                If you have any questions, feel free to reply to this email or contact our support team at <a href="mailto:support@Gwallet.com" style="color: #007bff; text-decoration: underline;">support@Gwallet.com</a>.
              </p>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding: 20px; text-align: center; background-color: #f4f4f4; font-size: 12px; color: #666666;">
              <p style="margin: 0 0 10px;">Gwallet<br>Gwallet<br>© 2025 Gwallet. All rights reserved.</p>
              <p style="margin: 0;">
                <a href="[Unsubscribe-Link-Here]" style="color: #007bff; text-decoration: underline;">Unsubscribe</a> from these emails.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
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
