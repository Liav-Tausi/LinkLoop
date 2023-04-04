import { Box, Grid, Paper, Skeleton } from "@mui/material";
import { AppContext } from "../../../App/AppStates/AppReducer";
import { useContext, useEffect, useRef, useState } from "react";

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

  console.log(props.title);

  useEffect(() => {
    console.log(playerState);
  }, [playerState]);

  return (
    <Paper
      sx={{
        backgroundColor: themeMode.feed,
        boxShadow: 5,
        p: 1,
      }}
    >
      <Grid>
        {isLoading ? (
          <Skeleton
            variant="rectangular"
            width={400}
            height={600}
            animation="wave"
          />
        ) : (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Box
              id={props.video_id}
              sx={{
                width: "400px",
                height: "600px",
                "@media (max-width: 600px)": {
                  width: "345px",
                  height: "685px",
                },
              }}
            ></Box>
          </Box>
        )}
        <Grid>
          <Paper>{props.title}</Paper>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default VideoCard;
