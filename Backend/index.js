// External Module Imports
const express = require("express");
require("dotenv").config();
const path = require('path');

// Internal Module Imports
const Model = require("./model.js");
const routes = require("./routes.js");
const companyJson = require("./companies.json");
const cookieParser = require("cookie-parser");

// Initialization
const app = express();

app.use(cookieParser());

// Middleware
app.use(express.json());

// Routes
app.use("/", routes);


// Server Initialization
const startServer = async () => {
  try {
    await Model.init();
    await Model.setupDatabase(companyJson);

    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
      console.log();
      console.log(`Server listening on port ${PORT}!`);
    });
  } catch (error) {
    console.error("Failed to start the server:", error);
  }
};

startServer();
