import { Box, Button } from "@mui/material";
import BookIcon from "@mui/icons-material/Book";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import LoginIcon from "@mui/icons-material/Login";
import { useContext } from "react";
import {
  AppContext,
  AppDispatchContext,
  APP_ACTIONS,
} from "../../../../App/AppStates/AppReducer";

const InMenu = () => {
  const { themeMode } = useContext(AppContext);
  const dispatch = useContext(AppDispatchContext);

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button
          fullWidth
          onClick={() => {
            dispatch({
              type: APP_ACTIONS.SIGN_IN_OPEN,
            });
          }}
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
            <LoginIcon
              sx={{
                m: 1,
                color: themeMode.textColor,
                fontSize: "20px",
                "@media (max-width: 600px)": {
                  fontSize: "17px",
                },
              }}
            />
            <p style={{ paddingLeft: 10 }}>Sign in</p>
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
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button
          fullWidth
          onClick={() => {
            dispatch({
              type: APP_ACTIONS.SIGN_UP_OPEN,
            });
          }}
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
            <BookIcon
              sx={{
                m: 1,
                color: themeMode.textColor,
                fontSize: "20px",
                "@media (max-width: 600px)": {
                  fontSize: "17px",
                },
              }}
            />
            <p style={{ paddingLeft: 10 }}>Sign up</p>
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

export default InMenu;
