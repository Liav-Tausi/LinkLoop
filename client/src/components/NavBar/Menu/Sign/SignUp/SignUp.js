import { Paper, Box } from "@mui/material";
import { useContext, useEffect } from "react";
import {
  AppContext,
  AppDispatchContext,
  APP_ACTIONS,
  IsSmallScreenContext,
  Ref,
} from "../../../../../App/AppStates/AppReducer";
import SignTitle from "../SignTitle";

import SignUpFieldGroup from "./SignUpFieldGroup";

const SignUp = () => {
  const { themeMode, signUpOpen } = useContext(AppContext);
  const dispatch = useContext(AppDispatchContext);
  const isSmallScreen = useContext(IsSmallScreenContext);
  const ref = useContext(Ref);

  useEffect(() => {
    console.log("sign up refresh");
  }, []);

  useEffect(() => {
    if (signUpOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [signUpOpen]);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        zIndex: 9998,
        backdropFilter: "blur(4px)",
        backgroundColor: "rgba(255, 255, 255, 0.1)",
      }}
    >
      <Paper
        ref={ref}
        id={"signUp"}
        sx={{
          mt: 1,
          borderRadius: "25px",
          backgroundColor: themeMode.signUp,
          zIndex: 9999,
          position: "fixed",
          left: "50%",
          top: "47%",
          height: 666,
          width: 440,
          transform: "translate(-50%, -50%)",
          boxShadow: 10,
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
          <SignUpFieldGroup />
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
          already have an account?
          <Box
            onClick={() => {
              dispatch({
                type: APP_ACTIONS.SIGN_IN_OPEN,
              });
            }}
            sx={{
              ml: 1,
              color: themeMode.appTheme,
              "&:hover": { cursor: "pointer" },
            }}
          >
            sign in
          </Box>
        </Box>
      </Paper>
    </div>
  );
};

export default SignUp;
