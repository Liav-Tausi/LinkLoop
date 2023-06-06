import { Box, Grid, Paper, Skeleton } from "@mui/material";
import {
  AppContext,
  IsSmallScreenContext,
} from "../../../App/AppStates/AppReducer";
import { useContext, useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  getImpressions,
  postVideoImpression,
} from "../../../utils/funcs/mainFuncs";
import VideoCardData from "./VideoCardData/VideoCardData";

const VideoCardMain = (props) => {
  const { themeMode, connectedUser, accessToken } = useContext(AppContext);
  const isSmallScreen = useContext(IsSmallScreenContext);
  const [videoViews, setVideoViews] = useState(0);
  const lastPart = window.location.href.split("/")[3];

  useEffect(() => {
    const ifPostVideoImpression = async () => {
      if (props.video_id_name) {
        await postVideoImpression(accessToken, props.video_id_name);
        const views = await getImpressions(
          props.video_id_name,
          "video_id_name"
        );
        setVideoViews(views.data.impression_count);
      }
    };
    if (props.videoId) {
      ifPostVideoImpression();
    }
  }, [lastPart, props.video_id_name]);


  return (
    <Paper
      sx={{
        borderRadius: isSmallScreen ? "7px" : "15px",
        backgroundColor: themeMode.feed,
        position: "relative",
        p: 1,
      }}
    >
      <Grid justifyContent="center">
        {props.isLoading ? (
          <>
            <Box sx={{ display: "flex", justifyContent: "end" }}>
              <Skeleton width={100} height={30} animation="wave" />
            </Box>
            <Skeleton
              variant="rectangular"
              width={isSmallScreen ? "365px" : "340px"}
              height={isSmallScreen ? "90vh" : " 610px"}
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
              window.location.href.split("/")[3] === "profile" && (
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
                    display: props.isLoading ? "none" : "flex",
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
                  <DeleteIcon
                    sx={{
                      transform: "scale(1)",
                      color: themeMode.textColor,
                    }}
                  />
                </Box>
              )}
            <VideoCardData
              comments={props.comments}
              videoUrl={props.video_url}
              videoViews={videoViews}
              date={props.date}
              userProfile={props.userProfile}
              description={props.description}
              title={props.title}
              videoNumber={props.videoNumber}
              videoId={props.videoId}
              handleLike={props.handleLike}
              amountLikes={props.amountLikes}
              amountComments={props.amountComments}
              liked={props.liked}
              nextVideo={props.nextVideo}
              previousVideo={props.previousVideo}
            />
          </>
        )}
      </Grid>
    </Paper>
  );
};

export default VideoCardMain;
