import { Box, Button } from "@mui/material";
import { useContext } from "react";
import {
  AppContext,
  IsSmallScreenContext,
} from "../../../App/AppStates/AppReducer";

const ProfileShowButtonTemp = (props) => {
  const { themeMode } = useContext(AppContext);
  const isSmallScreen = useContext(IsSmallScreenContext);

  
  return (
    <Button
      disabled={props.disabled}
      disableRipple={true}
      onClick={props.func}
      sx={{
        fontWeight: "bold",
        fontFamily: "Montserrat",
        display: "flex",
        justifyContent: "center",
        backgroundColor: props.disabled
          ? themeMode.ProfileVideoInfoButtonDisabled
          : props.background,
        color: props.disabled ? themeMode.textColor : themeMode.textColor,
        borderRadius: "40px",
        "&:hover": {
          backgroundColor: props.backgroundHover,
          boxShadow: "none",
        },
        "&:active": {
          transform: "scale(0.98)",
        },
        boxShadow: "none",
        flex: 1,
        py: 1.1,
      }}
    >
      <Box
        style={{
          paddingLeft: 10,
          fontSize: isSmallScreen ? "12px" : "15px",
          textTransform: "none",
        }}
      >
        {props.text}
      </Box>
    </Button>
  );
};

export default ProfileShowButtonTemp;
