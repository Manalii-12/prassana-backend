const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("Connection error:", err);
    process.exit(1);
  }

  const sql = `
    UPDATE about_section SET
      stat1_num = '',
      stat1_label = '',
      stat2_num = '',
      stat2_label = '',
      stat3_num = '',
      stat3_label = ''
  `;

  db.query(sql, (updateErr) => {
    if (updateErr) console.error("Error clearing stats:", updateErr);
    else console.log("✅ Stats successfully cleared in about_section table!");
    db.end();
  });
});
