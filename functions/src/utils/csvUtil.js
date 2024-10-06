const Papa = require("papaparse");

const convertToCSV = (jsonData) => {
  try {
    return Papa.unparse(jsonData);
  } catch (err) {
    console.error("Error converting to CSV:", err);
    throw new Error("Failed to convert to CSV");
  }
};

module.exports = {convertToCSV};
