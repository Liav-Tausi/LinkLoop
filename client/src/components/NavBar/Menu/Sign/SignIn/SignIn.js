import { useContext } from "react";
import {
  AppDispatchContext,
  APP_ACTIONS,
} from "../../../../../App/AppStates/AppReducer";
import SignInFieldGroup from "./SignInFieldGroup";
import SignTemp from "../SignTemp/SignTemp";

const SignIn = () => {
  const dispatch = useContext(AppDispatchContext);

  return (
    <SignTemp
      SignId={"signIn"}
      goToText={"don't have an account?"}
      func={() => {
        dispatch({
          type: APP_ACTIONS.SIGN_UP_OPEN,
        });
      }}
      goToName={"sign up"}
    >
      <SignInFieldGroup />
    </SignTemp>
  );
};

export default SignIn;
