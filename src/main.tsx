import "@fontsource/roboto";
import { CssBaseline } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom";
import { Provider as StoreProvider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import App from "@app/App";
import { store } from "@app/store";
import "@app/styles/index.css";

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline />
    <BrowserRouter>
      <StoreProvider store={store}>
        <App />
      </StoreProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
