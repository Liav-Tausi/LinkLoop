import { BrowserRouter } from "react-router-dom";
import { AppProvider } from "../AppStates/AppReducer";
import App from "../MainApp/App";

const AppWrapper = () => {
  return (
    <BrowserRouter>
      <AppProvider>
        <App/>
      </AppProvider>
    </BrowserRouter>
  );
};

export default AppWrapper;
