const nodemailer = require('nodemailer');

// Create a transporter object using Gmail SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Replace with your Gmail address
   // pass: process.env.EMAIL_PASS      // Replace with your Gmail App Password
  }
});

// Define the email options
const mailOptions = {
  from: `"Paypal" <${process.env.EMAIL_USER}>`,    // Sender address
  to: 'sheunrex@gmail.com',      // Recipient address
  subject: 'Test Email from Node.js', // Subject line
  text: 'Hello, this is a confirmed email sent from Node.js using Gmail SMTP!', // Plain text body
  // html: '<b>Hello, this is a test email!</b>' // Optional: HTML body
};

// Send the email
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error('Error sending email:', error);
  } else {
    console.log('Email sent successfully:', info.response);
  }
});
