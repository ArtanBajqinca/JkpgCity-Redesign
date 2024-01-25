// External Module Imports
const express = require("express");
const sqlite3 = require("sqlite3").verbose();

// Internal Module Imports
const ModelClass = require("./model.js");
const routes = require("./routes.js");
const companyJson = require("./companies.json");

// Initialization
const app = express();
const db = new sqlite3.Database("./mydb.sqlite3");
let Model = new ModelClass();

// Middleware
app.use(express.json()); // Middleware for parsing JSON

// Routes
app.get("/setup", async (req, res) => {
  try {
    await Model.setup(companyJson);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/", async (req, res) => {
  try {
    const companies = await Model.getAllCompanies();
    res.json(companies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.use("/", routes); // Routing methods

// Server Initialization
const startServer = async () => {
  try {
    await Model.init();
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}!`);
    });
  } catch (error) {
    console.error("Failed to start the server:", error);
  }
};

startServer();
