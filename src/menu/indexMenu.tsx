import React from "react";
import ReactDOM from "react-dom/client";
import Menu from "./Menu";

const container = document.createElement("div");
document.body.appendChild(container);
const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <Menu />
  </React.StrictMode>
);
