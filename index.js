const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const qr = require('qrcode');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

const SMTP_USERNAME = 'yaredshi3@gmail.com';
const SMTP_PASSWORD = 'yusp nbxq hsbv rnjk'; // Use the app-specific password here

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: SMTP_USERNAME,
    pass: SMTP_PASSWORD,
  },
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
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

app.get('/generate-qr', (req, res) => {
  const data = 'http://127.0.0.1:3000/index';
  qr.toFile('./public/qr_code.png', data, (err) => {
    if (err) {
      console.error(err);
      res.send('Error generating QR code');
    } else {
      console.log('QR code generated successfully');
      res.send('QR code generated successfully');
    }
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
