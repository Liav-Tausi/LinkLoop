import { BrowserRouter } from "react-router-dom";
import { AppProvider } from "../AppStates/AppReducer";
import App from "../MainApp/App";
import { GoogleOAuthProvider } from "@react-oauth/google";


const AppWrapper = () => {
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID}>
      <BrowserRouter>
        <AppProvider>
          <App />
        </AppProvider>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
};

export default AppWrapper;
