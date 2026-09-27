const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const db = require("../config/db");

// Auto-create uploaded_media table if missing
db.query(
  `CREATE TABLE IF NOT EXISTS uploaded_media (
    id INT AUTO_INCREMENT PRIMARY KEY,
    filename VARCHAR(255),
    mimetype VARCHAR(100),
    data MEDIUMBLOB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`,
  (err) => {
    if (err) console.error("uploaded_media table init warning:", err.message);
  }
);

// Memory storage keeps file buffer in RAM so it can be stored directly in TiDB/MySQL
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 15 * 1024 * 1024 }, // 15MB limit
});

// Helper to determine public base URL
function getBaseUrl(req) {
  if (process.env.BASE_URL) return process.env.BASE_URL.replace(/\/$/, "");
  const host = req.get("host") || "localhost:5000";
  const isLocal = host.includes("localhost") || host.includes("127.0.0.1");
  const protocol = isLocal ? "http" : "https";
  return `${protocol}://${host}`;
}

// POST /api/upload - Stores image permanently in MySQL / TiDB Cloud
router.post("/", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: "No image file uploaded" });
  }

  const { originalname, mimetype, buffer } = req.file;

  db.query(
    "INSERT INTO uploaded_media (filename, mimetype, data) VALUES (?, ?, ?)",
    [originalname, mimetype, buffer],
    (err, result) => {
      if (err) {
        console.error("❌ Failed to store uploaded image in database:", err);
        return res.status(500).json({ success: false, message: "Database storage failed" });
      }

      const baseUrl = getBaseUrl(req);
      const fileUrl = `${baseUrl}/api/upload/media/${result.insertId}`;

      console.log(`✅ Image permanently stored in database [ID: ${result.insertId}] -> ${fileUrl}`);

      res.json({
        success: true,
        message: "Image uploaded and stored permanently!",
        id: result.insertId,
        url: fileUrl,
      });
    }
  );
});

// GET /api/upload/media/:id - Serves permanently stored image from MySQL
router.get("/media/:id", (req, res) => {
  const { id } = req.params;

  db.query(
    "SELECT mimetype, data FROM uploaded_media WHERE id = ?",
    [id],
    (err, rows) => {
      if (err || !rows || rows.length === 0 || !rows[0].data) {
        return res.status(404).send("Image not found");
      }

      const media = rows[0];
      res.setHeader("Content-Type", media.mimetype || "image/jpeg");
      // Global CDN and browser cache for 1 year (immutable content)
      res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
      res.send(media.data);
    }
  );
});

module.exports = router;
