import { useContext, useEffect } from "react";
import {
  AppContext,
  IsSmallScreenContext,
  Ref,
} from "../../../../../App/AppStates/AppReducer";
import SignTitle from "../SignTitle";
import { Box, Paper } from "@mui/material";
import "../SignTemp/SignTemp.css";

const SignTemp = (props) => {
  const { themeMode, signInOpen } = useContext(AppContext);
  const isSmallScreen = useContext(IsSmallScreenContext);
  const ref = useContext(Ref);

  useEffect(() => {
    console.log("sign up refresh");
  }, []);

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        zIndex: 9996,
        backdropFilter: signInOpen ? "blur(2.4px)" : "blur(5px)",
      }}
    >
      <Paper
        ref={ref}
        id={props.SignId}
        sx={{
          mt: 1,
          zIndex: 9999,
          borderRadius: "25px",
          backgroundColor: themeMode.sign,
          position: "fixed",
          left: "50%",
          top: "47%",
          height: 666,
          width: 440,
          transform: "translate(-50%, -50%)",
          "@media (max-width: 414px)": {
            height: 435,
            width: 280,
          },
          "@media (max-width: 428px)": {
            height: 650,
            width: 330,
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <SignTitle />
          {props.children}
        </Box>
        <Box
          sx={{
            pt: 2,
            display: "flex",
            justifyContent: "center",
            color: themeMode.textColor,
            fontSize: isSmallScreen ? "13px" : "16px",
          }}
        >
          {props.goToText}
          <Box
            onClick={props.func}
            sx={{
              ml: 1,
              color: themeMode.appTheme,
              "&:hover": { cursor: "pointer" },
            }}
          >
            {props.goToName}
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default SignTemp;
