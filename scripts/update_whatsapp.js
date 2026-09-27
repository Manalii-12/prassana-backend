require('dotenv').config();
const db = require('../config/db');

const query = "UPDATE contact_details SET whatsapp = '+91 8097075054' WHERE id = 1";
db.query(query, (updateErr, result) => {
  if (updateErr) {
    console.error('Update error:', updateErr);
    process.exit(1);
  }
  console.log('Successfully updated whatsapp number:', result.message);

  db.query("SELECT id, email, whatsapp, whatsapp_message FROM contact_details", (selectErr, rows) => {
    console.log('Current contact details row:', rows);
    process.exit(0);
  });
});
