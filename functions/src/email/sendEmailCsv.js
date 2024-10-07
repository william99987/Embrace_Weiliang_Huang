const nodemailer = require("nodemailer");
// const functions = require("firebase-functions");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "krpkro666888@gmail.com",
    pass: "hdbaiwsfomsdzqew",
  },
});

const sendEmailWithCSV = async (csvData, recipientEmail) => {
  const mailOptions = {
    from: "krokro666888@gmail.com",
    to: recipientEmail,
    subject: "Events Data",
    text: "Please find the attached CSV file with events data.",
    attachments: [
      {
        content: csvData,
        filename: "events.csv",
        type: "text/csv",
        disposition: "attachment",
      },
    ],
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
};

module.exports = {sendEmailWithCSV};
