import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../App/AppStates/AppReducer";
import { getProfileData } from "../../../utils/funcs/mainFuncs";
import { Box } from "@mui/material";
import ProfilePatch from "../ProfilePatch/ProfilePatch";
import ProfileDataBar from "./ProfileDataBar";
import ProfileAddVideo from "../ProfileAddVideo/ProfileAddVideo";


const ProfileData = (props) => {
  const { accessToken, profilePatch, message, addVideo } =
    useContext(AppContext);
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const retVal = await getProfileData(null, props.username);
      setProfileData(retVal.data.results[0]);
    };
    fetchUserData();
  }, [accessToken, props.username, message]);

  useEffect(() => {
    console.log("ProfileData refresh");
  }, []);

  return (
    <>
      {profilePatch && <ProfilePatch />}
      {addVideo && <ProfileAddVideo />}
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <ProfileDataBar username={props.username} profileData={profileData} />
      </Box>
    </>
  );
};

export default ProfileData;
