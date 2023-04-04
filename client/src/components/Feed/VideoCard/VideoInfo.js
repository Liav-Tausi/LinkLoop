import { Box, Grid, IconButton, Stack } from "@mui/material";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import ForumRoundedIcon from "@mui/icons-material/ForumRounded";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import {
  PauseCircleOutline,
  PlayCircleOutline,
  SkipNext,
} from "@mui/icons-material";
import { useContext } from "react";
import { AppContext } from "../../../App/AppStates/AppReducer";

const VideoData = (props) => {
  const { themeMode } = useContext(AppContext);
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <Box
        id={props.id}
        sx={{
          position: "relative",
          width: "400px",
          height: "600px",
          "@media (max-width: 600px)": {
            width: "345px",
            height: "650px",
          },
        }}
      ></Box>
      <Box
        sx={{
          position: "absolute",
          bottom: 20,
          left: 0,
          right: 0,
          px: 2,
          py: 1,
          backgroundColor: "transparent",
          fontWeight: "thin",
          color: "white",
          textShadow: "0px 1px 11px #000",
        }}
      >
        <Grid container direction="column" sx={{ gap: 1 }}>
          <Box sx={{ fontSize: 17 }}>{props.title}</Box>
          <Box sx={{ fontSize: 14 }}>{props.description}</Box>
        </Grid>
      </Box>
      <Box
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
          px: 2,
          py: 1,
          backgroundColor: "transparent",
          fontWeight: "thin",
          color: "white",
          textShadow: "0px 1px 11px #000",
        }}
      >
        {props.date.split("T")[0]}
      </Box>
      <Box
        sx={{
          position: "absolute",
          bottom: 90,
          left: 5,
          textShadow: "0px 1px 11px #000",
        }}
      >
        <Stack gap={1} fontSize={30}>
          <IconButton
            sx={{ color: "white", "&:active": { transform: "scale(0.95)" } }}
          >
            <FavoriteRoundedIcon />
          </IconButton>
          <IconButton
            sx={{ color: "white", "&:active": { transform: "scale(0.95)" } }}
          >
            <ForumRoundedIcon />
          </IconButton>
          <IconButton
            sx={{ color: "white", "&:active": { transform: "scale(0.95)" } }}
          >
            <ReplyOutlinedIcon />
          </IconButton>
          <IconButton
            sx={{ color: "white", "&:active": { transform: "scale(0.95)" } }}
          >
            <PauseCircleOutline />
          </IconButton>
        </Stack>
      </Box>
    </Box>
  );
};

export default VideoData;
