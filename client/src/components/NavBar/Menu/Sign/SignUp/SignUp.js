import { useContext } from "react";
import {
  AppDispatchContext,
  APP_ACTIONS,
} from "../../../../../App/AppStates/AppReducer";
import SignUpFieldGroup from "./SignUpFieldGroup";
import SignTemp from "../SignTemp/SignTemp";

const SignUp = () => {
  const dispatch = useContext(AppDispatchContext);

  return (
    <SignTemp
      SignId={"signUp"}
      goToText={"already have an account?"}
      func={() => {
        dispatch({
          type: APP_ACTIONS.SIGN_IN_OPEN,
        });
      }}
      goToName={"sign in"}
    >
      <SignUpFieldGroup />
    </SignTemp>
  );
};

export default SignUp;
