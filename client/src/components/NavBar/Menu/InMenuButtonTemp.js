import { Box, Button } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useContext } from "react";
import {
  AppContext,
  AppDispatchContext,
} from "../../../App/AppStates/AppReducer";

const InMenuButtonTemp = (props) => {
  const { themeMode } = useContext(AppContext);
  const isSmallScreen = useContext(AppDispatchContext);

  return (
    <>
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
              fontSize: isSmallScreen ? "11.5px" : "15px",
              color: themeMode.textColor,
            }}
          >
            {props.children}
            <p
              style={{
                paddingLeft: 10,
                fontSize: isSmallScreen ? "11px" : "35px",
              }}
            >
              {props.text}
            </p>
          </Box>
          <ArrowForwardIosIcon
            sx={{
              color: themeMode.textColor,
              fontSize: isSmallScreen ? "13px" : "17px",
            }}
          />
        </Button>
      </Box>
    </>
  );
};

export default InMenuButtonTemp;
