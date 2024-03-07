const express = require("express");
const router = express.Router();
const Model = require("./model.js");
const companyJson = require("./companies.json");

// Get all companies
router.get("/companies", async (_req, res) => {
  try {
    const companies = await Model.getAllCompanies();
    res.json(companies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all unique districts
router.get("/districts", async (req, res) => {
  const uniqueDistricts = await Model.getAllDistricts();
  res.json(uniqueDistricts);
});

// Get all unique categories
router.get("/categories", async (req, res) => {
  const uniqueCategories = await Model.getAllCategories();
  res.json(uniqueCategories);
});


// Database Setup Route
router.get("/setup", async (req, res) => {
  try {
    console.log("Setting up database...");
    await Model.setupDatabase(companyJson);
    console.log("Database setup complete!");
    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
