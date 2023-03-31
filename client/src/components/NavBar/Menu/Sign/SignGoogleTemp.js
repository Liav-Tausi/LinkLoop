import { Button, Box } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { useContext } from "react";
import { AppContext, IsSmallScreenContext } from "../../../../App/AppStates/AppReducer";

const SignGoogleTemp = (props) => {
  const { themeMode } = useContext(AppContext);
  const isSmallScreen = useContext(IsSmallScreenContext);
  return (
    <Button
      disableRipple={true}
      sx={{
        border: `solid 1px ${themeMode.buttonBorder}`,
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: themeMode.signUpField,
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
        {props.text}
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
}

export default SignGoogleTemp;