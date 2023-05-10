import { Box, IconButton } from "@mui/material";
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
} from "../../../../../utils/funcs/formValidators";
import SignFieldTemp from "../SignFieldTemp";
import SignErrorTemp from "../SignErrorTemp";
import { signUpUser } from "../../../../../utils/funcs/authFuncs";
import SignField from "../SignTemp/SignField";
import Loading from "../../../../../utils/Comps/Loading";
import SignGoogleTemp from "../SignGoogleTemp";

const SignUpFieldGroup = () => {
  const { themeMode, accessToken } = useContext(AppContext);
  const dispatch = useContext(AppDispatchContext);
  const isSmallScreen = useContext(IsSmallScreenContext);
  const [showPassword, setShowPassword] = useState(false);
  const [formSubmit, setFormSubmit] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSetLoading = (flag) => {
    setLoading(flag);
  };

  const [signUpData, setSignUpData] = useState({
    signUpEmail: "",
    signUpFullName: "",
    signUpPassword: "",
    signUpConfirmPassword: "",
  });

  const [errors, setErrors] = useState({
    emailError: false,
    fullNameError: false,
    passwordError: false,
    passwordConfirmError: false,
    submitError: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setFormSubmit(true);
    if (
      errors.fullNameError ||
      errors.passwordError ||
      errors.passwordConfirmError ||
      errors.emailError
    ) {
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
        const access = await signUpUser(elements);
        if (!Array.isArray(access)) {
          setLoading(false);
          dispatch({
            type: APP_ACTIONS.ACCESS_TOKEN,
            payload: access,
          });
          dispatch({
            type: APP_ACTIONS.SIGN_UP_OPEN,
          });
          dispatch({
            type: APP_ACTIONS.MESSAGE,
            payload: "Welcome to linkLoop!",
          });
        } else {
          setLoading(false);
          for (let index = 0; index < access.length; index++) {
            const element = access[index];
            if (element.includes("This field must be unique.")) {
              setErrors((error) => ({
                ...error,
                submitError: "already taken.",
              }));
              setErrors((error) => ({ ...error, emailError: true }));
            } else if (element.includes("This password is too common.")) {
              setErrors((error) => ({ ...error, submitError: "too common." }));
              setErrors((error) => ({ ...error, passwordError: true }));
            } else if (element.includes("This password is entirely numeric.")) {
              setErrors((error) => ({
                ...error,
                submitError: "entirely numeric.",
              }));
              setErrors((error) => ({ ...error, passwordError: true }));
            }
          }
        }
      }
      setLoading(false);
    }
  };

  const handleEmailChange = (event) => {
    setErrors((error) => ({
      ...error,
      emailError: !validateEmail(event.target.value),
    }));
    setSignUpData((data) => ({ ...data, signUpEmail: event.target.value }));
  };

  const handleFullNameChange = (event) => {
    setErrors((error) => ({
      ...error,
      fullNameError: !validateFullName(event.target.value),
    }));
    setSignUpData((data) => ({ ...data, signUpFullName: event.target.value }));
  };

  const handlePasswordChange = (event) => {
    setErrors((error) => ({
      ...error,
      passwordError: validatePassword(event.target.value),
    }));
    setSignUpData((data) => ({ ...data, signUpPassword: event.target.value }));
  };

  const handlePasswordConfirmChange = (event) => {
    setErrors((error) => ({
      ...error,
      passwordConfirmError: validateConfirmPassword(
        event.target.value,
        signUpData.signUpPassword
      ),
    }));
    setSignUpData((data) => ({
      ...data,
      signUpConfirmPassword: event.target.value,
    }));
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
              pt: 1.5,
              pb: 2.5,
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
              sign={signUpData.signUpEmail}
              handleChange={handleEmailChange}
              padding={"8px"}
              paddingL={"18px"}
              multiline={false}
              maxRows={1}
            >
              <EmailRounded sx={{ color: themeMode.textColor, pr: 1 }} />
            </SignFieldTemp>
            {errors.emailError && formSubmit && (
              <SignErrorTemp
                text={errors.submitError ? errors.submitError : "Invalid Email"}
                top={"29.8%"}
                mobileTop={"28.2%"}
              />
            )}
            <SignFieldTemp
              type={"text"}
              placeholder={"Full Name"}
              autocomplete={"username"}
              error={errors.fullNameError}
              sign={signUpData.signUpFullName}
              handleChange={handleFullNameChange}
              padding={"8px"}
              paddingL={"18px"}
              multiline={false}
              maxRows={1}
            >
              <BadgeRounded sx={{ color: themeMode.textColor, pr: 1 }} />
            </SignFieldTemp>
            {errors.fullNameError && formSubmit && (
              <SignErrorTemp
                text={
                  errors.submitError ? errors.submitError : "Invalid Full Name"
                }
                top={"39.5%"}
                mobileTop={"39.2%"}
              />
            )}
            <SignFieldTemp
              type={showPassword ? "text" : "password"}
              placeholder={"Password"}
              autocomplete={"current-password"}
              error={errors.passwordError}
              sign={signUpData.signUpPassword}
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
                text={
                  errors.submitError
                    ? errors.submitError
                    : "must be at least 8 characters"
                }
                top={"49%"}
                mobileTop={"50.2%"}
              />
            )}
            <SignFieldTemp
              type={"password"}
              placeholder={"Confirm Password"}
              autocomplete={"current-password"}
              error={errors.passwordConfirmError}
              sign={signUpData.signUpConfirmPassword}
              handleChange={handlePasswordConfirmChange}
              padding={"8px"}
              paddingL={"18px"}
              multiline={false}
              maxRows={1}
            >
              <LockRounded sx={{ color: themeMode.textColor, pr: 1 }} />
            </SignFieldTemp>
            {errors.passwordConfirmError && formSubmit && (
              <SignErrorTemp
                text={"passwords must be equal"}
                top={"58.7%"}
                mobileTop={"61.2%"}
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
            <SignGoogleTemp
              handleSetLoading={(flag) => handleSetLoading(flag)}
            />
          </Box>
          <SignSubmit />
        </form>
      </Box>
    </SignField>
  );
};

export default SignUpFieldGroup;
