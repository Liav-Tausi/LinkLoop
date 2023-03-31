import { useContext, useEffect, useState } from "react";
import { Box, Paper, Stack, useMediaQuery } from "@mui/material";
import LogButtons from "./logButtons/LogButtons";
import {
  AppContext,
  AppDispatchContext,
  IsSmallScreenContext,
  Ref,
} from "../../../App/AppStates/AppReducer";
import Display from "./DisplaySettings/Display";
import DisplaySettings from "./DisplaySettings/DisplaySettings";
import MenuIcon from "./MenuIcon";

const Menu = () => {
  const { themeMode, accessToken, menuOpen } = useContext(AppContext);
  const dispatch = useContext(AppDispatchContext);
  const isSmallScreen = useContext(IsSmallScreenContext);
  const [menuDisplaySettings, setMenuDisplaySettings] = useState(false);
  const ref = useContext(Ref);

  const handleMenuDisplaySettingsChange = () => {
    setMenuDisplaySettings(!menuDisplaySettings);
  };

  useEffect(() => {
    console.log("menu refresh");
  }, []);

  useEffect(() => {
    if (!menuOpen) {
      setMenuDisplaySettings(false);
    }
  }, [!menuOpen]);

  return (
    <>
      <Box
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
          {isSmallScreen && !menuDisplaySettings && (
            <Stack>
              <LogButtons />
            </Stack>
          )}
          {!menuDisplaySettings && (
            <Display
              handleMenuDisplaySettingsChange={handleMenuDisplaySettingsChange}
            />
          )}
          {menuDisplaySettings && (
            <DisplaySettings
              handleMenuDisplaySettingsChange={handleMenuDisplaySettingsChange}
            />
          )}
        </Paper>
      )}
    </>
  );
};

export default Menu;
