const express = require("express");
const router = express.Router();
const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM admin_users WHERE email = ?",
    [email],
    async (err, result) => {
      if (err) return res.status(500).json(err);

      if (result.length === 0) {
        return res.status(401).json({
          message: "Invalid Email",
        });
      }

      const admin = result[0];

      const match = await bcrypt.compare(
        password,
        admin.password
      );

      if (!match) {
        return res.status(401).json({
          message: "Invalid Password",
        });
      }

      const token = jwt.sign(
        { id: admin.id },
        process.env.JWT_SECRET,
        {
          expiresIn: "7d",
        }
      );

      res.json({
        token,
      });
    }
  );
});

router.get("/verify", (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ valid: false, message: "No token provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ valid: false, message: "Invalid or expired token" });
    }
    res.json({ valid: true, adminId: decoded.id });
  });
});

module.exports = router;