import { Box } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useContext } from "react";
import {
  AppContext,
  IsSmallScreenContext,
} from "../../../App/AppStates/AppReducer";

const ProfileDataBarPicture = (props) => {
  const { themeMode } = useContext(AppContext);
  const isSmallScreen = useContext(IsSmallScreenContext);

  return (
    <Box sx={{ position: "relative", width: 175, height: 175 }}>
      {props.profileData?.profile_picture ? (
        <img
          style={{
            width: isSmallScreen ? "8em" : "10em",
            borderRadius: "50%",
          }}
          src={props.profileData.profile_picture}
          alt="profile picture"
        />
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
    </Box>
  );
};

export default ProfileDataBarPicture;
