import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

fetch("http://localhost:3001/company/1")
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
