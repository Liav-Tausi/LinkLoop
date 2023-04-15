import { Box, Button, Paper } from "@mui/material";
import {
  APP_ACTIONS,
  AppContext,
  AppDispatchContext,
  IsSmallScreenContext,
} from "../../../App/AppStates/AppReducer";
import { useContext } from "react";
import ProfileDataBarPicture from "./ProfileDataBarPicture";
import ProfileMainText from "./ProfileMainText";
import ProfileEditButton from "./ProfileEditButton";

const ProfileDataBar = (props) => {
  const { themeMode, user } = useContext(AppContext);
  const isSmallScreen = useContext(IsSmallScreenContext);
  const dispatch = useContext(AppDispatchContext);

  return (
    <Box
      sx={{
        boxShadow: 7,
        top: "53.5px",
        width: "100%",
        backgroundColor: themeMode.profileBack,
        pt: 2,
        borderBottom: "solid 1px" + themeMode.feed,
      }}
    >
      <Box
        sx={{
          mx: isSmallScreen ? 1 : 7,
          pr: isSmallScreen ? 2 : 0,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", position: "sticky" }}>
          <ProfileDataBarPicture
            profileData={props.profileData}
            username={props.username}
          />
          <ProfileMainText profileData={props.profileData} />
        </Box>
        {user?.username === props.username && (
          <Box sx={{ position: "relative", alignItems: "center" }}>
            <ProfileEditButton
              sizeX={1.3}
              sizeY={1.25}
              hoverColor={themeMode.navInputColor}
              scale={"scale(1.1)"}
              background="none"
              func={() =>
                dispatch({
                  type: APP_ACTIONS.PROFILE_PATCH,
                })
              }
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ProfileDataBar;
