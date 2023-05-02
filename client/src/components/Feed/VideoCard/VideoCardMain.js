import { Box, Grid, Paper, Skeleton } from "@mui/material";
import {
  AppContext,
  IsSmallScreenContext,
} from "../../../App/AppStates/AppReducer";
import { useContext, useEffect, useRef, useState } from "react";
import { isLiked } from "../../../utils/funcs/mainFuncs";
import VideoCardData from "./VideoCardData";

const VideoCardMain = (props) => {
  const { themeMode, accessToken } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  const isSmallScreen = useContext(IsSmallScreenContext);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const getLikedStatus = async () => {
      if (accessToken) {
        const likedStatus = await isLiked(props.videoId, accessToken);
        setLiked(likedStatus);
      }
    };
    getLikedStatus();
  }, [props.videoId, accessToken]);

  return (
    <Paper
      sx={{
        borderRadius: isSmallScreen ? "7px" : "15px",
        backgroundColor: themeMode.feed,
        boxShadow: 10,
        p: 1,
      }}
    >
      <Grid>
        {isLoading ? (
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
          <VideoCardData
            videoUrl={props.video_url}
            date={props.date}
            description={props.description}
            title={props.title}
            videoNumber={props.videoNumber}
            videoId={props.videoId}
            liked={liked}
          />
        )}
      </Grid>
    </Paper>
  );
};

export default VideoCardMain;
