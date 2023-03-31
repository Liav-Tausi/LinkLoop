import { Box, Button } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useContext, useEffect, useState } from "react";
import {
  AppContext,
  AppDispatchContext,
  APP_ACTIONS,
} from "../../../../App/AppStates/AppReducer";

const Display = ({ handleMenuDisplaySettingsChange }) => {
  const { themeMode } = useContext(AppContext);

  return (
    <>
      <Box
        onClick={handleMenuDisplaySettingsChange}
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <Button
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
            <DarkModeIcon
              sx={{
                m: 1,
                color: themeMode.textColor,
                fontSize: "20px",
                "@media (max-width: 600px)": {
                  fontSize: "17px",
                },
              }}
            />
            <p style={{ paddingLeft: 10 }}>Display</p>
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
    </>
  );
};

export default Display;
