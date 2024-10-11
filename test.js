import nodemailer from 'nodemailer'
// Create a transporter object using Gmail's SMTP transport
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'krokro666888@gmail.com',
    pass: '/////'
  }
})

// Define email options
const mailOptions = {
  from: 'krokro666888@gmail.com',
  to: 'spikejoe329@gmail.com',
  subject: 'Test Email',
  text: 'Hello from SMTP!',
  html: '<b>Hello from SMTP!</b>'
}

// Send email
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.log('Error while sending email:', error)
  }
  console.log('Email sent successfully:', info.response)
})
