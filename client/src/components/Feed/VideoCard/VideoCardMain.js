import { Box, Grid, Paper, Skeleton } from "@mui/material";
import {
  AppContext,
  IsSmallScreenContext,
} from "../../../App/AppStates/AppReducer";
import { useContext } from "react";
import VideoCardData from "./VideoCardData";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const VideoCardMain = (props) => {
  const { themeMode, connectedUser, accessToken } = useContext(AppContext);
  const isSmallScreen = useContext(IsSmallScreenContext);

  console.log(window.location.href.split("/")[3]);

  return (
    <Paper
      sx={{
        borderRadius: isSmallScreen ? "7px" : "15px",
        backgroundColor: themeMode.feed,
        position: "relative",
        boxShadow: 10,
        p: 1,
      }}
    >
      <Grid>
        {props.isLoading ? (
          <>
            <Box sx={{ display: "flex", justifyContent: "end" }}>
              <Skeleton width={100} height={30} animation="wave" />
            </Box>
            <Skeleton
              variant="rectangular"
              width="350px"
              height="500px"
              animation="wave"
            />
            <Box sx={{ display: "flex", justifyContent: "end" }}>
              <Skeleton width={100} height={38} animation="wave" />
            </Box>
            <Box sx={{ display: "flex", justifyContent: "end" }}>
              <Skeleton width={250} height={35} animation="wave" />
            </Box>
          </>
        ) : (
          <>
            {connectedUser?.username === props.username &&
              window.location.href.split("/")[3] === "profile" &&(
                <Box
                  onClick={() =>
                    props.handleDeleteFile(accessToken, props.videoId)
                  }
                  sx={{
                    borderRadius: "50%",
                    position: "absolute",
                    top: isSmallScreen ? 12 : 15,
                    left: isSmallScreen ? 12 : 15,
                    zIndex: 1000,
                    p: 0.7,
                    display: "flex",
                    justifyContent: "center",
                    backgroundColor: themeMode.navInputColor,
                    "&:hover": {
                      backgroundColor: themeMode.navInputColorHover,
                      cursor: "pointer",
                    },
                    "&:active": {
                      transform: "scale(0.98)",
                    },
                  }}
                >
                  <CloseRoundedIcon
                    sx={{
                      transform: "scale(1.2)",
                      color: themeMode.textColor,
                    }}
                  />
                </Box>
              )}
            <VideoCardData
              videoUrl={props.video_url}
              date={props.date}
              userProfile={props.userProfile}
              description={props.description}
              title={props.title}
              videoNumber={props.videoNumber}
              videoId={props.videoId}
            />
          </>
        )}
      </Grid>
    </Paper>
  );
};

export default VideoCardMain;
