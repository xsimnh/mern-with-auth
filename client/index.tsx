import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import "./index.less";
import Router from "./Router";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <HashRouter>
    <Router />
  </HashRouter>
);
