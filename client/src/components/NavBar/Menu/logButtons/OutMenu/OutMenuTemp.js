import { Box, Button } from "@mui/material";
import { useContext } from "react";
import { AppContext } from "../../../../../App/AppStates/AppReducer";


const OutMenuTemp = (props) => {
  const { themeMode } = useContext(AppContext);
  
  return (
    <Button
      onClick={props.func}
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
        px: 1.8,
        py: 0.7,
        boxShadow: "none",
      }}
    >
      <Box sx={{fontSize: "10.5px"}}>{props.text}</Box>
    </Button>
  );
};

export default OutMenuTemp;
