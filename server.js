require("dotenv").config();

const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const db = require("./config/db");

const app = express();
const projectRoutes = require("./routes/projectRoutes");
const authRoutes = require("./routes/authRoutes");
const heroRoutes = require("./routes/heroRoutes");
const exploreRoutes = require("./routes/exploreRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const aboutRoutes = require("./routes/aboutRoutes");
const eventRoutes = require("./routes/eventRoutes");
const contactRoutes = require("./routes/contactRoutes");

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use("/api/projects", projectRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/hero", heroRoutes);
app.use("/api/explore", exploreRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/about", aboutRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/contact", contactRoutes);

app.get("/", (req, res) => {
  res.send("Portfolio Backend Running 🚀");
});

// Auto-seed database from portfolio_db_backup.sql on first startup if tables are missing
function initDatabase() {
  db.query("SHOW TABLES LIKE 'projects'", (err, results) => {
    if (err) {
      console.warn("Database check note:", err.message);
      return;
    }
    if (results.length === 0) {
      console.log("⚡ Fresh database detected! Initializing tables and data from portfolio_db_backup.sql...");
      const sqlFile = path.join(__dirname, "portfolio_db_backup.sql");
      if (fs.existsSync(sqlFile)) {
        const sql = fs.readFileSync(sqlFile, "utf8");
        db.query(sql, (err2) => {
          if (err2) {
            console.error("❌ Failed to initialize database:", err2);
          } else {
            console.log("✅ Database initialized successfully with all tables and data!");
          }
        });
      }
    } else {
      console.log("✅ Database tables are active and ready.");
    }
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  // Run auto-init
  setTimeout(initDatabase, 1500);
});