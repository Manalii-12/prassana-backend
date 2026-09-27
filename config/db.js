const mysql = require("mysql2");

// Support Railway environment variables (MYSQLHOST, MYSQLUSER, MYSQLPASSWORD, etc.)
// as well as custom DB_HOST, DB_USER, etc., and MYSQL_URL connection string.
let db;

if (process.env.MYSQL_URL) {
  const url = process.env.MYSQL_URL.includes("?")
    ? `${process.env.MYSQL_URL}&multipleStatements=true`
    : `${process.env.MYSQL_URL}?multipleStatements=true`;
  db = mysql.createPool(url);
} else {
  db = mysql.createPool({
    host: process.env.MYSQLHOST || process.env.DB_HOST || "localhost",
    user: process.env.MYSQLUSER || process.env.DB_USER || "root",
    password: process.env.MYSQLPASSWORD || process.env.DB_PASSWORD || "",
    database: process.env.MYSQLDATABASE || process.env.DB_NAME || "portfolio_db",
    port: Number(process.env.MYSQLPORT || process.env.DB_PORT || 3306),
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    multipleStatements: true,
  });
}

db.getConnection((err, conn) => {
  if (err) {
    console.error("❌ MySQL Connection Failed / Waiting:", err.message);
    return;
  }
  console.log("✅ MySQL Connected Successfully");
  conn.release();
});

module.exports = db;