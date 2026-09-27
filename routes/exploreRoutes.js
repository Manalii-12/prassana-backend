const express = require("express");
const router = express.Router();
const db = require("../config/db");

// ===============================
// Get Explore Section Settings
// ===============================
router.get("/", (req, res) => {
  const sql = "SELECT * FROM explore_section ORDER BY id DESC LIMIT 1";

  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching explore section:", err);
      return res.status(500).json({ error: "Failed to fetch explore section" });
    }

    if (result.length > 0) {
      res.json(result[0]);
    } else {
      res.json({
        heading: "Explore My Work",
        subheading: "Portfolio",
        commercial_title: "Commercial Projects",
        commercial_subtitle: "Brand Campaigns & Directed Films",
        commercial_image: "/images/commercial.jpg",
        personal_title: "Personal Projects",
        personal_subtitle: "Documentaries & Narrative Stories",
        personal_image: "/images/personal.jpg",
      });
    }
  });
});

// ===============================
// Update Explore Section Settings
// ===============================
router.post("/", (req, res) => {
  const {
    heading,
    subheading,
    commercial_title,
    commercial_subtitle,
    commercial_image,
    personal_title,
    personal_subtitle,
    personal_image,
  } = req.body;

  // Check if row exists
  db.query("SELECT id FROM explore_section LIMIT 1", (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: "Database error" });
    }

    if (rows.length === 0) {
      const insertSql = `
        INSERT INTO explore_section 
        (heading, subheading, commercial_title, commercial_subtitle, commercial_image, personal_title, personal_subtitle, personal_image)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `;
      db.query(
        insertSql,
        [
          heading || "Explore My Work",
          subheading || "Portfolio",
          commercial_title || "Commercial Projects",
          commercial_subtitle || "Brand Campaigns & Directed Films",
          commercial_image || "/images/commercial.jpg",
          personal_title || "Personal Projects",
          personal_subtitle || "Documentaries & Narrative Stories",
          personal_image || "/images/personal.jpg",
        ],
        (insertErr) => {
          if (insertErr) return res.status(500).json({ success: false, message: "Insert error" });
          res.json({ success: true, message: "Explore section saved successfully" });
        }
      );
    } else {
      const updateSql = `
        UPDATE explore_section SET
          heading = ?,
          subheading = ?,
          commercial_title = ?,
          commercial_subtitle = ?,
          commercial_image = ?,
          personal_title = ?,
          personal_subtitle = ?,
          personal_image = ?
        WHERE id = ?
      `;
      db.query(
        updateSql,
        [
          heading || "Explore My Work",
          subheading || "Portfolio",
          commercial_title || "Commercial Projects",
          commercial_subtitle || "Brand Campaigns & Directed Films",
          commercial_image || "/images/commercial.jpg",
          personal_title || "Personal Projects",
          personal_subtitle || "Documentaries & Narrative Stories",
          personal_image || "/images/personal.jpg",
          rows[0].id,
        ],
        (updateErr) => {
          if (updateErr) {
            console.error(updateErr);
            return res.status(500).json({ success: false, message: "Update error" });
          }
          res.json({ success: true, message: "Explore section updated successfully" });
        }
      );
    }
  });
});

module.exports = router;
