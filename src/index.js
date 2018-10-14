import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import Provider from "./store/provider";
import App from "./components/App";

const app = document.getElementById("app");
ReactDOM.render(
  <Provider>
    <Router>
      <App />
    </Router>
  </Provider>,
  app
);
