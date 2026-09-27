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
// Get All Hero Banners (Ordered by order_index ASC, id ASC)
// ===============================
router.get("/", (req, res) => {
  const sql = `
    SELECT *
    FROM hero_section
    ORDER BY order_index ASC, id ASC
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching hero banners:", err);
      return res.status(500).json({ error: "Failed to fetch hero banners" });
    }

    res.json(result);
  });
});

// ===============================
// Reorder Hero Banners (Batch update order_index)
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
        "UPDATE hero_section SET order_index = ? WHERE id = ?",
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
        message: "Hero slides reordered successfully",
      });
    })
    .catch((err) => {
      console.error("Error reordering hero slides:", err);
      res.status(500).json({
        success: false,
        message: "Failed to reorder hero slides",
      });
    });
});

// ===============================
// Add New Hero Banner
// ===============================
router.post("/", (req, res) => {
  let { title, subtitle, description, background_image, video_url } = req.body;

  if (!background_image) {
    background_image = "/images/hero.png";
  }

  video_url = getEmbedUrl(video_url);

  const sql = `
    INSERT INTO hero_section
    (title, subtitle, description, background_image, video_url, order_index)
    VALUES (?, ?, ?, ?, ?, (SELECT COALESCE(MAX(hs.order_index), 0) + 1 FROM (SELECT order_index FROM hero_section) hs))
  `;

  db.query(
    sql,
    [
      title || "",
      subtitle || "",
      description || "",
      background_image || "/images/hero.png",
      video_url || "",
    ],
    (err, result) => {
      if (err) {
        console.error("Error adding hero banner:", err);
        return res.status(500).json({
          success: false,
          message: "Failed to add hero banner",
        });
      }

      res.json({
        success: true,
        message: "Hero Banner Added Successfully",
        id: result.insertId,
      });
    }
  );
});

// ===============================
// Update Hero Banner by ID
// ===============================
router.put("/:id", (req, res) => {
  const { id } = req.params;
  let { title, subtitle, description, background_image, video_url } = req.body;

  if (video_url) {
    video_url = getEmbedUrl(video_url);
  }

  const sql = `
    UPDATE hero_section
    SET
      title = ?,
      subtitle = ?,
      description = ?,
      background_image = ?,
      video_url = ?,
      updated_at = NOW()
    WHERE id = ?
  `;

  db.query(
    sql,
    [
      title || "",
      subtitle || "",
      description || "",
      background_image || "/images/hero.png",
      video_url || "",
      id,
    ],
    (err, result) => {
      if (err) {
        console.error("Error updating hero banner:", err);
        return res.status(500).json({
          success: false,
          message: "Failed to update hero banner",
        });
      }

      res.json({
        success: true,
        message: "Hero Banner updated successfully",
      });
    }
  );
});

// ===============================
// Delete Hero Banner
// ===============================
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM hero_section WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Error deleting hero banner:", err);
      return res.status(500).json({
        success: false,
        message: "Failed to delete hero banner",
      });
    }

    res.json({
      success: true,
      message: "Hero Banner deleted successfully",
    });
  });
});

module.exports = router;
