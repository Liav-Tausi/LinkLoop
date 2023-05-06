import { BrowserRouter } from "react-router-dom";
import { AppProvider } from "../AppStates/AppReducer";
import App from "../MainApp/App";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useEffect, useState } from "react";
import { getGoogleClientId } from "../../utils/funcs/mainFuncs";


const AppWrapper = () => {
  const [clientId, setClientId] = useState("");

  useEffect(() => {
    const getClientId = async () => {
      const response = await getGoogleClientId();
      if (response) {
        setClientId(response.data.client_id);
      }
    };
    getClientId();
  }, []);

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <BrowserRouter>
        <AppProvider>
          <App />
        </AppProvider>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
};

export default AppWrapper;
