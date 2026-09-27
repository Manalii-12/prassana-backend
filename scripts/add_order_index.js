require("dotenv").config();
const db = require("../config/db");

async function runMigration() {
  db.query("SHOW COLUMNS FROM hero_section LIKE 'order_index'", (err, results) => {
    if (err) {
      console.error("Error checking hero_section column:", err);
      process.exit(1);
    }

    const addHeroCol = () => {
      if (results.length === 0) {
        db.query(
          "ALTER TABLE hero_section ADD COLUMN order_index INT NOT NULL DEFAULT 0",
          (err2) => {
            if (err2) console.error("Error adding order_index to hero_section:", err2);
            else {
              console.log("Added order_index to hero_section");
              // initialize with id
              db.query("UPDATE hero_section SET order_index = id", () => {});
            }
            checkProjects();
          }
        );
      } else {
        console.log("hero_section already has order_index");
        checkProjects();
      }
    };

    const checkProjects = () => {
      db.query("SHOW COLUMNS FROM projects LIKE 'order_index'", (err3, results3) => {
        if (err3) {
          console.error("Error checking projects column:", err3);
          process.exit(1);
        }

        if (results3.length === 0) {
          db.query(
            "ALTER TABLE projects ADD COLUMN order_index INT NOT NULL DEFAULT 0",
            (err4) => {
              if (err4) console.error("Error adding order_index to projects:", err4);
              else {
                console.log("Added order_index to projects");
                // initialize with id
                db.query("UPDATE projects SET order_index = id", () => {
                  console.log("Migration finished successfully");
                  process.exit(0);
                });
              }
            }
          );
        } else {
          console.log("projects already has order_index");
          process.exit(0);
        }
      });
    };

    addHeroCol();
  });
}

runMigration();
