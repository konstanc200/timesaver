import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Draggable from "react-draggable";

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
    cursor: move;
  }
`;
document.body.appendChild(globalStyles);
document.body.appendChild(rootElement);

ReactDOM.render(
  <React.StrictMode>
    <Draggable
      bounds={{
        left: -window.innerWidth,
        top: -window.innerHeight,
        right: 0,
        bottom: 0,
      }}
    >
      <div id="react-chrome-app" style={{ lineHeight: "1.2" }}>
        <App />
      </div>
    </Draggable>
  </React.StrictMode>,
  rootElement
);
