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

  db.query("DROP TABLE IF EXISTS about_section", (errDrop1) => {
    if (errDrop1) console.error("Error dropping about_section:", errDrop1);

    db.query("DROP TABLE IF EXISTS upcoming_events", (errDrop2) => {
      if (errDrop2) console.error("Error dropping upcoming_events:", errDrop2);

      const createAboutSql = `
        CREATE TABLE about_section (
          id INT AUTO_INCREMENT PRIMARY KEY,
          heading VARCHAR(255) DEFAULT 'ABOUT ME',
          subheading VARCHAR(255) DEFAULT 'DIRECTOR & CINEMATOGRAPHER',
          bio_p1 TEXT,
          bio_p2 TEXT,
          image_url VARCHAR(500) DEFAULT '/images/about.jpg',
          stat1_num VARCHAR(50) DEFAULT '10+',
          stat1_label VARCHAR(100) DEFAULT 'Years Experience',
          stat2_num VARCHAR(50) DEFAULT '50+',
          stat2_label VARCHAR(100) DEFAULT 'Directed Projects',
          stat3_num VARCHAR(50) DEFAULT '15+',
          stat3_label VARCHAR(100) DEFAULT 'Festival Screenings',
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
      `;

      const createEventsSql = `
        CREATE TABLE upcoming_events (
          id INT AUTO_INCREMENT PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          date VARCHAR(100) NOT NULL,
          location VARCHAR(255) NOT NULL,
          description TEXT,
          link_url VARCHAR(500),
          badge VARCHAR(100) DEFAULT 'PREMIERE',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `;

      db.query(createAboutSql, (errCreateAbout) => {
        if (errCreateAbout) {
          console.error("Error creating about_section table:", errCreateAbout);
        } else {
          console.log("✅ about_section table created cleanly");
          const insertAbout = `
            INSERT INTO about_section 
            (heading, subheading, bio_p1, bio_p2, image_url, stat1_num, stat1_label, stat2_num, stat2_label, stat3_num, stat3_label)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          `;
          db.query(
            insertAbout,
            [
              "ABOUT ME",
              "DIRECTOR & CINEMATOGRAPHER",
              "I have years of experience creating documentaries, commercials and films for TV & digital platforms. My work focuses on visual storytelling that connects with audiences through emotion and creativity.",
              "Every project is crafted with attention to detail, cinematic composition and meaningful narratives. Explore my portfolio below to discover a collection of selected films and creative productions.",
              "/images/about.jpg",
              "10+",
              "Years Experience",
              "50+",
              "Directed Projects",
              "15+",
              "Festival Screenings",
            ],
            (seedErr) => {
              if (seedErr) console.error("Error seeding about_section:", seedErr);
              else console.log("✅ about_section seeded with profile data");
            }
          );
        }

        db.query(createEventsSql, (errCreateEvents) => {
          if (errCreateEvents) {
            console.error("Error creating upcoming_events table:", errCreateEvents);
            db.end();
          } else {
            console.log("✅ upcoming_events table created cleanly");
            const insertEvent = `
              INSERT INTO upcoming_events (title, date, location, description, link_url, badge)
              VALUES (?, ?, ?, ?, ?, ?)
            `;
            db.query(
              insertEvent,
              [
                "GOA INTERNATIONAL FILM FESTIVAL",
                "12 December 2026",
                "Goa, India",
                "Premiere screening of the latest documentary.",
                "#",
                "PREMIERE",
              ],
              (seedErr) => {
                if (seedErr) console.error("Error seeding upcoming_events:", seedErr);
                else console.log("✅ upcoming_events seeded with sample festival event");
                db.end();
              }
            );
          }
        });
      });
    });
  });
});
