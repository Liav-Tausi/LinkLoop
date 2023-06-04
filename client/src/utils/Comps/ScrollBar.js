import { Box } from "@mui/material";
import { useContext } from "react";
import { AppContext } from "../../App/AppStates/AppReducer";


const ScrollBar = (props) => {
  const { themeMode } = useContext(AppContext);
  return (
    <Box
      sx={{
        overflowY: "scroll",
        maxHeight: props.maxHeight,
        "&::-webkit-scrollbar": {
          borderRadius: "3px",
          width: "6px",
        },
        "&::-webkit-scrollbar-track": {
          borderRadius: "3px",
          background: themeMode.feed,
        },
        "&::-webkit-scrollbar-thumb": {
          background: themeMode.signUpBubbles,
          borderRadius: "3px",
        },
        "&::-webkit-scrollbar-thumb:hover": {
          background: themeMode.appTheme,
        },
      }}
    >
      {props.children}
    </Box>
  );
};

export default ScrollBar;
