import React from "react";
import ReactDOM from "react-dom";
import App from "./containers/App";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <App
    colors={[
      "black", // black
      "#70d6ff", // Maya Blue
      "#ff70a6", // French Pink
      "#ff9770", // Pink Orange
      "#ffd670", // Orange Yellow
      "#e9ff70" // Unmellow Yellow
    ]}
    defaultColor="black"
  />,
  document.getElementById("root")
);

serviceWorker.register();
