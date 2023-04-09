import { Box, Grid, Paper, Skeleton } from "@mui/material";
import { AppContext } from "../../../App/AppStates/AppReducer";
import { useContext, useEffect, useRef, useState } from "react";
import VideoData from "./VideoData";
import { isLiked } from "../../../utils/funcs/mainFuncs";

const VideoCard = (props) => {
  const { themeMode, accessToken } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(true);
  const [playerState, setPlayerState] = useState(1);
  const [liked, setLiked] = useState(false);
  const playerRef = useRef(null);

  const script = document.createElement("script");
  script.src = "https://www.youtube.com/player_api";
  document.head.appendChild(script);

  script.onload = () => {
    window.YT.ready(() => {
      playerRef.current = new window.YT.Player(props.videoNumber, {
        videoId: props.videoNumber,
        width: "100%",
        playerVars: {
          loop: 1,
          playlist: props.videoNumber,
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
              height={555}
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
            videoNumber={props.videoNumber}
            videoId={props.videoId}
            liked={liked}
          />
        )}
      </Grid>
    </Paper>
  );
};

export default VideoCard;
