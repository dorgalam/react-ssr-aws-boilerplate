import React from "react";
import { hydrate } from "react-dom";
import App from "./App"; // can also work as import App from '~/client/App';


hydrate(
  <App/>,
  document.getElementById("root")
);
