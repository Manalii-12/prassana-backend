require("dotenv").config();

const express = require("express");
const cors = require("cors");

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

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});