import { GoogleLogin } from "@react-oauth/google";
import { Box } from "@mui/material";
import { signUpWithGoogle } from "../../../../utils/funcs/authFuncs";
import { useContext } from "react";
import {
  AppContext,
  AppDispatchContext,
  APP_ACTIONS,
  IsSmallScreenContext,
} from "../../../../../App/AppStates/AppReducer";

const SignGoogleTemp = () => {
  const dispatch = useContext(AppDispatchContext);
  const [loading, setLoading] = useState(false);

  const responseMessage = async (response) => {
    const access = await signUpWithGoogle(response.credential);
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
  }};
  const errorMessage = (error) => {
    console.log(error);
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <GoogleLogin
        onSuccess={responseMessage}
        onError={errorMessage}
      />
    </Box>
  );
};

export default SignGoogleTemp;
