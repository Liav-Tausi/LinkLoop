import Title from "./Title";
import {
  Box,
  Button,
  Container,
  Radio,
  Stack,
} from "@mui/material";
import {
  AppContext,
  AppDispatchContext,
  APP_ACTIONS,
} from "../../../../App/AppStates/AppReducer";
import { useContext, useEffect, useState } from "react";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import PrecisionManufacturingRoundedIcon from "@mui/icons-material/PrecisionManufacturingRounded";
import DARK_THEME from "../../../../assets/themes/DarkTheme";
import LIGHT_THEME from "../../../../assets/themes/LightTheme";
import { detectColorScheme } from "../../../../utils/funcs";

const DisplaySettings = ({ handleMenuDisplaySettingsChange }) => {
  const dispatch = useContext(AppDispatchContext);
  const { themeMode, forceThemeMode } = useContext(AppContext);

  useEffect(() => {
    console.log("display setting refresh");
  }, []);

  const handleRadioButton = (event) => {
    event.preventDefault();
    dispatch({
      type: APP_ACTIONS.FORCE_THEME_MODE,
      payload: Number(event.target.value)
    })
  };

  const handleButtonClick = (val) => {
    dispatch({
      type: APP_ACTIONS.FORCE_THEME_MODE,
      payload: val
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
  }, [forceThemeMode]);

  return (
    <Box>
      <Title
        handleMenuDisplaySettingsChange={handleMenuDisplaySettingsChange}
      />
      <Container>
        <Stack aria-label="display" name="theme" defaultValue="Individual">
          <Button
            disableRipple={true}
            onClick={() => handleButtonClick(1)}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              "&:hover": { backgroundColor: themeMode.navInputColor },
              "&:active": {
                backgroundColor: themeMode.navInputColorHover,
                transition: "background-color 0.25s",
              },
            }}
          >
            <Box display={"flex"}>
              <LightModeIcon sx={{ color: themeMode.textColor }} />
              <Box pl={2} color={themeMode.textColor}>
                Light
              </Box>
            </Box>

            <Radio
              sx={{
                fontSize: 25,
                color: themeMode.textColor,
                "&.Mui-checked": {
                  color: themeMode.appTheme,
                },
              }}
              checked={forceThemeMode === 1 ? true : false}
              onChange={(e) => handleRadioButton(e)}
              value={1}
              name="radio-buttons"
            />
          </Button>
          <Button
            disableRipple={true}
            onClick={() => handleButtonClick(2)}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              "&:hover": { backgroundColor: themeMode.navInputColor },
              "&:active": {
                backgroundColor: themeMode.navInputColorHover,
                transition: "background-color 0.25s",
              },
            }}
          >
            <Box display={"flex"}>
              <DarkModeIcon sx={{ color: themeMode.textColor }} />
              <Box pl={2} color={themeMode.textColor}>
                Dark
              </Box>
            </Box>

            <Radio
              sx={{
                fontSize: 25,
                color: themeMode.textColor,
                "&.Mui-checked": {
                  color: themeMode.appTheme,
                },
              }}
              checked={forceThemeMode === 2 ? true : false}
              onChange={(e) => handleRadioButton(e)}
              value={2}
              name="radio-buttons"
            />
          </Button>
          <Button
            disableRipple={true}
            onClick={() => handleButtonClick(3)}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              "&:hover": { backgroundColor: themeMode.navInputColor },
              "&:active": {
                backgroundColor: themeMode.navInputColorHover,
                transition: "background-color 0.25s",
              },
            }}
          >
            <Box display={"flex"}>
              <PrecisionManufacturingRoundedIcon
                sx={{ color: themeMode.textColor }}
              />
              <Box pl={2} color={themeMode.textColor}>
                Auto
              </Box>
            </Box>

            <Radio
              sx={{
                fontSize: 25,
                color: themeMode.textColor,
                "&.Mui-checked": {
                  color: themeMode.appTheme,
                },
              }}
              checked={forceThemeMode === 3 ? true : false}
              onChange={(e) => handleRadioButton(e)}
              value={3}
              name="radio-buttons"
            />
          </Button>
        </Stack>
      </Container>
    </Box>
  );
};

export default DisplaySettings;
