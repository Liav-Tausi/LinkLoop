import {
  EmailRounded,
  VisibilityOffRounded,
  VisibilityRounded,
} from "@mui/icons-material";
import { Alert, Box, IconButton } from "@mui/material";
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
import { signInUser } from "../../../../../utils/funcs";

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
      <Alert severity="error" sx={{ mb: 2 }}>
        Please correct the errors in the form before submitting again.
      </Alert>;
    } else {
      if (!accessToken) {
        const form = event.target;
        const elements = form.elements;
        dispatch({
          type: APP_ACTIONS.ACCESS_TOKEN,
          payload: await signInUser(elements),
        });
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
        width: 330,
        mt: 2,
        p: 1,
        pb: 2,
        borderRadius: "25px",
        backgroundColor: themeMode.signUpBubbles,
        "@media (max-width: 600px)": {
          width: 230,
          pt: 0,
          pb: 3,
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
        <Box sx={{ p: "12px", fontSize: isSmallScreen ? "15px" : "20px" }}>
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
              width: 265,
              color: themeMode.textColor,
              "@media (max-width: 600px)": {
                width: 220,
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
              <SignErrorTemp text={"Invalid Email"} top={"32.9%"} />
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
                top={"42.7%"}
              />
            )}
            <SignGoogleTemp text={"Sign in using Google"} />
          </Box>
          <SignSubmit />
        </form>
      </Box>
    </Box>
  );
};

export default SignInFieldGroup;
