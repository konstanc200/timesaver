import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

const rootElement = document.createElement("div");
rootElement.id = "react-chrome-app-container";

const globalStyles = document.createElement("style");
globalStyles.innerHTML = `
  #${rootElement.id} {
    all: unset;
    position: fixed;
    right: 0;
    bottom: 0;
    z-index: 99999999;
    margin: 0;
  }
`;
document.body.appendChild(globalStyles);
document.body.appendChild(rootElement);

ReactDOM.render(
  <React.StrictMode>
    <div id="react-chrome-app" style={{ lineHeight: "1.2" }}>
      <App />
    </div>
  </React.StrictMode>,
  rootElement
);
