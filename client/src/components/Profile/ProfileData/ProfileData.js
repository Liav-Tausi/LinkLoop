import { useContext, useEffect, useState } from "react";
import { AppContext, IsSmallScreenContext } from "../../../App/AppStates/AppReducer";
import { getProfileData } from "../../../utils/funcs/mainFuncs";
import { Box, Container } from "@mui/material";
import ProfilePatch from "../ProfilePatch/ProfilePatch";
import ProfileVideos from "../ProfileVideos/ProfileVideos";
import ProfileDataBar from "./ProfileDataBar";

const ProfileData = (props) => {
  const { accessToken, profilePatch,} = useContext(AppContext);
  const isSmallScreen = useContext(IsSmallScreenContext);
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const retVal = await getProfileData(null, props.username);
      setProfileData(retVal.data.results[0]);
    };
    fetchUserData();
  }, [accessToken, props.username]);

  return (
    <Box>
      {profilePatch && <ProfilePatch />}
      <Box sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
        <ProfileDataBar username={props.username} profileData={profileData} />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: isSmallScreen ? "center" : "flex-start",
          mx: isSmallScreen ? "auto" : 2,
          py: 2,
        }}
      >
        <ProfileVideos username={props.username} />
      </Box>
    </Box>
  );
};

export default ProfileData;
