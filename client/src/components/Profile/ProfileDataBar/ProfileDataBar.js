import { useContext, useEffect, useState } from "react";
import { AppContext, IsSmallScreenContext } from "../../../App/AppStates/AppReducer";
import { getProfileData } from "../../../utils/funcs/mainFuncs";
import { Box, Container } from "@mui/material";
import ProfileMainText from "./ProfileMainText";
import ProfileDataBarPicture from "./ProfileDataBarPicture";

const ProfileDataBar = (props) => {
  const { accessToken, themeMode } = useContext(AppContext);
  const isSmallScreen = useContext(IsSmallScreenContext);
  const [profileData, setProfileData] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      const retVal = await getProfileData(null, props.username);
      setProfileData(retVal.data.results[0]);
    };
    fetchUserData();
  }, [accessToken, props.username]);

  return (
    <Box
      sx={{
        position: "fixed",
        top: "53.5px",
        width: "100%",
        backgroundColor: themeMode.profileBack,
        pt: 2,
      }}
    >
      <Container sx={{ m: 1.2, display: "flex" }}>
        <ProfileDataBarPicture profileData={profileData}/>
        <ProfileMainText username={props.username} profileData={profileData} />
      </Container>
    </Box>
  );
}

export default ProfileDataBar;