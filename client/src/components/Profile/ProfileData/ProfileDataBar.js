import { Box, Paper } from "@mui/material";
import {
  APP_ACTIONS,
  AppContext,
  AppDispatchContext,
  IsSmallScreenContext,
} from "../../../App/AppStates/AppReducer";
import { useContext, useState } from "react";
import ProfileDataBarPicture from "./ProfileDataBarPicture";
import ProfileMainText from "./ProfileMainText";
import ProfileEditButton from "./ProfileEditButton";
import ProfileShowButtonTemp from "./ProfileShowButtonTemp";
import ProfileVideos from "../../Profile/ProfileVideos/ProfileVideos";

const ProfileDataBar = (props) => {
  const { themeMode, user } = useContext(AppContext);
  const isSmallScreen = useContext(IsSmallScreenContext);
  const dispatch = useContext(AppDispatchContext);
  const [showVideos, setShowVideos] = useState(false);

  return (
    <Box
      sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 3 }}
    >
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <ProfileShowButtonTemp
          background={themeMode.profileBack}
          backgroundHover={themeMode.profileVideoInfoButtonHover}
          text={"Info"}
          func={() => setShowVideos(!showVideos)}
          disabled={!showVideos}
          ml={isSmallScreen ? "auto" : 6}
          mr={1}
        />
        <ProfileShowButtonTemp
          background={themeMode.profileBack}
          backgroundHover={themeMode.profileVideoInfoButtonHover}
          text={"Videos"}
          func={() => setShowVideos(!showVideos)}
          disabled={showVideos}
          ml={1}
          mr={isSmallScreen ? "auto" : 6}
        />
      </Box>
      {showVideos && (
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
      )}
      {!showVideos && (
        <Paper
          sx={{
            borderRadius: "17px",
            boxShadow: 0,
            backgroundColor: themeMode.profileBack,
            display: "flex",
            justifyContent: isSmallScreen ? "center" : "flex-start",
            mx: isSmallScreen ? "auto" : 6,
            p: 25,
            mb: 10,
          }}
        >
          {/* <ProfileVideos username={props.username} /> */}
        </Paper>
      )}
    </Box>
  );
};

export default ProfileDataBar;
