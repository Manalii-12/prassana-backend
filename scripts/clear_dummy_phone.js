require("dotenv").config();
const db = require("../config/db");

db.query(
  "UPDATE contact_details SET whatsapp = '' WHERE whatsapp LIKE '%9876543210%'",
  (err, res) => {
    if (err) {
      console.error("Error updating contact_details:", err);
    } else {
      console.log("Successfully cleared dummy phone:", res);
    }

    db.query("SELECT id, email, whatsapp FROM contact_details", (err2, rows) => {
      console.log("Updated rows:", rows);
      db.end();
      process.exit(0);
    });
  }
);
