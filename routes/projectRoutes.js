const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Convert ANY YouTube URL to Embed URL
function getEmbedUrl(url) {
  if (!url) return "";
  url = String(url).trim();

  // If Instagram reel or post, keep URL untouched
  if (url.includes("instagram.com")) {
    return url;
  }

  // Already embed URL: extract 11-char ID cleanly
  if (url.includes("/embed/")) {
    const embedMatch = url.match(/\/embed\/([a-zA-Z0-9_-]{11})/);
    return embedMatch ? `https://www.youtube.com/embed/${embedMatch[1]}` : url;
  }

  // YouTube Shorts: youtube.com/shorts/xxxxx
  const shortsMatch = url.match(/\/shorts\/([a-zA-Z0-9_-]{11})/);
  if (shortsMatch) {
    return `https://www.youtube.com/embed/${shortsMatch[1]}`;
  }

  // Standard Watch: youtube.com/watch?v=xxxxx
  const watchMatch = url.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
  if (watchMatch) {
    return `https://www.youtube.com/embed/${watchMatch[1]}`;
  }

  // Short URL: youtu.be/xxxxx
  const shortMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
  if (shortMatch) {
    return `https://www.youtube.com/embed/${shortMatch[1]}`;
  }

  // Raw 11-character video ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(url)) {
    return `https://www.youtube.com/embed/${url}`;
  }

  return url;
}

// ===============================
// Get Commercial Projects (Ordered by order_index ASC, id ASC)
// ===============================
router.get("/commercial", (req, res) => {
  const sql = `
    SELECT *
    FROM projects
    WHERE type='commercial'
    ORDER BY order_index ASC, id ASC
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching commercial projects:", err);
      return res.status(500).json(err);
    }

    res.json(result);
  });
});

// ===============================
// Get Personal Projects (Ordered by order_index ASC, id ASC)
// ===============================
router.get("/personal", (req, res) => {
  const sql = `
    SELECT *
    FROM projects
    WHERE type='personal'
    ORDER BY order_index ASC, id ASC
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching personal projects:", err);
      return res.status(500).json(err);
    }

    res.json(result);
  });
});

// ===============================
// Reorder Projects (Batch update order_index)
// ===============================
router.put("/reorder", (req, res) => {
  let { items, orderedIds } = req.body;

  if (orderedIds && Array.isArray(orderedIds)) {
    items = orderedIds.map((id, index) => ({ id: Number(id), order_index: index + 1 }));
  }

  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ success: false, message: "Invalid items or orderedIds array" });
  }

  const queries = items.map((item) => {
    return new Promise((resolve, reject) => {
      db.query(
        "UPDATE projects SET order_index = ? WHERE id = ?",
        [item.order_index, item.id],
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });
  });

  Promise.all(queries)
    .then(() => {
      res.json({
        success: true,
        message: "Projects reordered successfully",
      });
    })
    .catch((err) => {
      console.error("Error reordering projects:", err);
      res.status(500).json({
        success: false,
        message: "Failed to reorder projects",
      });
    });
});

// ===============================
// Get All Projects (Ordered by order_index ASC, id ASC)
// ===============================
router.get("/", (req, res) => {
  const sql = `
    SELECT *
    FROM projects
    ORDER BY order_index ASC, id ASC
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching projects:", err);
      return res.status(500).json(err);
    }

    res.json(result);
  });
});

// ===============================
// Add Project
// ===============================
router.post("/", (req, res) => {
  let {
    type,
    title,
    category,
    youtube_url,
    cover_image,
    description,
    role,
    year,
  } = req.body;

  // Convert to embed URL automatically
  youtube_url = getEmbedUrl(youtube_url);

  const sql = `
    INSERT INTO projects
    (
      type,
      title,
      category,
      youtube_url,
      cover_image,
      description,
      role,
      year,
      order_index
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, (SELECT COALESCE(MAX(p.order_index), 0) + 1 FROM (SELECT order_index FROM projects) p))
  `;

  db.query(
    sql,
    [
      type,
      title,
      category,
      youtube_url,
      cover_image || null,
      description,
      role,
      year,
    ],
    (err, result) => {
      if (err) {
        console.error("Error adding project:", err);
        return res.status(500).json({
          success: false,
          message: "Failed to add project",
        });
      }

      res.json({
        success: true,
        message: "Project Added Successfully",
        id: result ? result.insertId : undefined,
      });
    }
  );
});

// ===============================
// Update Project
// ===============================
router.put("/:id", (req, res) => {
  const { id } = req.params;
  let {
    type,
    title,
    category,
    youtube_url,
    cover_image,
    description,
    role,
    year,
  } = req.body;

  // Convert to embed URL automatically if provided
  if (youtube_url) {
    youtube_url = getEmbedUrl(youtube_url);
  }

  const sql = `
    UPDATE projects
    SET
      type = ?,
      title = ?,
      category = ?,
      youtube_url = ?,
      cover_image = ?,
      description = ?,
      role = ?,
      year = ?,
      updated_at = NOW()
    WHERE id = ?
  `;

  db.query(
    sql,
    [
      type,
      title,
      category,
      youtube_url,
      cover_image && String(cover_image).trim() ? String(cover_image).trim() : null,
      description,
      role,
      year,
      id,
    ],
    (err, result) => {
      if (err) {
        console.error("Error updating project:", err);
        return res.status(500).json({
          success: false,
          message: "Failed to update project",
        });
      }

      res.json({
        success: true,
        message: "Project updated successfully",
      });
    }
  );
});

// ===============================
// Delete Project
// ===============================
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM projects WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Error deleting project:", err);
      return res.status(500).json({
        success: false,
        message: "Failed to delete project",
      });
    }

    res.json({
      success: true,
      message: "Project deleted successfully",
    });
  });
});

module.exports = router;