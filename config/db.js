const mysql = require("mysql2");

let db;

const dbHost = process.env.DB_HOST || process.env.MYSQLHOST;
const dbUser = process.env.DB_USER || process.env.MYSQLUSER;
const dbPassword = process.env.DB_PASSWORD || process.env.MYSQLPASSWORD;
const dbName = process.env.DB_NAME || process.env.MYSQLDATABASE || "test";
const dbPort = Number(process.env.DB_PORT || process.env.MYSQLPORT || 3306);

if (process.env.MYSQL_URL) {
  try {
    const parsed = new URL(process.env.MYSQL_URL);
    const isRemote = parsed.hostname !== "localhost" && parsed.hostname !== "127.0.0.1";

    db = mysql.createPool({
      host: parsed.hostname,
      port: Number(parsed.port || 3306),
      user: decodeURIComponent(parsed.username),
      password: decodeURIComponent(parsed.password),
      database: parsed.pathname.replace(/^\//, "") || "test",
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      multipleStatements: true,
      ...(isRemote ? { ssl: { minVersion: "TLSv1.2", rejectUnauthorized: true } } : {}),
    });
  } catch (err) {
    db = mysql.createPool(process.env.MYSQL_URL);
  }
} else {
  const isRemote = dbHost && !dbHost.includes("localhost") && !dbHost.includes("127.0.0.1");

  db = mysql.createPool({
    host: dbHost || "localhost",
    user: dbUser || "root",
    password: dbPassword || "",
    database: dbName || "portfolio_db",
    port: dbPort,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    multipleStatements: true,
    ...(isRemote || process.env.DB_SSL === "true"
      ? { ssl: { minVersion: "TLSv1.2", rejectUnauthorized: true } }
      : {}),
  });
}

db.getConnection((err, conn) => {
  if (err) {
    console.error("❌ MySQL Connection Warning:", err.message);
    return;
  }
  console.log("✅ MySQL Connected Successfully");
  conn.release();
});

module.exports = db;