import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../App/AppStates/AppReducer";
import { Box } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";
import { getProfileData } from "../../../utils/funcs/mainFuncs";

const ProfilePic = () => {
  const { accessToken, themeMode } = useContext(AppContext);
  const [profileData, setProfileData] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      const res = await getProfileData(accessToken, null);
      setProfileData(res.data);
    };
    fetchUserData();
  }, [accessToken]);

  return (
    <>
      {accessToken && profileData && (
        <Link to={`profile/${profileData.user?.username}`}>
          {profileData.profile_picture ? (
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
    </>
  );
};

export default ProfilePic;
