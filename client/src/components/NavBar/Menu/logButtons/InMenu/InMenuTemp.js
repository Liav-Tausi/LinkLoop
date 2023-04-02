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
        fullWidth
        onClick={props.func}
        variant="contained"
        disableRipple={true}
        sx={{
          display: "flex",
          justifyContent: "space-between",
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
            backgroundColor: themeMode.navColor,
            px: "8px",
          },
          fontSize: "9px",
          boxShadow: "none",
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
