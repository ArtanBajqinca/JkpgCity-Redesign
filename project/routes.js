const express = require("express");
const router = express.Router();
const Model = require("./model.js");
const companyJson = require("./companies.json");

router.get("/", async (req, res) => {
  try {
    const companies = await Model.getAllCompanies();
    res.json(companies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/districts', async (req, res) => {
  const uniqueDistricts = await Model.getAllDistricts();
  res.json(uniqueDistricts);
});

router.get("/setup", async (req, res) => {
  try {
    console.log();
    console.log("Setting up database...");
    console.log();

    await Model.setupDatabase(companyJson);
    console.log("Database setup complete!");
    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

router.get("/company/:id", async (req, res) => {
  try {
    const company = await Model.getCompany(req.params.id);
    if (company) {
      res.json(company);
    } else {
      res.status(404).json({ message: "Company not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/login", (req, res) => {
  const { username, password } = req.query;
  if (username === "admin" && password === "password") {
    res.cookie("token", "super-secret-cookie", { httpOnly: true });
    res.status(200).send({ message: "Login successful" });
  } else {
    res.status(401).send({ message: "Invalid username or password" });
  }
});

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.status(200).send({ message: "Logout successful" });
});

router.get("/check-user-status", async (req, res) => {
  const { token } = req.cookies;
  if (token === "super-secret-cookie") {
    res.send("User is logged in");
  } else {
    res.send("User is not logged in");
  }
});

module.exports = router;
