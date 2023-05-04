import { useContext, useEffect } from "react";
import {
  AppContext,
  IsSmallScreenContext,
} from "../../../../App/AppStates/AppReducer";
import InMenu from "./InMenu/InMenu";
import OutMenu from "./OutMenu/OutMenu";
import SignUp from "../Sign/SignUp/SignUp";
import SignIn from "../Sign/SignIn/SignIn";
import ToolTip from "../../../../utils/Comps/ToolTip";

const LogButtons = () => {
  const { accessToken, signUpOpen, signInOpen } = useContext(AppContext);
  const isSmallScreen = useContext(IsSmallScreenContext);

  useEffect(() => {
    console.log("log buttons refresh");
  }, []);

  return (
    <>
      {!isSmallScreen && !accessToken ? (
        <OutMenu />
      ) : (
        !accessToken && <InMenu />
      )}

      {!accessToken && signInOpen && !signUpOpen && <SignIn />}
      {!accessToken && signUpOpen && !signInOpen && <SignUp />}
    </>
  );
};

export default LogButtons;
