const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const qr = require('qrcode');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

const SMTP_USERNAME = process.env.SMTP_USERNAME || 'yaredshi3@gmail.com';
const SMTP_PASSWORD = process.env.SMTP_PASSWORD || 'yusp nbxq hsbv rnjk'; // Use the app-specific password here

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: SMTP_USERNAME,
    pass: SMTP_PASSWORD,
  },
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/submit-feedback', (req, res) => {
  const { name, email, comment } = req.body;

  const mailOptions = {
    from: SMTP_USERNAME,
    to: 'yaredshi3@gmail.com',
    subject: 'Feedback from Website',
    text: `Name: ${name}\nEmail: ${email}\nComment: ${comment}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.send('Error sending email');
    } else {
      console.log('Email sent: ' + info.response);
      res.send('Feedback received successfully');
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
