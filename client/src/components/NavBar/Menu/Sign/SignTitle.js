import { Box } from "@mui/material";
import { useState, useContext, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import {
  AppContext,
  IsSmallScreenContext,
} from "../../../../App/AppStates/AppReducer";
import AppLogo from "../../../../assets/imgs/AppLogo.svg";

const SignTitle = () => {
  const { themeMode, signUpOpen } = useContext(AppContext);
  const isSmallScreen = useContext(IsSmallScreenContext);
  const [appLogoLoaded, setAppLogoLoaded] = useState(false);

  useEffect(() => {
    const appLogoFunc = () => {
      const img = new Image();
      img.src = AppLogo;
      img.onload = () => setAppLogoLoaded(true);
    };
    appLogoFunc();
  }, [AppLogo]);

  return (
    <Box
      sx={{
        mt: signUpOpen ? 1 : 5,
        py: 1,
        px: 2.4,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "27px",
        color: themeMode.textColor,
        backgroundColor: themeMode.signUpBubbles,
        "@media (max-width: 600px)": {
          borderRadius: "26px",
          py: "13px",
          px: 1.8,
        },
      }}
    >
      {!appLogoLoaded ? (
        <Box
          sx={{
            width: isSmallScreen ? "72px" : "80px",
            padding: isSmallScreen ? "3px" : "6px",
          }}
        >
          <CircularProgress
            thickness={2}
            size="4.8rem"
            sx={{ color: themeMode.appTheme }}
          />
        </Box>
      ) : (
        <img
          style={{
            width: isSmallScreen ? "72px" : "80px",
            padding: isSmallScreen ? "3px" : "6px",
            opacity: appLogoLoaded ? 1 : 0,
          }}
          src={AppLogo}
          alt="linkLoop logo, dancer with a suit-case"
        />
      )}
      <Box>
        <Box
          style={{
            margin: "0",
            fontSize: isSmallScreen ? "22px" : "25px",
            marginBottom: isSmallScreen ? "5px" : "10px",
          }}
        >
          LinkLoop
        </Box>
        <Box
          style={{
            margin: "0",
            fontSize: isSmallScreen ? "15px" : "16px",
          }}
        >
          find your next adventure
        </Box>
      </Box>
    </Box>
  );
};

export default SignTitle;
