import { useContext, useEffect, useState } from "react";
import {
  APP_ACTIONS,
  AppContext,
  AppDispatchContext,
  IsSmallScreenContext,
} from "../../../App/AppStates/AppReducer";
import { getProfileData } from "../../../utils/funcs/mainFuncs";
import { Box } from "@mui/material";
import ProfilePatch from "../ProfilePatch/ProfilePatch";
import ProfileDataBar from "./ProfileDataBar";

const ProfileData = (props) => {
  const { accessToken, profilePatch, message, user } = useContext(AppContext);
  const dispatch = useContext(AppDispatchContext)

  useEffect(() => {
    const fetchUserData = async () => {
      const retVal = await getProfileData(null, props.username);

      dispatch({
        type: APP_ACTIONS.USER,
        payload: retVal.data.results[0],
      });
    };
    fetchUserData();
  }, [accessToken, props.username, message]);

  return (
    <Box>
      {profilePatch && <ProfilePatch />}
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <ProfileDataBar username={props.username}/>
      </Box>
    </Box>
  );
};

export default ProfileData;
