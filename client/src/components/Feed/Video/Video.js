import { Box, Paper } from "@mui/material";
import { AppContext } from "../../../App/AppStates/AppReducer";
import { useContext, useRef } from "react";

const Video = (props) => {
  const { themeMode } = useContext(AppContext);

  console.log(props);

  const playerRef = useRef(null);
  const script = document.createElement("script");
  script.src = "https://www.youtube.com/player_api";
  document.head.appendChild(script);

  script.onload = () => {
    window.YT.ready(() => {
      playerRef.current = new window.YT.Player("player", {
        videoId: props.video_id,
        playerVars: {
          autoplay: 1,
        },
      });
    });
  };
  return (
    <Paper
      sx={{
        backgroundColor: themeMode.feed,
        boxShadow: 5,
        p: 1,
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Box
          id="player"
          sx={{
            width: "400px",
            height: "500px",
          }}
        ></Box>
      </Box>
    </Paper>
  );
};

export default Video;
