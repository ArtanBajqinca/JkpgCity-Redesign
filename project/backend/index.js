// External Module Imports
const express = require("express");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
require("dotenv").config();

// Internal Module Imports
const Model = require("./model.js");
const routes = require("./routes.js");
const companyJson = require("./companies.json");

// Initialization
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/", routes);

// Server Initialization and Startup
const startServer = async () => {
  try {
    await Model.init();
    await Model.setupDatabase(companyJson);

    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}!`);
    });
  } catch (error) {
    console.error("Failed to start the server:", error);
  }
};

startServer();

// Miscellaneous
let p = __dirname + "/frontend/public";
console.log(p);
