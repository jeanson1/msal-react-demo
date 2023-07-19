import React from "react";
import ReactDOM from "react-dom/client";

import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./styles/theme";

import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { PublicClientApplication, EventType } from "@azure/msal-browser";

const pca = new PublicClientApplication({
  auth: {
    clientId: "a900769a-9f3f-4816-bd0b-b3c20da630d7",
    authority:
      "https://login.microsoftonline.com/6ca92191-baee-4ed3-abe4-0d8d6de60e70",
    redirectUri: "http://localhost:3000", // Your redirect URI
  },
  cache: {
    cacheLocation: 'sessionStorage',
    storeAuthStateInCookie: false,
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        console.log(message)
      },
      logLevel: "Info",
    }
  }
});

// on ajoute cet événement quand le user s'est correctement loggué
pca.addEventCallback((event) => {
  if (event.eventType === EventType.LOGIN_SUCCESS) {
    console.log(event);
    pca.setActiveAccount(event.payload.account);
  }
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <App msalInstance={pca} />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
