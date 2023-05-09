import { GoogleLogin } from "@react-oauth/google";
import { Box } from "@mui/material";
import { signUpWithGoogle } from "../../../../utils/funcs/authFuncs";
import { useContext } from "react";
import { APP_ACTIONS, AppDispatchContext } from "../../../../App/AppStates/AppReducer";

const SignGoogleTemp = (props) => {
  const dispatch = useContext(AppDispatchContext);

  const responseMessage = async (response) => {
    props.handleSetLoading(true);
    const access = await signUpWithGoogle(response.credential);
    if (!Array.isArray(access)) {
      props.handleSetLoading(false)
        dispatch({
          type: APP_ACTIONS.ACCESS_TOKEN,
          payload: access,
        });
        dispatch({
          type: APP_ACTIONS.SIGN_IN_OPEN,
        });
        dispatch({
          type: APP_ACTIONS.MESSAGE,
          payload: "Welcome to linkLoop!",
        });
    } else {
       props.handleSetLoading(false);
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <GoogleLogin
        onSuccess={responseMessage}
      />
    </Box>
  );
};

export default SignGoogleTemp;
