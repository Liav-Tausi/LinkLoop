import { Button } from "@mui/material";
import { Box } from "@mui/material";
import { useContext } from "react";
import { AppContext } from "../../../../../App/AppStates/AppReducer";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const InMenuTemp = (props) => {
  const { themeMode } = useContext(AppContext);
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Button
        onClick={props.func}
        fullWidth
        disableRipple={true}
        variant="contained"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: themeMode.navColor + "!important",
          color: themeMode.textColor,
          boxShadow: "none",
          "&:hover": {
            backgroundColor: themeMode.navInputColorHover + "!important",
            boxShadow: "none",
          },
          "&:active": {
            transform: "scale(0.98)",
          },
          "@media (max-width: 600px)": {
            px: "8px",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "12px",
            color: themeMode.textColor,
            "@media (max-width: 600px)": {
              fontSize: "9px",
            },
          }}
        >
          {props.children}
          <p style={{ paddingLeft: 10 }}>{props.text}</p>
        </Box>
        <ArrowForwardIosIcon
          sx={{
            color: themeMode.textColor,
            fontSize: "17px",
            "@media (max-width: 600px)": {
              fontSize: "12px",
            },
          }}
        />
      </Button>
    </Box>
  );
};

export default InMenuTemp;
