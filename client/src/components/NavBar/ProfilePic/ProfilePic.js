import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../App/AppStates/AppReducer";
import { Box } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";
import { getProfileData, getUserData } from "../../../utils/funcs/mainFuncs";

const ProfilePic = () => {
  const { accessToken, themeMode } = useContext(AppContext);
  const [userData, setUserData] = useState(null);
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      const retVal = await getProfileData(accessToken, null);
      setProfileData(retVal.data);
    };
    fetchProfileData();
  }, [accessToken]);

  useEffect(() => {
    const fetchUserData = async () => {
      const retVal = await getUserData(accessToken, null);
      console.log(retVal);
      setUserData(retVal.data);
    };
    fetchUserData();
  }, [accessToken]);

  return (
    <>
      {userData?.username && (
        <Link to={`profile/${userData.username}`}>
          {accessToken && profileData && profileData.profile_picture ? (
            <Box sx={{ width: 37, height: 37 }}>
              <img
                style={{ width: "100%", borderRadius: "50%" }}
                src={profileData.profile_picture}
                alt="profile picture"
              />
            </Box>
          ) : (
            <AccountCircleIcon
              sx={{
                mt: 0.45,
                transform: "scale(1.95)",
                color: themeMode.anonymousPicture,
                mx: 1,
              }}
            />
          )}
        </Link>
      )}
      {!userData && accessToken && (
        <Link to={`profile/${userData?.username}`}>
          <AccountCircleIcon
            sx={{
              mt: 0.45,
              transform: "scale(1.95)",
              color: themeMode.anonymousPicture,
              mx: 1,
            }}
          />
        </Link>
      )}
    </>
  );
};

export default ProfilePic;
