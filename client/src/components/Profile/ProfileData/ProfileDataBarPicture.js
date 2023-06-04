import { Box, IconButton } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useContext } from "react";
import {
  APP_ACTIONS,
  AppContext,
  AppDispatchContext,
  IsSmallScreenContext,
} from "../../../App/AppStates/AppReducer";
import ProfileEditButton from "./ProfileEditButton";

const ProfileDataBarPicture = (props) => {
  const { themeMode, connectedUser } = useContext(AppContext);
  const isSmallScreen = useContext(IsSmallScreenContext);
  const dispatch = useContext(AppDispatchContext);


  return (
    <Box
      sx={{
        position: "relative",
        width: isSmallScreen ? 125 : 175,
        height: isSmallScreen ? 125 : 175,
        cursor: "pointer",
      }}
    >
      {props.profileData?.profile_picture ? (
        <>
          <img
            style={{
              position: "relative",
              width: isSmallScreen ? "7.2em" : "10.2em",
              height: isSmallScreen ? "7em" : "10em",
              borderRadius: "50%",
              objectFit: "cover",
            }}
            src={props.profileData.profile_picture}
            alt="profile picture"
          />
        </>
      ) : (
        <Box
          sx={{
            position: "absolute",
            top: -8,
            left: -7,
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <AccountCircleIcon
            sx={{
              width: "110%",
              height: "110%",
              color: themeMode.anonymousPicture,
            }}
          />
        </Box>
      )}
      {connectedUser?.username === props.username && (
        <Box sx={{ position: "absolute", right: 28, bottom: 15 }}>
          <ProfileEditButton
            sizeX={0.7}
            sizeY={0.65}
            scale={"scale(0.9)"}
            background={themeMode.navInputColor}
            hoverColor={themeMode.navInputColorHover}
            func={() =>
              dispatch({
                type: APP_ACTIONS.CHANGE_PROFILE_PIC,
              })
            }
          />
        </Box>
      )}
    </Box>
  );
};

export default ProfileDataBarPicture;
