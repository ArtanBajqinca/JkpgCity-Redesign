const express = require("express");
const router = express.Router();
const app = express();
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./mydb.sqlite3");
const routes = require("./routes.js");

// Middleware for parsing JSON
app.use(express.json());

// Routing methods
app.use("/", routes);

app.listen(3000, () => {
  console.log("Server is running at port 3000");
});

///////////////////////////////////////////////

// DATABASE

db.run(
  `CREATE TABLE IF NOT EXISTS stores (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    district TEXT NOT NULL,
    url TEXT NOT NULL
  )`,
  (err) => {
    if (err) {
      console.error("Error creating table:", err.message);
    } else {
      console.log("Table created successfully or already exists");

      // Insert an example store into the "stores" table
      const exampleStore = [
        "Example Store",
        "District X",
        "http://example.com/store",
      ];

      db.run(
        `INSERT INTO stores (name, district, url) VALUES (?, ?, ?)`,
        exampleStore,
        (err) => {
          if (err) {
            console.error("Error inserting data:", err.message);
          } else {
            console.log("Inserted data into the table");
          }
        }
      );
    }
  }
);
