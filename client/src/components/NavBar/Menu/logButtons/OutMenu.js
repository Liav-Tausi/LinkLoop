import { Button } from "@mui/material";
import { useContext } from "react";
import {
  AppContext,
  AppDispatchContext,
  APP_ACTIONS,
} from "../../../../App/AppStates/AppReducer";

const OutMenu = () => {
  const { themeMode } = useContext(AppContext);
  const dispatch = useContext(AppDispatchContext);

  return (
    <>
      <Button
        onClick={() => {
          dispatch({
            type: APP_ACTIONS.SIGN_UP_OPEN,
          });
        }}
        variant="contained"
        disableRipple={true}
        sx={{
          color: themeMode.textColor,
          backgroundColor: themeMode.navInputColor,
          borderRadius: "40px",
          "&:hover": {
            backgroundColor: themeMode.navInputColorHover,
            boxShadow: "none",
          },
          "&:active": {
            transform: "scale(0.98)",
          },
          "@media (max-width: 600px)": {
            borderRadius: 1,
          },
          fontSize: "10px",
          boxShadow: "none",
        }}
      >
        Sign up
      </Button>
      <Button
        onClick={() => {
          dispatch({
            type: APP_ACTIONS.SIGN_IN_OPEN,
          });
        }}
        disableRipple={true}
        variant="contained"
        sx={{
          color: themeMode.textColor,
          backgroundColor: themeMode.navInputColor,
          borderRadius: "40px",
          "&:hover": {
            backgroundColor: themeMode.navInputColorHover,
            boxShadow: "none",
          },
          "&:active": {
            transform: "scale(0.98)",
          },
          "@media (max-width: 600px)": {
            borderRadius: 1,
            backgroundColor: themeMode.navInputColor,
          },
          fontSize: "10px",
          boxShadow: "none",
        }}
      >
        Sign in
      </Button>
    </>
  );
};

export default OutMenu;
