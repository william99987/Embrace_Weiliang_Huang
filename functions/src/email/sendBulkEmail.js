const nodemailer = require("nodemailer");

// Setup the transporter with Gmail SMTP
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "krokro666888@gmail.com",
    pass: "hdbaiwsfomsdzqew",
  },
});

// Function to send bulk email
const sendBulkEmail = async (emailList, csvData) => {
  const mailOptions = {
    from: "krokro666888@gmail.com", // Sender's email
    bcc: emailList, // List of recipients
    subject: "Donation proposal",
    text: "Please donate please!!!!!!!!!!!!!!!!!!!",
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Bulk email sent successfully!");
  } catch (error) {
    console.error("Error sending bulk email:", error);
    throw new Error("Failed to send bulk email");
  }
};

module.exports = {sendBulkEmail};
