const express = require("express");
const router = express.Router();
const db = require("../config/db");

// ===============================
// GET All Upcoming Events
// ===============================
router.get("/", (req, res) => {
  const sql = "SELECT * FROM upcoming_events ORDER BY id DESC";

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching events:", err);
      return res.status(500).json({ error: "Failed to fetch upcoming events" });
    }
    res.json(results || []);
  });
});

// ===============================
// ADD New Event
// ===============================
router.post("/", (req, res) => {
  const { title, date, location, description, link_url, badge } = req.body;

  if (!title || !title.trim()) {
    return res.status(400).json({ success: false, message: "Event title is required" });
  }

  const sql = `
    INSERT INTO upcoming_events (title, date, location, description, link_url, badge)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      title.trim(),
      date?.trim() || "Coming Soon",
      location?.trim() || "TBA",
      description?.trim() || "",
      link_url?.trim() || "",
      badge?.trim() || "UPCOMING",
    ],
    (err, result) => {
      if (err) {
        console.error("Error creating event:", err);
        return res.status(500).json({ success: false, message: "Database error creating event" });
      }
      res.json({
        success: true,
        message: "Upcoming event created successfully",
        id: result.insertId,
      });
    }
  );
});

// ===============================
// UPDATE Event
// ===============================
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { title, date, location, description, link_url, badge } = req.body;

  if (!title || !title.trim()) {
    return res.status(400).json({ success: false, message: "Event title is required" });
  }

  const sql = `
    UPDATE upcoming_events SET
      title = ?,
      date = ?,
      location = ?,
      description = ?,
      link_url = ?,
      badge = ?
    WHERE id = ?
  `;

  db.query(
    sql,
    [
      title.trim(),
      date?.trim() || "Coming Soon",
      location?.trim() || "TBA",
      description?.trim() || "",
      link_url?.trim() || "",
      badge?.trim() || "UPCOMING",
      id,
    ],
    (err) => {
      if (err) {
        console.error("Error updating event:", err);
        return res.status(500).json({ success: false, message: "Database error updating event" });
      }
      res.json({ success: true, message: "Upcoming event updated successfully" });
    }
  );
});

// ===============================
// DELETE Event
// ===============================
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM upcoming_events WHERE id = ?";

  db.query(sql, [id], (err) => {
    if (err) {
      console.error("Error deleting event:", err);
      return res.status(500).json({ success: false, message: "Database error deleting event" });
    }
    res.json({ success: true, message: "Upcoming event deleted successfully" });
  });
});

module.exports = router;
