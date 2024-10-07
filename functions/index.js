/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const admin = require("firebase-admin");
const cors = require("cors")({origin: true});
const {sendEmailWithCSV} = require("./src/email/sendEmailCsv");
const {convertToCSV} = require("./src/utils/csvUtil");

admin.initializeApp();

const db = admin.firestore();


// Function to get events from Firestore
const getEvents = async () => {
  try {
    const eventsCollection = db.collection("events");
    const snapshot = await eventsCollection.get();
    const events = snapshot.docs.map((doc) => doc.data());
    return events; // Return events data
  } catch (error) {
    console.error("Error getting events:", error.message);
    throw new Error("Error getting events");
  }
};

// Export the getEvents function as an HTTP request handler
exports.getEvents = onRequest(async (req, res) => {
  cors(req, res, async () => {
    try {
      const events = await getEvents();
      res.set("Access-Control-Allow-Origin", "*"); // Allow any origin
      res.set("Access-Control-Allow-Methods", "GET, POST"); // Allowed methods
      res.set("Access-Control-Allow-Headers", "Content-Type");

      res.status(200).send({events});
    } catch (error) {
      res.status(500).send("Error getting events");
    }
  });
});

exports.sendEventEmail = onRequest(async (req, res) => {
  cors(req, res, async () => {
    try {
      const recipientEmail = req.body.email;
      if (!recipientEmail) {
        return res.status(400).send("Recipient email is required.");
      }

      // Get events from Firestore
      const events = await getEvents();
      const csvData = convertToCSV(events); // Convert events to CSV

      // Send the email with CSV attachment using Nodemailer
      await sendEmailWithCSV(csvData, recipientEmail);

      // Set CORS headers for the response
      res.set("Access-Control-Allow-Origin", "*");
      res.set("Access-Control-Allow-Methods", "GET, POST");
      res.set("Access-Control-Allow-Headers", "Content-Type");

      res.status(200).send("Email sent successfully!");
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).send("Failed to send email.");
    }
  });
});

exports.downloadEventsCsv = onRequest(async (req, res) => {
  cors(req, res, async () => {
    try {
      const events = await getEvents();
      const csvData = convertToCSV(events);

      res.setHeader("Content-Type", "text/csv");
      res.setHeader("Content-Disposition", "attachment; filename='events.csv'");
      res.status(200).send(csvData);
      res.status(200).send("Download csv successfully!");
    } catch (error) {
      console.error("error downloading csv:", error);
      res.status(500).send("Failed to download csv file");
    }
  });
});
// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
