import { useContext } from "react";
import {
  AppDispatchContext,
  APP_ACTIONS,
} from "../../../../../App/AppStates/AppReducer";
import OutMenuTemp from "./OutMenuTemp";
import ToolTip from "../../../../../utils/Comps/ToolTip";

const OutMenu = () => {
  const dispatch = useContext(AppDispatchContext);

  return (
    <>
      <ToolTip label={"Sign Up"} where={"50%"}>
        <OutMenuTemp
          text={"Sign up"}
          func={() => dispatch({ type: APP_ACTIONS.SIGN_UP_OPEN })}
        />
      </ToolTip>
      <ToolTip label={"Sign In"} where={"50%"}>
        <OutMenuTemp
          text={"Sign in"}
          func={() => dispatch({ type: APP_ACTIONS.SIGN_IN_OPEN })}
        />
      </ToolTip>
    </>
  );
};

export default OutMenu;
