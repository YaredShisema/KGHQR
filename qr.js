const QRCode = require('qrcode');

// Example data (replace with your actual data)
const data = 'https://127.0.0.1:3000/feedback';

// Generate QR code
QRCode.toFile('qr_code.png', data, (err) => {
    if (err) {
        console.error('Error generating QR code:', err);
    } else {
        console.log('QR code generated successfully');
    }
});
