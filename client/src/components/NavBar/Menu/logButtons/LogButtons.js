import { useContext, useEffect } from "react";
import {
  AppContext,
  IsSmallScreenContext,
} from "../../../../App/AppStates/AppReducer";
import InMenu from "./InMenu/InMenu";
import OutMenu from "./OutMenu/OutMenu";
import SignUp from "../Sign/SignUp/SignUp";
import SignIn from "../Sign/SignIn/SignIn";

const LogButtons = () => {
  const { accessToken, signUpOpen, signInOpen } = useContext(AppContext);
  const isSmallScreen = useContext(IsSmallScreenContext);

  useEffect(() => {
    console.log("log buttons refresh");
  }, []);

  return (
    <>
      {!accessToken && signInOpen && !signUpOpen && <SignIn />}
      {!accessToken && signUpOpen && !signInOpen && <SignUp />}
      {!isSmallScreen && !accessToken ? (
        <OutMenu />
      ) : (
        !accessToken && <InMenu />
      )}
    </>
  );
};

export default LogButtons;
