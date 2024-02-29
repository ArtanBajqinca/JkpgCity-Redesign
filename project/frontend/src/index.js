import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";

const root = ReactDOM.createRoot(document.getElementById("my-app"));

fetch("http://localhost:3001/")
  .then((response) => response.json())
  .then((companies) => console.log(companies))
  .catch((error) => console.error("Error:", error));

// fetch("http://localhost:3001/districts")
//   .then((response) => response.json())
//   .then((district) => console.log(district))
//   .catch((error) => console.error("Error:", error));

// const response = await fetch("http://localhost:3001/districts");
// const districts = await response.json();
// console.log(districts);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
