// Microsoft 365 & Power Platform Community
// https://www.youtube.com/watch?v=7oPSL5wWeS0
// Using MSAL.js to integrate React Single-page applications with Azure Active Directory – July 2022
// github.com/derisen/msal-react-demo
// https://github.com/AzureAD/microsoft-authentication-library-for-js

import Grid from "@mui/material/Grid";
import { PageLayout } from "./components/PageLayout";
import { Routes, Route } from "react-router-dom";

import { Home } from "./pages/Home";
import { ProfileData } from "./pages/ProfileData";

import { MsalProvider, useMsal, useIsAuthenticated } from "@azure/msal-react";
import { useEffect } from "react";

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
  const { instance } = useMsal() ;
  const isAuthenticated = useIsAuthenticated() ;

  useEffect(() => {
    if(!isAuthenticated ){
      instance.ssoSilent({
        scopes: ["user.read"],
        loginHint: ""
      }).then((response) => {
        instance.setActiveAccount(response.account) ;
      }).catch((error) => console.log(error))
    }
  },[])

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profileData" element={<ProfileData />} />
    </Routes>
  );
};

export default App;
