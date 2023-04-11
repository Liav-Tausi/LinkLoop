import BookIcon from "@mui/icons-material/Book";
import LoginIcon from "@mui/icons-material/Login";
import { useContext, useEffect } from "react";
import {
  AppContext,
  AppDispatchContext,
  APP_ACTIONS,
} from "../../../../../App/AppStates/AppReducer";
import InMenuTemp from "./InMenuTemp";

const InMenu = () => {
  const { themeMode } = useContext(AppContext);
  const dispatch = useContext(AppDispatchContext);

  useEffect(() => {
    console.log("InMenu refresh");
  }, []);
  

  return (
    <>
      <InMenuTemp
        text={"Sign in"}
        func={() => dispatch({ type: APP_ACTIONS.SIGN_IN_OPEN })}
      >
        <LoginIcon
          sx={{
            m: 1,
            color: themeMode.textColor,
            fontSize: "20px",
            "@media (max-width: 600px)": {
              fontSize: "17px",
            },
          }}
        />
      </InMenuTemp>

      <InMenuTemp
        text={"Sign up"}
        func={() => dispatch({ type: APP_ACTIONS.SIGN_UP_OPEN })}
      >
        <BookIcon
          sx={{
            m: 1,
            color: themeMode.textColor,
            fontSize: "20px",
            "@media (max-width: 600px)": {
              fontSize: "17px",
            },
          }}
        />
      </InMenuTemp>
    </>
  );
};

export default InMenu;
