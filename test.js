import nodemailer from 'nodemailer'
// Create a transporter object using Gmail's SMTP transport
const transporter = nodemailer.createTransport({
  service: 'gmail', // You can also use other services like Yahoo, Outlook, etc.
  auth: {
    user: 'krokro666888@gmail.com', // Your email address
    pass: 'hdbaiwsfomsdzqew' // Your email password (or app-specific password if 2FA is enabled)
  }
})

// Define email options
const mailOptions = {
  from: 'krokro666888@gmail.com', // Sender address
  to: 'spikejoe329@gmail.com', // Recipient address
  subject: 'Test Email', // Subject of the email
  text: 'Hello from SMTP!', // Plain text body
  html: '<b>Hello from SMTP!</b>' // HTML body (optional)
}

// Send email
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.log('Error while sending email:', error)
  }
  console.log('Email sent successfully:', info.response)
})
