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
import SignInFieldGroup from "./SignInFieldGroup";

const SignIn = () => {
  const { themeMode } = useContext(AppContext);
  const isSmallScreen = useContext(IsSmallScreenContext);
  const dispatch = useContext(AppDispatchContext);
  const ref = useContext(Ref);

  useEffect(() => {
    console.log("sign in refresh");
  }, []);

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
        id={"signIn"}
        sx={{
          borderRadius: "25px",
          backgroundColor: themeMode.signUp,
          zIndex: 9999,
          position: "fixed",
          left: "50%",
          top: "47%",
          height: 680,
          width: 490,
          transform: "translate(-50%, -50%)",
          boxShadow: 10,
          "@media (max-width: 414px)": {
            height: 400,
            width: 280,
          },
          "@media (max-width: 428px)": {
            height: 600,
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
          <SignInFieldGroup />
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
          don't have an account?
          <Box
            onClick={() => {
              dispatch({
                type: APP_ACTIONS.SIGN_UP_OPEN,
              });
            }}
            sx={{
              ml: 1,
              color: themeMode.appTheme,
              "&:hover": { cursor: "pointer" },
            }}
          >
            sign up
          </Box>
        </Box>
      </Paper>
    </div>
  );
};

export default SignIn;
