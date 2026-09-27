const express = require("express");
const router = express.Router();
const db = require("../config/db");

// ===============================
// GET About Section Data
// ===============================
router.get("/", (req, res) => {
  const sql = "SELECT * FROM about_section ORDER BY id DESC LIMIT 1";

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching about section:", err);
      return res.status(500).json({ error: "Failed to fetch about section" });
    }

    if (results.length > 0) {
      res.json(results[0]);
    } else {
      res.json({
        heading: "ABOUT ME",
        subheading: "DIRECTOR & CINEMATOGRAPHER",
        bio_p1:
          "I have years of experience creating documentaries, commercials and films for TV & digital platforms. My work focuses on visual storytelling that connects with audiences through emotion and creativity.",
        bio_p2:
          "Every project is crafted with attention to detail, cinematic composition and meaningful narratives. Explore my portfolio below to discover a collection of selected films and creative productions.",
        image_url: "/images/about.jpg",
        stat1_num: "",
        stat1_label: "",
        stat2_num: "",
        stat2_label: "",
        stat3_num: "",
        stat3_label: "",
      });
    }
  });
});

// ===============================
// UPDATE / SAVE About Section Data
// ===============================
router.post("/", (req, res) => {
  const {
    heading,
    subheading,
    bio_p1,
    bio_p2,
    image_url,
    stat1_num,
    stat1_label,
    stat2_num,
    stat2_label,
    stat3_num,
    stat3_label,
  } = req.body;

  db.query("SELECT id FROM about_section LIMIT 1", (err, rows) => {
    if (err) {
      console.error("Database error in about check:", err);
      return res.status(500).json({ success: false, message: "Database query failed" });
    }

    if (rows.length === 0) {
      const insertSql = `
        INSERT INTO about_section 
        (heading, subheading, bio_p1, bio_p2, image_url, stat1_num, stat1_label, stat2_num, stat2_label, stat3_num, stat3_label)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      db.query(
        insertSql,
        [
          heading || "ABOUT ME",
          subheading || "DIRECTOR & CINEMATOGRAPHER",
          bio_p1 !== undefined ? bio_p1 : "",
          bio_p2 !== undefined ? bio_p2 : "",
          image_url || "/images/about.jpg",
          stat1_num !== undefined ? stat1_num : "",
          stat1_label !== undefined ? stat1_label : "",
          stat2_num !== undefined ? stat2_num : "",
          stat2_label !== undefined ? stat2_label : "",
          stat3_num !== undefined ? stat3_num : "",
          stat3_label !== undefined ? stat3_label : "",
        ],
        (insertErr) => {
          if (insertErr) {
            console.error("Error creating about section:", insertErr);
            return res.status(500).json({ success: false, message: "Insert error" });
          }
          res.json({ success: true, message: "About section created successfully" });
        }
      );
    } else {
      const updateSql = `
        UPDATE about_section SET
          heading = ?,
          subheading = ?,
          bio_p1 = ?,
          bio_p2 = ?,
          image_url = ?,
          stat1_num = ?,
          stat1_label = ?,
          stat2_num = ?,
          stat2_label = ?,
          stat3_num = ?,
          stat3_label = ?
        WHERE id = ?
      `;
      db.query(
        updateSql,
        [
          heading || "ABOUT ME",
          subheading || "DIRECTOR & CINEMATOGRAPHER",
          bio_p1 !== undefined ? bio_p1 : "",
          bio_p2 !== undefined ? bio_p2 : "",
          image_url || "/images/about.jpg",
          stat1_num !== undefined ? stat1_num : "",
          stat1_label !== undefined ? stat1_label : "",
          stat2_num !== undefined ? stat2_num : "",
          stat2_label !== undefined ? stat2_label : "",
          stat3_num !== undefined ? stat3_num : "",
          stat3_label !== undefined ? stat3_label : "",
          rows[0].id,
        ],
        (updateErr) => {
          if (updateErr) {
            console.error("Error updating about section:", updateErr);
            return res.status(500).json({ success: false, message: "Update error" });
          }
          res.json({ success: true, message: "About section updated successfully" });
        }
      );
    }
  });
});

module.exports = router;
