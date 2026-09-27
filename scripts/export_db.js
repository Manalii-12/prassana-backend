require("dotenv").config();
const db = require("../config/db");
const fs = require("fs");
const path = require("path");

async function exportDatabase() {
  db.query("SHOW TABLES", async (err, tables) => {
    if (err) {
      console.error("Error reading tables:", err);
      process.exit(1);
    }

    let dump = `-- Portfolio Database Backup\n-- Exported on ${new Date().toISOString()}\n\nSET FOREIGN_KEY_CHECKS=0;\n\n`;

    for (const tableObj of tables) {
      const tableName = Object.values(tableObj)[0];

      await new Promise((resolve) => {
        db.query(`SHOW CREATE TABLE \`${tableName}\``, (err2, createRes) => {
          if (!err2 && createRes.length > 0) {
            dump += `DROP TABLE IF EXISTS \`${tableName}\`;\n`;
            dump += `${createRes[0]["Create Table"]};\n\n`;
          }

          db.query(`SELECT * FROM \`${tableName}\``, (err3, rows) => {
            if (!err3 && rows.length > 0) {
              const cols = Object.keys(rows[0])
                .map((c) => `\`${c}\``)
                .join(", ");

              for (const r of rows) {
                const values = Object.values(r)
                  .map((v) => (v === null ? "NULL" : db.escape(v)))
                  .join(", ");
                dump += `INSERT INTO \`${tableName}\` (${cols}) VALUES (${values});\n`;
              }
              dump += "\n";
            }
            resolve();
          });
        });
      });
    }

    dump += "SET FOREIGN_KEY_CHECKS=1;\n";

    const outputPath = path.join(__dirname, "../portfolio_db_backup.sql");
    fs.writeFileSync(outputPath, dump, "utf8");
    console.log(`✅ Database successfully exported to ${outputPath}`);
    process.exit(0);
  });
}

exportDatabase();
