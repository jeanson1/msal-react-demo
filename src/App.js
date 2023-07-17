// Microsoft 365 & Power Platform Community
// https://www.youtube.com/watch?v=7oPSL5wWeS0
// Using MSAL.js to integrate React Single-page applications with Azure Active Directory – July 2022
// github.com/derisen/msal-react-demo
// https://github.com/AzureAD/microsoft-authentication-library-for-js

import Grid from "@mui/material/Grid";
import { PageLayout } from "./components/PageLayout";
import { Routes, Route } from "react-router-dom";

import { Home } from "./pages/Home";
import { Profile } from "./pages/Profile";

import { MsalProvider } from "@azure/msal-react";

function App({ msalInstance }) {
  return (
    <MsalProvider instance={msalInstance}>
      <PageLayout>
        <Grid container justifyContent="center">
          <Pages />
        </Grid>
      </PageLayout>
    </MsalProvider>
  );
}

const Pages = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
};

export default App;
