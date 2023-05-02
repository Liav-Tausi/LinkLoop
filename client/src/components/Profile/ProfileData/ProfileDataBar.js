import { Box } from "@mui/material";
import {
  APP_ACTIONS,
  AppContext,
  AppDispatchContext,
  IsSmallScreenContext,
} from "../../../App/AppStates/AppReducer";
import { useContext, useState, useEffect } from "react";
import ProfileBarPicture from "./ProfileDataBarPicture";
import ProfileMainText from "./ProfileMainText";
import ProfileEditButton from "./ProfileEditButton";
import ProfileShowButtonTemp from "./ProfileShowButtonTemp";
import ProfileInfo from "../ProfileInfo/ProfileInfo";
import ProfileVideos from "../ProfileVideos/ProfileVideos";

const ProfileDataBar = (props) => {
  const { themeMode, connectedUser } = useContext(AppContext);
  const isSmallScreen = useContext(IsSmallScreenContext);
  const dispatch = useContext(AppDispatchContext);
  const [showVideos, setShowVideos] = useState(false);

  useEffect(() => {
    console.log("ProfileDataBar refresh");
  }, []);

  return (
    <Box
      sx={{
        mb: 5,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 3,
      }}
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
            <ProfileBarPicture
              username={props.username}
              profileData={props.profileData}
            />
            <ProfileMainText profileData={props.profileData} />
          </Box>
          {connectedUser?.username === props.username && (
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
          flexDirection: "column",
          gap: 3,
          mx: 2,
          px: 5,
          "@media (max-width: 1200px)": {
            px: 3,
          },
          "@media (max-width: 1000px)": {
            px: 2,
          },
          "@media (max-width: 600px)": {
            px: 0,
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: isSmallScreen ? 1.5 : 5,
          }}
        >
          <ProfileShowButtonTemp
            background={themeMode.profileBack}
            backgroundHover={themeMode.profileVideoInfoButtonHover}
            text={"Info"}
            func={() => setShowVideos(!showVideos)}
            disabled={!showVideos}
          />
          <ProfileShowButtonTemp
            background={themeMode.profileBack}
            backgroundHover={themeMode.profileVideoInfoButtonHover}
            text={"Videos"}
            func={() => setShowVideos(!showVideos)}
            disabled={showVideos}
          />
        </Box>

        {showVideos && <ProfileVideos username={props.username} />}
        {!showVideos && <ProfileInfo />}
      </Box>
    </Box>
  );
};

export default ProfileDataBar;
