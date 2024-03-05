import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";

const root = ReactDOM.createRoot(document.getElementById("my-app"));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
