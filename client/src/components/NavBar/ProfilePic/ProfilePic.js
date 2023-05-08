import { useContext, useEffect, useState } from "react";
import {
  APP_ACTIONS,
  AppContext,
  AppDispatchContext,
} from "../../../App/AppStates/AppReducer";
import { Box } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";
import { getProfileData, getUserData } from "../../../utils/funcs/mainFuncs";

const ProfilePic = () => {
  const { accessToken, themeMode, connectedUser, message } =
    useContext(AppContext);
  const dispatch = useContext(AppDispatchContext);
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      const retVal = await getProfileData(accessToken, null);
      setProfileData(retVal.data);
    };
    fetchProfileData();
  }, [accessToken, message]);

  useEffect(() => {
    const fetchUserData = async () => {
      const retVal = await getUserData(accessToken, null);
      dispatch({
        type: APP_ACTIONS.CONNECTED_USER,
        payload: retVal.data,
      });
    };
    fetchUserData();
  }, [accessToken]);

  return (
    <>
      {connectedUser?.username && (
        <Link to={`profile/${connectedUser.username}`}>
          {accessToken && profileData && profileData.profile_picture ? (
            <Box sx={{ width: 37, height: 37 }}>
              <img
                style={{ width: "101%", height: "100%", borderRadius: "50%" }}
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
      {!connectedUser && accessToken && (
        <Link to={`profile/${connectedUser?.username}`}>
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
