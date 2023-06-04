import { Box, Button, Radio } from "@mui/material";
import { useContext } from "react";
import {
  AppContext,
  IsSmallScreenContext,
} from "../../../../App/AppStates/AppReducer";


const DisplayOptions = (props) => {
  const { themeMode, forceThemeMode } = useContext(AppContext);
  const isSmallScreen = useContext(IsSmallScreenContext);

  return (
    <Button
      disableRipple={true}
      onClick={() => props.handleButtonClick(props.value)}
      sx={{
        py: isSmallScreen ? 1 : 1.5,
        display: "flex",
        justifyContent: "space-between",
        "&:hover": { backgroundColor: themeMode.navInputColor },
        "&:active": {
          backgroundColor: themeMode.navInputColorHover,
          transition: "background-color 0.25s",
        },
      }}
    >
      <Box display={"flex"} alignItems={"center"}>
        {props.children}
        <Box
          sx={{
            pl: 2,
            color: themeMode.textColor,
            fontSize: isSmallScreen ? 13 : 14,
          }}
        >
          {props.text}
        </Box>
      </Box>

      <Radio
        sx={{
          color: themeMode.textColor,
          p: 0,
          "&.Mui-checked": {
            color: themeMode.appTheme,
          },
        }}
        checked={forceThemeMode === props.value ? true : false}
        onChange={(e) => props.handleRadioButton(e)}
        value={props.value}
        name="radio-buttons"
      />
    </Button>
  );
};

export default DisplayOptions;
