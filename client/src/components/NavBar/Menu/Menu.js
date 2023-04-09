import { useContext, useEffect, useState } from "react";
import { Box, Paper, Stack } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LogButtons from "./logButtons/LogButtons";
import {
  AppContext,
  AppDispatchContext,
  APP_ACTIONS,
  IsSmallScreenContext,
  Ref,
} from "../../../App/AppStates/AppReducer";
import DisplaySettings from "./DisplaySettings/DisplaySettings";
import MenuIcon from "./MenuIcon";
import LogoutIcon from "@mui/icons-material/Logout";
import InMenuTemp from "./logButtons/InMenu/InMenuTemp";
import { logOut } from "../../../utils/funcs/authFuncs";

const Menu = () => {
  const { themeMode, accessToken, menuOpen } = useContext(AppContext);
  const dispatch = useContext(AppDispatchContext);
  const isSmallScreen = useContext(IsSmallScreenContext);
  const [menuDisplaySettings, setMenuDisplaySettings] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  const ref = useContext(Ref);

  const handleMenuDisplaySettingsChange = () => {
    setMenuDisplaySettings(!menuDisplaySettings);
  };

  const handleLogOut = async () => {
    const refreshToken = localStorage.getItem("refresh");
    if (refreshToken) {
      await logOut(refreshToken);
      dispatch({
        type: APP_ACTIONS.ACCESS_TOKEN,
        payload: "",
      });
      dispatch({
        type: APP_ACTIONS.MESSAGE,
        payload: "Logged Out Successfully!",
      });
    } else {
      dispatch({
        type: APP_ACTIONS.MESSAGE,
        payload: "ERROR! Did not Log Out Successfully!",
      });
    }
  };

  const isMenuClosed = !menuOpen;
  useEffect(() => {
    if (isMenuClosed) {
      setMenuDisplaySettings(false);
    }
  }, [isMenuClosed]);

  return (
    <>
      {showOverlay && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 999,
            backgroundColor: "transparent",
          }}
          onClick={() => setShowOverlay(false)}
        />
      )}
      <Box
        onClick={() => setShowOverlay(true)}
        sx={{
          position: "relative",
          gap: 1,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          "@media (max-width: 600px)": {
            px: 2,
          },
        }}
      >
        {!accessToken && !isSmallScreen && <LogButtons />}
        <MenuIcon />
      </Box>
      {menuOpen && (
        <Paper
          onClick={(event) => event.stopPropagation()}
          ref={ref}
          id={"menu"}
          sx={{
            backgroundColor: themeMode.navColor,
            p: 1,
            height: 355,
            width: 290,
            zIndex: 9999,
            position: "absolute",
            right: 22,
            top: 44,
            boxShadow: 6,
            "@media (max-width: 600px)": {
              right: 0,
              height: "100vh",
              width: "10em",
            },
          }}
        >
          <Stack>
            {isSmallScreen && !menuDisplaySettings && <LogButtons />}
          </Stack>

          {!menuDisplaySettings && (
            <InMenuTemp func={handleMenuDisplaySettingsChange} text={"Display"}>
              <DarkModeIcon
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
          )}

          {menuDisplaySettings && (
            <DisplaySettings
              handleMenuDisplaySettingsChange={handleMenuDisplaySettingsChange}
            />
          )}
          {accessToken && !menuDisplaySettings && (
            <InMenuTemp func={handleLogOut} text={"Log out"}>
              <LogoutIcon
                sx={{
                  m: 1,
                  color: themeMode.textColor,
                  fontSize: isSmallScreen ? "19px" : "20px",
                }}
              />
            </InMenuTemp>
          )}
        </Paper>
      )}
    </>
  );
};

export default Menu;
