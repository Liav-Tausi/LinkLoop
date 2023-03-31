import { Alert, Box, IconButton } from "@mui/material";
import { useContext, useState } from "react";
import {
  AppContext,
  AppDispatchContext,
  APP_ACTIONS,
  IsSmallScreenContext,
} from "../../../../../App/AppStates/AppReducer";
import {
  BadgeRounded,
  LockRounded,
  EmailRounded,
  VisibilityOffRounded,
  VisibilityRounded,
} from "@mui/icons-material";
import SignSubmit from "../SignSubmit";
import {
  validateConfirmPassword,
  validateEmail,
  validateFullName,
  validatePassword,
} from "../formValidators";
import { signUpUser } from "../../../../../utils/funcs";
import SignFieldTemp from "../SignFieldTemp";
import SignErrorTemp from "../SignErrorTemp";
import SignGoogleTemp from "../SignGoogleTemp";

const SignUpFieldGroup = () => {
  const { themeMode, accessToken } = useContext(AppContext);
  const dispatch = useContext(AppDispatchContext);
  const isSmallScreen = useContext(IsSmallScreenContext);

  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpFullName, setSignUpFullName] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signUpConfirmPassword, setSignUpConfirmPassword] = useState("");

  const [emailError, setEmailError] = useState(false);
  const [fullNameError, setFullNameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordConfirmError, setPasswordConfirmError] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [formSubmit, setFormSubmit] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormSubmit(true);
    if (fullNameError || passwordError || passwordConfirmError || emailError) {
      <Alert severity="error" sx={{ mb: 2 }}>
        Please correct the errors in the form before submitting again.
      </Alert>;
    } else {
      if (!accessToken) {
        const form = event.target;
        const elements = form.elements;
        const access = await signUpUser(elements);
        if (!Array.isArray(access)) {
          dispatch({
            type: APP_ACTIONS.ACCESS_TOKEN,
            payload: access,
          });
        } else {
          for (let index = 0; index < access.length; index++) {
            const element = access[index];
            if (element.includes("This field must be unique.")) {
              setSubmitError("already taken.");
              setEmailError(true);
            } else if (element.includes("This password is too common.")) {
              setSubmitError("too common.");
              setPasswordError(true);
            } else if (element.includes("This password is entirely numeric.")) {
              setSubmitError("entirely numeric.");
              setPasswordError(true);
            }
          }
        }
      }
    }
  };

  const handleEmailChange = (event) => {
    setEmailError(!validateEmail(event.target.value));
    setSignUpEmail(event.target.value);
  };

  const handleFullNameChange = (event) => {
    setFullNameError(!validateFullName(event.target.value));
    setSignUpFullName(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPasswordError(validatePassword(event.target.value));
    setSignUpPassword(event.target.value);
  };

  const handlePasswordConfirmChange = (event) => {
    setPasswordConfirmError(
      validateConfirmPassword(event.target.value, signUpPassword)
    );
    setSignUpConfirmPassword(event.target.value);
  };

  return (
    <>
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
            pb: 1,
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
            sign up
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
                <SignErrorTemp
                  text={submitError ? submitError : "Invalid Email"}
                  top={"32.9%"}
                  mobileTop={"28.2%"}
                />
              )}
              <SignFieldTemp
                type={"text"}
                placeholder={"Full Name"}
                error={fullNameError}
                sign={signUpFullName}
                handleChange={handleFullNameChange}
              >
                <BadgeRounded sx={{ color: themeMode.textColor, pr: 1 }} />
              </SignFieldTemp>
              {fullNameError && formSubmit && (
                <SignErrorTemp
                  text={submitError ? submitError : "Invalid Full Name"}
                  top={"42.7%"}
                  mobileTop={"39.2%"}
                />
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
                  text={
                    submitError ? submitError : "must be at least 8 characters"
                  }
                  top={"52.4%"}
                  mobileTop={"50.2%"}
                />
              )}
              <SignFieldTemp
                type={"password"}
                placeholder={"Confirm Password"}
                error={passwordConfirmError}
                sign={signUpConfirmPassword}
                handleChange={handlePasswordConfirmChange}
              >
                <LockRounded sx={{ color: themeMode.textColor, pr: 1 }} />
              </SignFieldTemp>
              {passwordConfirmError && formSubmit && (
                <SignErrorTemp
                  text={"passwords must be equal"}
                  top={"62%"}
                  mobileTop={"61.2%"}
                />
              )}
              <SignGoogleTemp text={"Sign up using Google"} />
            </Box>
            <SignSubmit />
          </form>
        </Box>
      </Box>
    </>
  );
};

export default SignUpFieldGroup;
