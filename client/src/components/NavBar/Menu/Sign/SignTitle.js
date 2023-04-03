import { Box } from "@mui/material";
import { useContext } from "react";
import {
  AppContext,
  IsSmallScreenContext,
} from "../../../../App/AppStates/AppReducer";
import AppLogo from "../../../../assets/imgs/AppLogo.svg";

const SignTitle = () => {
  const { themeMode } = useContext(AppContext);
  const isSmallScreen = useContext(IsSmallScreenContext);
  return (
    <Box
      sx={{
        mt: 2,
        py: 1,
        px: 2,
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
      <img
        style={{
          width: isSmallScreen ? "60px" : "80px",
          padding: isSmallScreen ? "3px" : "6px",
        }}
        src={AppLogo}
        alt="linkLoop logo, dancer with a suit-case"
      />
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
