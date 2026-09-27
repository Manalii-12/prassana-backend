require('dotenv').config();
const db = require('./config/db');

const sql = `
  CREATE TABLE IF NOT EXISTS explore_section (
    id INT PRIMARY KEY AUTO_INCREMENT,
    heading VARCHAR(255) DEFAULT 'Explore My Work',
    subheading VARCHAR(255) DEFAULT 'Portfolio',
    commercial_title VARCHAR(255) DEFAULT 'Commercial Projects',
    commercial_subtitle VARCHAR(255) DEFAULT 'Brand Campaigns & Directed Films',
    commercial_image VARCHAR(500) DEFAULT '/images/commercial.jpg',
    personal_title VARCHAR(255) DEFAULT 'Personal Projects',
    personal_subtitle VARCHAR(255) DEFAULT 'Documentaries & Narrative Stories',
    personal_image VARCHAR(500) DEFAULT '/images/personal.jpg',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  )
`;

db.query(sql, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log('explore_section table ready');
  db.query('SELECT COUNT(*) as count FROM explore_section', (e, r) => {
    if (r && r[0].count === 0) {
      db.query(
        `INSERT INTO explore_section (heading, subheading, commercial_title, commercial_subtitle, commercial_image, personal_title, personal_subtitle, personal_image) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          'Explore My Work',
          'Portfolio',
          'Commercial Projects',
          'Brand Campaigns & Directed Films',
          '/images/commercial.jpg',
          'Personal Projects',
          'Documentaries & Narrative Stories',
          '/images/personal.jpg',
        ],
        () => {
          console.log('Seeded explore_section default record');
          process.exit(0);
        }
      );
    } else {
      console.log('explore_section already has record');
      process.exit(0);
    }
  });
});
