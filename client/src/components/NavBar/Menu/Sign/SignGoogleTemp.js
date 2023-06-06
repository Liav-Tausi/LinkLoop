import { Box, Button } from "@mui/material";
import { useContext } from "react";
import {
  APP_ACTIONS,
  AppContext,
  AppDispatchContext,
  IsSmallScreenContext,
} from "../../../../App/AppStates/AppReducer";
import GoogleIcon from "@mui/icons-material/Google";
import { URL } from "../../../../utils/config/conf";

const SignGoogleTemp = () => {
  const { themeMode } = useContext(AppContext);
  const isSmallScreen = useContext(IsSmallScreenContext);
  const dispatch = useContext(AppDispatchContext);

  const handleSSLProblem = () => {
    console.log(URL);
    if (URL == "http://ec2-18-212-171-140.compute-1.amazonaws.com/") {
      dispatch({
        type: APP_ACTIONS.MESSAGE,
        payload:
          "ERROR! Currently, this site does not have an SSL certificate.",
      });
    }
  };

  return (
    <Button
      disableRipple={true}
      onClick={() => handleSSLProblem}
      sx={{
        border: `solid 1px ${themeMode.buttonBorder}`,
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: themeMode.feed,
        color: themeMode.signUpFieldText,
        borderRadius: "40px",
        "&:hover": {
          backgroundColor: themeMode.signUpFieldHover,
          boxShadow: "none",
        },
        "&:active": {
          transform: "scale(0.98)",
        },
        boxShadow: "none",
        px: "10px",
      }}
    >
      <Box
        style={{
          paddingLeft: 10,
          fontSize: isSmallScreen ? "14px" : "16px",
          textTransform: "none",
        }}
      >
        Sign In With Google
      </Box>
      <GoogleIcon
        sx={{
          m: 1,
          color: themeMode.signUpFieldText,
          fontSize: "22px",
        }}
      />
    </Button>
  );
};

export default SignGoogleTemp;
