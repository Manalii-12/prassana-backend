const mysql = require("mysql2");

// Support Railway environment variables (MYSQLHOST, MYSQLUSER, MYSQLPASSWORD, etc.)
// as well as custom DB_HOST, DB_USER, etc., and MYSQL_URL connection string.
const connectionConfig = process.env.MYSQL_URL
  ? {
      uri: process.env.MYSQL_URL,
      multipleStatements: true,
    }
  : {
      host: process.env.MYSQLHOST || process.env.DB_HOST || "localhost",
      user: process.env.MYSQLUSER || process.env.DB_USER || "root",
      password: process.env.MYSQLPASSWORD || process.env.DB_PASSWORD || "",
      database: process.env.MYSQLDATABASE || process.env.DB_NAME || "portfolio_db",
      port: Number(process.env.MYSQLPORT || process.env.DB_PORT || 3306),
      multipleStatements: true,
    };

const db = mysql.createConnection(connectionConfig);

db.connect((err) => {
  if (err) {
    console.error("❌ MySQL Connection Failed:", err);
    return;
  }

  console.log("✅ MySQL Connected Successfully");
});

module.exports = db;