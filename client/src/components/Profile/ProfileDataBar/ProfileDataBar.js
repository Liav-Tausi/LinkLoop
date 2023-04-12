import { useContext, useEffect, useState } from "react";
import {
  AppContext,
  IsSmallScreenContext,
} from "../../../App/AppStates/AppReducer";
import { getProfileData, getUserData } from "../../../utils/funcs/mainFuncs";
import { Box } from "@mui/material";
import ProfileMainText from "./ProfileMainText";
import ProfileDataBarPicture from "./ProfileDataBarPicture";
import ProfileEditButton from "./ProfileEditButton";
import ProfilePatch from "../ProfilePatch/ProfilePatch";

const ProfileDataBar = (props) => {
  const { accessToken, themeMode, profilePatch } = useContext(AppContext);
  const isSmallScreen = useContext(IsSmallScreenContext);
  const [userData, setUserData] = useState(null);
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const retVal = await getProfileData(null, props.username);
      setProfileData(retVal.data.results[0]);
    };
    fetchUserData();
  }, [accessToken, props.username]);

  useEffect(() => {
    const fetchUserData = async () => {
      const retVal = await getUserData(null, props.username);
      setUserData(retVal.data.results[0]);
    };
    fetchUserData();
  }, [accessToken, props.username]);

  return (
    <>
      {profilePatch && <ProfilePatch />}

      <Box
        sx={{
          position: "fixed",
          top: "53.5px",
          width: "100%",
          backgroundColor: themeMode.profileBack,
          pt: 2,
        }}
      >
        <Box sx={{ mx: 7, display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex" }}>
            <ProfileDataBarPicture profileData={profileData} />
            <ProfileMainText profileData={profileData} userData={userData} />
          </Box>
          <Box sx={{ position: "relative", alignItems: "center" }}>
            <ProfileEditButton />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ProfileDataBar;
