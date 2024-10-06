const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmailWithCSV = async (csvData, recipientEmail) => {
  const msg = {
    to: recipientEmail,
    from: "whua0055@student.monash.edu",
    subject: "Events Data",
    text: "Please find the attached CSV file with events data.",
    attachments: [
      {
        content: Buffer.from(csvData).toString("base64"),
        filename: "events.csv",
        type: "text/csv",
        disposition: "attachment",
      },
    ],
  };
  
  try {
    await sgMail.send(msg);
    console.log("Email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
};

module.exports = {sendEmailWithCSV};
