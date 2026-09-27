const mysql = require("mysql2");

// Support Railway environment variables (MYSQLHOST, MYSQLUSER, MYSQLPASSWORD, etc.)
// as well as custom DB_HOST, DB_USER, etc., and MYSQL_URL connection string.
let db;

if (process.env.MYSQL_URL) {
  let url = process.env.MYSQL_URL;
  if (!url.includes("multipleStatements=true")) {
    url += (url.includes("?") ? "&" : "?") + "multipleStatements=true";
  }
  if (!url.includes("ssl=") && !url.includes("localhost") && !url.includes("127.0.0.1")) {
    url += "&ssl={\"rejectUnauthorized\":false}";
  }
  db = mysql.createPool(url);
} else {
  const isRemote =
    (process.env.MYSQLHOST && !process.env.MYSQLHOST.includes("localhost") && !process.env.MYSQLHOST.includes("127.0.0.1")) ||
    (process.env.DB_HOST && !process.env.DB_HOST.includes("localhost") && !process.env.DB_HOST.includes("127.0.0.1"));

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
    ...(isRemote || process.env.DB_SSL === "true" ? { ssl: { rejectUnauthorized: false } } : {}),
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