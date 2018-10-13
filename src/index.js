import React from "react";
import ReactDOM from "react-dom";
import Provider from "./store/provider";
import App from "./components/App";

const app = document.getElementById("app");
ReactDOM.render(
  <Provider>
    <App />
  </Provider>,
  app
);
