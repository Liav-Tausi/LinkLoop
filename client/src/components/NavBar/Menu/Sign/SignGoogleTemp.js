import { GoogleLogin } from "@react-oauth/google";
import { Box } from "@mui/material";
import { useContext } from "react";
import { APP_ACTIONS, AppDispatchContext } from "../../../../App/AppStates/AppReducer";
import { signUpInWithGoogle } from "../../../../utils/funcs/authFuncs";


const SignGoogleTemp = (props) => {
  const dispatch = useContext(AppDispatchContext);

  const responseMessage = async (response) => {
    props.handleSetLoading(true);
    const token = await signUpInWithGoogle(response.credential);
    if (!Array.isArray(token) && token.access) {
      props.handleSetLoading(false);
      dispatch({
        type: APP_ACTIONS.ACCESS_TOKEN,
        payload: token.access,
      });
      dispatch({
        type: APP_ACTIONS.SIGN_IN_OPEN,
      });
      dispatch({
        type: APP_ACTIONS.MESSAGE,
        payload: "Welcome to linkLoop!",
      });
    } else {
      dispatch({ type: APP_ACTIONS.MESSAGE, payload: "ERROR! Denied!" });
      props.handleSetLoading(false);
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <GoogleLogin
        onSuccess={responseMessage}
        onError={() =>
          dispatch({ type: APP_ACTIONS.MESSAGE, payload: "ERROR! Denied!" })
        }
      />
    </Box>
  );
};

export default SignGoogleTemp;
