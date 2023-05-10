import Title from "./Title";
import { Box, Container, Stack } from "@mui/material";
import {
  AppContext,
  AppDispatchContext,
  APP_ACTIONS,
  IsSmallScreenContext,
} from "../../../../App/AppStates/AppReducer";
import { useContext, useEffect } from "react";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import PrecisionManufacturingRoundedIcon from "@mui/icons-material/PrecisionManufacturingRounded";
import DARK_THEME from "../../../../assets/themes/DarkTheme";
import LIGHT_THEME from "../../../../assets/themes/LightTheme";
import DisplayOptions from "./DisplayOptions";
import { detectColorScheme } from "../../../../utils/funcs/confFuncs";

const DisplaySettings = ({ handleMenuDisplaySettingsChange }) => {
  const dispatch = useContext(AppDispatchContext);
  const { themeMode, forceThemeMode, menuOpen } = useContext(AppContext);
  const isSmallScreen = useContext(IsSmallScreenContext);

  const handleRadioButton = (event) => {
    event.preventDefault();
    dispatch({
      type: APP_ACTIONS.FORCE_THEME_MODE,
      payload: Number(event.target.value),
    });
  };

  const handleButtonClick = (val) => {
    dispatch({
      type: APP_ACTIONS.FORCE_THEME_MODE,
      payload: val,
    });
  };

  useEffect(() => {
    dispatch({
      type: APP_ACTIONS.THEME_MODE,
      payload:
        forceThemeMode === 1
          ? LIGHT_THEME
          : forceThemeMode === 2
          ? DARK_THEME
          : detectColorScheme() === "dark"
          ? DARK_THEME
          : LIGHT_THEME,
    });
    localStorage.setItem("preferredTheme", forceThemeMode);
  }, [forceThemeMode]);

  return (
    <Box>
      <Title
        handleMenuDisplaySettingsChange={handleMenuDisplaySettingsChange}
      />
      <Container sx={{ px: isSmallScreen ? 0 : 1 }}>
        <Stack
          aria-label="display"
          name="theme"
          defaultValue="Individual"
          gap={1}
        >
          <DisplayOptions
            handleButtonClick={handleButtonClick}
            handleRadioButton={handleRadioButton}
            value={1}
            text={"Light"}
          >
            <LightModeIcon
              sx={{
                color: themeMode.textColor,
                fontSize: isSmallScreen ? 19 : 20,
              }}
            />
          </DisplayOptions>
          <DisplayOptions
            handleButtonClick={handleButtonClick}
            handleRadioButton={handleRadioButton}
            value={2}
            text={"Dark"}
          >
            <DarkModeIcon
              sx={{
                color: themeMode.textColor,
                fontSize: isSmallScreen ? 19 : 20,
              }}
            />
          </DisplayOptions>
          <DisplayOptions
            handleButtonClick={handleButtonClick}
            handleRadioButton={handleRadioButton}
            value={3}
            text={"Auto"}
          >
            <PrecisionManufacturingRoundedIcon
              sx={{
                color: themeMode.textColor,
                fontSize: isSmallScreen ? 19 : 20,
              }}
            />
          </DisplayOptions>
        </Stack>
      </Container>
    </Box>
  );
};

export default DisplaySettings;
