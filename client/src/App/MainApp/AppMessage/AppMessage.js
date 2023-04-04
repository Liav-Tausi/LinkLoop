import { useState, useEffect } from "react";
import { Alert } from "@mui/material";
import { useContext } from "react";
import {
  AppContext,
  AppDispatchContext,
  APP_ACTIONS,
  IsSmallScreenContext,
} from "../../AppStates/AppReducer";
import "./AppMessage.css";

const AppMessage = () => {
  const { message, themeMode } = useContext(AppContext);
  const dispatch = useContext(AppDispatchContext);
  const [displayMessage, setDisplayMessage] = useState(message);

  useEffect(() => {
    setDisplayMessage(message);
    if (message) {
      const timer = setTimeout(() => {
        dispatch({
          type: APP_ACTIONS.MESSAGE,
          payload: null,
        });
        setDisplayMessage(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleCloseMessage = () => {
    dispatch({
      type: APP_ACTIONS.MESSAGE,
      payload: null,
    });
    setDisplayMessage(null);
  };

  const handleMessage = () => {
    if (!displayMessage) {
      return false;
    } else if (
      ["Sorry,", "ERROR!", "Please"].includes(displayMessage.split(" ")[0])
    ) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <>
      {handleMessage() ? (
        <Alert
          className={"app-message"}
          sx={{
            backgroundColor: themeMode.SuccessMessage,
            color: "white",
            bottom: 0,
            right: 0,
            "& .MuiAlert-icon": {
              color: "white",
            },
          }}
          severity="success"
          onClose={handleCloseMessage}
        >
          {displayMessage}
        </Alert>
      ) : (
        <Alert
          className={"app-message"}
          sx={{
            backgroundColor: themeMode.ErrorMessage,
            bottom: 0,
            right: 0,
            color: "white",
            "& .MuiAlert-icon": {
              color: "white",
            },
          }}
          severity="error"
          onClose={handleCloseMessage}
        >
          {displayMessage}
        </Alert>
      )}
    </>
  );
};

export default AppMessage;
