const express = require("express");
const router = express.Router();
const db = require("../config/db");

// ===============================
// GET Contact Section Data
// ===============================
router.get("/", (req, res) => {
  const sql = "SELECT * FROM contact_details ORDER BY id DESC LIMIT 1";

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching contact details:", err);
      return res.status(500).json({ error: "Failed to fetch contact details" });
    }

    if (results.length > 0) {
      res.json(results[0]);
    } else {
      res.json({
        heading: "CONTACT",
        subheading: "DIRECTOR & CINEMATOGRAPHER",
        location: "Navi Mumbai, Maharashtra, India (Working Worldwide)",
        email: "prasannaoffcials@gmail.com",
        whatsapp: "",
        whatsapp_message: "Hi Prasanna, I would like to discuss a film/production project with you.",
        instagram: "https://instagram.com/your_username",
        youtube: "https://youtube.com/@your_channel",
        linkedin: "https://linkedin.com/in/your_profile",
        social_heading: "SOCIAL MEDIA",
        social_description: "Follow my journey. Behind the scenes, Short Films, Commercial Shoots & Photography.",
        instagram_button_text: "Follow on Instagram →",
        instagram_button_url: "https://instagram.com/your_username",
        image1: "/images/commercial.jpg",
        image2: "/images/about.jpg",
        image3: "/images/hero.png",
        image4: "/images/commercial.jpg",
        image5: "/images/about.jpg",
        image6: "/images/hero.png",
      });
    }
  });
});

// ===============================
// UPDATE / SAVE Contact Section Data
// ===============================
router.post("/", (req, res) => {
  const {
    heading,
    subheading,
    location,
    email,
    whatsapp,
    whatsapp_message,
    instagram,
    youtube,
    linkedin,
    social_heading,
    social_description,
    instagram_button_text,
    instagram_button_url,
    image1,
    image2,
    image3,
    image4,
    image5,
    image6,
  } = req.body;

  db.query("SELECT id FROM contact_details LIMIT 1", (err, rows) => {
    if (err) {
      console.error("Database error in contact check:", err);
      return res.status(500).json({ success: false, message: "Database query failed" });
    }

    if (rows.length > 0) {
      // UPDATE existing row
      const targetId = rows[0].id;
      const updateSql = `
        UPDATE contact_details
        SET
          heading = ?,
          subheading = ?,
          location = ?,
          email = ?,
          whatsapp = ?,
          whatsapp_message = ?,
          instagram = ?,
          youtube = ?,
          linkedin = ?,
          social_heading = ?,
          social_description = ?,
          instagram_button_text = ?,
          instagram_button_url = ?,
          image1 = ?,
          image2 = ?,
          image3 = ?,
          image4 = ?,
          image5 = ?,
          image6 = ?,
          updated_at = NOW()
        WHERE id = ?
      `;

      db.query(
        updateSql,
        [
          heading !== undefined ? heading : "CONTACT",
          subheading !== undefined ? subheading : "DIRECTOR & CINEMATOGRAPHER",
          location !== undefined ? location : "",
          email !== undefined ? email : "",
          whatsapp !== undefined ? whatsapp : "",
          whatsapp_message !== undefined ? whatsapp_message : "",
          instagram !== undefined ? instagram : "",
          youtube !== undefined ? youtube : "",
          linkedin !== undefined ? linkedin : "",
          social_heading !== undefined ? social_heading : "SOCIAL MEDIA",
          social_description !== undefined ? social_description : "",
          instagram_button_text !== undefined ? instagram_button_text : "Follow on Instagram →",
          instagram_button_url !== undefined ? instagram_button_url : "",
          image1 !== undefined ? image1 : "/images/commercial.jpg",
          image2 !== undefined ? image2 : "/images/about.jpg",
          image3 !== undefined ? image3 : "/images/hero.png",
          image4 !== undefined ? image4 : "/images/commercial.jpg",
          image5 !== undefined ? image5 : "/images/about.jpg",
          image6 !== undefined ? image6 : "/images/hero.png",
          targetId,
        ],
        (updateErr) => {
          if (updateErr) {
            console.error("Update error:", updateErr);
            return res.status(500).json({ success: false, message: "Failed to update contact details" });
          }
          res.json({ success: true, message: "Contact details updated successfully!" });
        }
      );
    } else {
      // INSERT new row
      const insertSql = `
        INSERT INTO contact_details (
          heading,
          subheading,
          location,
          email,
          whatsapp,
          whatsapp_message,
          instagram,
          youtube,
          linkedin,
          social_heading,
          social_description,
          instagram_button_text,
          instagram_button_url,
          image1,
          image2,
          image3,
          image4,
          image5,
          image6
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      db.query(
        insertSql,
        [
          heading || "CONTACT",
          subheading || "DIRECTOR & CINEMATOGRAPHER",
          location || "",
          email || "",
          whatsapp || "",
          whatsapp_message || "",
          instagram || "",
          youtube || "",
          linkedin || "",
          social_heading || "SOCIAL MEDIA",
          social_description || "",
          instagram_button_text || "Follow on Instagram →",
          instagram_button_url || "",
          image1 || "/images/commercial.jpg",
          image2 || "/images/about.jpg",
          image3 || "/images/hero.png",
          image4 || "/images/commercial.jpg",
          image5 || "/images/about.jpg",
          image6 || "/images/hero.png",
        ],
        (insertErr) => {
          if (insertErr) {
            console.error("Insert error:", insertErr);
            return res.status(500).json({ success: false, message: "Failed to create contact details" });
          }
          res.json({ success: true, message: "Contact details created successfully!" });
        }
      );
    }
  });
});

module.exports = router;
