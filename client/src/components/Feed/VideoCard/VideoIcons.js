import { useContext } from "react";
import { Box } from "@mui/material";
import {
  AppContext,
  IsSmallScreenContext,
} from "../../../App/AppStates/AppReducer";

const VideoIcons = (props) => {
  const { themeMode } = useContext(AppContext);
  const isSmallScreen = useContext(IsSmallScreenContext);
  return (
    <Box
      sx={{
        boxShadow: 10,
        display: "flex",
        justifyContent: "center",
        px: 1,
        py: props.arrow ? 1 : 1.14,
        opacity: isSmallScreen ? 0.96 : 1,
        backgroundColor: themeMode.navInputColor,
        borderRadius: "50%",
        "&:hover": {
          backgroundColor: themeMode.navInputColorHover,
        },
        padding: "10px",
        position: "relative",
      }}
    >
      {props.children}
    </Box>
  );
};

export default VideoIcons;
