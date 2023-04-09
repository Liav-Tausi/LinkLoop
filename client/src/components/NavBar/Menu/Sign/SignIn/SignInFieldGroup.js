import {
  EmailRounded,
  VisibilityOffRounded,
  VisibilityRounded,
} from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import { useContext, useState } from "react";
import {
  AppContext,
  AppDispatchContext,
  APP_ACTIONS,
  IsSmallScreenContext,
} from "../../../../../App/AppStates/AppReducer";
import SignSubmit from "../SignSubmit";
import { validateEmail, validatePassword } from "../formValidators";
import SignFieldTemp from "../SignFieldTemp";
import SignErrorTemp from "../SignErrorTemp";
import SignGoogleTemp from "../SignGoogleTemp";
import { signInUser } from "../../../../../utils/funcs/authFuncs";

const SignInFieldGroup = () => {
  const { themeMode, accessToken } = useContext(AppContext);
  const dispatch = useContext(AppDispatchContext);
  const isSmallScreen = useContext(IsSmallScreenContext);

  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formSubmit, setFormSubmit] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormSubmit(true);
    if (passwordError || emailError) {
      dispatch({
        type: APP_ACTIONS.MESSAGE,
        payload:
          "Please correct the errors in the form before submitting again.",
      });
    } else {
      if (!accessToken) {
        const form = event.target;
        const elements = form.elements;
        const access = await signInUser(elements);
        if (access) {
          dispatch({
            type: APP_ACTIONS.ACCESS_TOKEN,
            payload: access,
          });
          dispatch({
            type: APP_ACTIONS.SIGN_IN_OPEN,
          });
          dispatch({
            type: APP_ACTIONS.MESSAGE,
            payload: "Welcome back to linkLoop!",
          });
        } else {
          dispatch({
            type: APP_ACTIONS.MESSAGE,
            payload: "Sorry, we couldn't find this account",
          });
          setFormSubmit(false);
          setEmailError(true);
          setPasswordError(true);
        }
      }
    }
  };

  const handleEmailChange = (event) => {
    setEmailError(!validateEmail(event.target.value));
    setSignUpEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPasswordError(validatePassword(event.target.value));
    setSignUpPassword(event.target.value);
  };

  return (
    <Box
      sx={{
        width: 317.5,
        mt: 2,
        p: 1,
        pb: 2,
        borderRadius: "25px",
        backgroundColor: themeMode.signUpBubbles,
        "@media (max-width: 600px)": {
          width: 285,
          pt: 0,
          pb: 1.5,
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          color: themeMode.textColor,
        }}
      >
        <Box sx={{ p: "10px", fontSize: isSmallScreen ? "18px" : "20px" }}>
          sign in
        </Box>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <form onSubmit={handleSubmit}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              pt: 1,
              pb: 2,
              width: 280,
              color: themeMode.textColor,
              "@media (max-width: 600px)": {
                width: 270,
                pt: "8px",
                pb: "16px",
              },
            }}
          >
            <SignFieldTemp
              type={"email"}
              placeholder={"Email"}
              error={emailError}
              sign={signUpEmail}
              handleChange={handleEmailChange}
            >
              <EmailRounded sx={{ color: themeMode.textColor, pr: 1 }} />
            </SignFieldTemp>
            {emailError && formSubmit && (
              <SignErrorTemp text={"Invalid Email"} top={"29.5%"} />
            )}
            <SignFieldTemp
              type={showPassword ? "text" : "password"}
              placeholder={"Password"}
              error={passwordError}
              sign={signUpPassword}
              handleChange={handlePasswordChange}
            >
              <IconButton
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
              >
                {showPassword ? (
                  <VisibilityRounded sx={{ color: themeMode.textColor }} />
                ) : (
                  <VisibilityOffRounded sx={{ color: themeMode.textColor }} />
                )}
              </IconButton>
            </SignFieldTemp>
            {passwordError && formSubmit && (
              <SignErrorTemp
                text={"must be at least 8 characters"}
                top={"39.7%"}
              />
            )}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  width: "38%",
                  height: "0.5px",
                  backgroundColor: themeMode.textColor,
                }}
              />
              <Box sx={{ px: 1, fontSize: 13 }}>or</Box>
              <Box
                sx={{
                  width: "38%",
                  height: "0.5px",
                  backgroundColor: themeMode.textColor,
                }}
              />
            </Box>
            <SignGoogleTemp text={"Sign in using Google"} />
          </Box>
          <SignSubmit />
        </form>
      </Box>
    </Box>
  );
};

export default SignInFieldGroup;
