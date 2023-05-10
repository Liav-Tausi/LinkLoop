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
import {
  validateEmail,
  validatePassword,
} from "../../../../../utils/funcs/formValidators";
import SignFieldTemp from "../SignFieldTemp";
import SignErrorTemp from "../SignErrorTemp";
import SignGoogleTemp from "../SignGoogleTemp";
import { signInUser } from "../../../../../utils/funcs/authFuncs";
import SignField from "../SignTemp/SignField";
import Loading from "../../../../../utils/Comps/Loading";

const SignInFieldGroup = () => {
  const { themeMode, accessToken } = useContext(AppContext);
  const dispatch = useContext(AppDispatchContext);
  const isSmallScreen = useContext(IsSmallScreenContext);
  const [showPassword, setShowPassword] = useState(false);
  const [formSubmit, setFormSubmit] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSetLoading = (flag) => {
    setLoading(flag);
  }

  const [signInData, setSignInData] = useState({
    signUpEmail: "",
    signUpPassword: "",
  });

  const [errors, setErrors] = useState({
    emailError: false,
    passwordError: false,
  });


  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setFormSubmit(true);
    if (errors.passwordError || errors.emailError) {
      setLoading(false);
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
          setLoading(false);
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
          setFormSubmit(false);
          setLoading(false);
          dispatch({
            type: APP_ACTIONS.MESSAGE,
            payload: "Sorry, we couldn't find this account",
          });
          setErrors((error) => ({ ...error, emailError: true }));
          setErrors((error) => ({ ...error, passwordError: true }));
        }
      }
    }
  };

  const handleEmailChange = (event) => {
    setErrors((error) => ({
      ...error,
      emailError: !validateEmail(event.target.value),
    }));
    setSignInData((data) => ({ ...data, signUpEmail: event.target.value }));
  };

  const handlePasswordChange = (event) => {
    setErrors((error) => ({
      ...error,
      passwordError: validatePassword(event.target.value),
    }));
    setSignInData((data) => ({ ...data, signUpPassword: event.target.value }));
  };

  return (
    <SignField>
      {loading && <Loading />}
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
              width: 305,
              color: themeMode.textColor,
              "@media (max-width: 600px)": {
                width: 280,
                pt: "8px",
                pb: "16px",
              },
            }}
          >
            <SignFieldTemp
              type={"email"}
              placeholder={"Email"}
              autocomplete={"username"}
              error={errors.emailError}
              sign={signInData.signUpEmail}
              handleChange={handleEmailChange}
              padding={"8px"}
              paddingL={"18px"}
              multiline={false}
              maxRows={1}
            >
              <EmailRounded sx={{ color: themeMode.textColor, pr: 1 }} />
            </SignFieldTemp>
            {errors.emailError && formSubmit && (
              <SignErrorTemp text={"Invalid Email"} top={"33.5%"} />
            )}
            <SignFieldTemp
              type={showPassword ? "text" : "password"}
              placeholder={"Password"}
              autocomplete={"current-password"}
              error={errors.passwordError}
              sign={signInData.signUpPassword}
              handleChange={handlePasswordChange}
              padding={"8px"}
              paddingL={"18px"}
              multiline={false}
              maxRows={1}
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
            {errors.passwordError && formSubmit && (
              <SignErrorTemp
                text={"must be at least 8 characters"}
                top={"43%"}
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
            <SignGoogleTemp handleSetLoading={(flag) => handleSetLoading(flag)} />
          </Box>
          <SignSubmit />
        </form>
      </Box>
    </SignField>
  );
};

export default SignInFieldGroup;
