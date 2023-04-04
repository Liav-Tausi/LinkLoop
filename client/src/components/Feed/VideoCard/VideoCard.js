import { Box, Grid, Paper, Skeleton } from "@mui/material";
import { AppContext } from "../../../App/AppStates/AppReducer";
import { useContext, useEffect, useRef, useState } from "react";
import VideoData from "./VideoInfo";

const VideoCard = (props) => {
  const { themeMode } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(true);
  const [playerState, setPlayerState] = useState(1);
  const playerRef = useRef(null);

  const script = document.createElement("script");
  script.src = "https://www.youtube.com/player_api";
  document.head.appendChild(script);

  script.onload = () => {
    window.YT.ready(() => {
      playerRef.current = new window.YT.Player(props.video_id, {
        videoId: props.video_id,
        width: "100%",
        playerVars: {
          loop: 1,
          playlist: props.video_id,
        },
        events: {
          onStateChange: (e) => {
            setPlayerState(e.data);
          },
        },
      });
      setIsLoading(false);
    });
  };

  return (
    <Paper
      sx={{
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
              width={400}
              height={585}
              animation="wave"
            />
            <Skeleton width={100} height={38} animation="wave" />
            <Skeleton height={30} animation="wave" />
          </>
        ) : (
          <VideoData
            date={props.date}
            description={props.description}
            title={props.title}
            id={props.video_id}
          />
        )}
      </Grid>
    </Paper>
  );
};

export default VideoCard;
