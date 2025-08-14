const express = require('express');
const nodemailer = require('nodemailer');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Configure nodemailer with Gmail SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER, // Your Gmail address (from environment variables)
    pass: process.env.GMAIL_PASS  // Your Gmail App Password
  }
});

// POST endpoint to send email
app.post('/send-email', async (req, res) => {
  const { to, subject, text } = req.body;

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to,
    subject,
    text
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
