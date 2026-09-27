const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("❌ MySQL Connection Failed:", err);
    process.exit(1);
  }
  console.log("✅ Connected to MySQL");

  db.query("DROP TABLE IF EXISTS contact_details", (errDrop) => {
    if (errDrop) console.error("Error dropping contact_details:", errDrop);

    const createContactSql = `
      CREATE TABLE contact_details (
        id INT AUTO_INCREMENT PRIMARY KEY,
        heading VARCHAR(255) DEFAULT 'CONTACT',
        subheading VARCHAR(255) DEFAULT 'DIRECTOR & CINEMATOGRAPHER',
        location VARCHAR(255) DEFAULT 'Navi Mumbai, Maharashtra, India (Working Worldwide)',
        email VARCHAR(255) DEFAULT 'prasannaoffcials@gmail.com',
        whatsapp VARCHAR(50) DEFAULT '+919876543210',
        whatsapp_message TEXT,
        instagram VARCHAR(255) DEFAULT 'https://instagram.com/your_username',
        youtube VARCHAR(255) DEFAULT 'https://youtube.com/@your_channel',
        linkedin VARCHAR(255) DEFAULT 'https://linkedin.com/in/your_profile',
        social_heading VARCHAR(255) DEFAULT 'SOCIAL MEDIA',
        social_description TEXT,
        instagram_button_text VARCHAR(255) DEFAULT 'Follow on Instagram →',
        instagram_button_url VARCHAR(500) DEFAULT 'https://instagram.com/your_username',
        image1 VARCHAR(500) DEFAULT '/images/commercial.jpg',
        image2 VARCHAR(500) DEFAULT '/images/about.jpg',
        image3 VARCHAR(500) DEFAULT '/images/hero.png',
        image4 VARCHAR(500) DEFAULT '/images/commercial.jpg',
        image5 VARCHAR(500) DEFAULT '/images/about.jpg',
        image6 VARCHAR(500) DEFAULT '/images/hero.png',
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `;

    db.query(createContactSql, (errCreate) => {
      if (errCreate) {
        console.error("Error creating contact_details table:", errCreate);
        db.end();
        process.exit(1);
      }

      console.log("✅ contact_details table created successfully");

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
          "CONTACT",
          "DIRECTOR & CINEMATOGRAPHER",
          "Navi Mumbai, Maharashtra, India (Working Worldwide)",
          "prasannaoffcials@gmail.com",
          "+919876543210",
          "Hi Prasanna, I would like to discuss a film/production project with you.",
          "https://instagram.com/your_username",
          "https://youtube.com/@your_channel",
          "https://linkedin.com/in/your_profile",
          "SOCIAL MEDIA",
          "Follow my journey. Behind the scenes, Short Films, Commercial Shoots & Photography.",
          "Follow on Instagram →",
          "https://instagram.com/your_username",
          "/images/commercial.jpg",
          "/images/about.jpg",
          "/images/hero.png",
          "/images/commercial.jpg",
          "/images/about.jpg",
          "/images/hero.png",
        ],
        (seedErr) => {
          if (seedErr) {
            console.error("Error seeding contact_details:", seedErr);
          } else {
            console.log("✅ contact_details seeded with initial configuration");
          }
          db.end();
        }
      );
    });
  });
});
