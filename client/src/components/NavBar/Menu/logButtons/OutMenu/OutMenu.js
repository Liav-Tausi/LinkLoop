import { useContext } from "react";
import {
  AppDispatchContext,
  APP_ACTIONS,
} from "../../../../../App/AppStates/AppReducer";
import OutMenuTemp from "./OutMenuTemp";

const OutMenu = () => {
  const dispatch = useContext(AppDispatchContext);

  return (
    <>
      <OutMenuTemp
        text={"Sign up"}
        func={() => dispatch({ type: APP_ACTIONS.SIGN_UP_OPEN })}
      />
      <OutMenuTemp
        text={"Sign in"}
        func={() => dispatch({ type: APP_ACTIONS.SIGN_IN_OPEN })}
      />
    </>
  );
};

export default OutMenu;
