import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.less";
import Router from "./Router";

const container: HTMLElement = document.getElementById("root");
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <Router />
  </BrowserRouter>
);
