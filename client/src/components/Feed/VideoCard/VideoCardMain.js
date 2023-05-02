import { Box, Grid, Paper, Skeleton } from "@mui/material";
import {
  AppContext,
  IsSmallScreenContext,
} from "../../../App/AppStates/AppReducer";
import { useContext, useState } from "react";
import VideoCardData from "./VideoCardData";

const VideoCardMain = (props) => {
  const { themeMode } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  const isSmallScreen = useContext(IsSmallScreenContext);

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
            userProfile={props.userProfile}
            description={props.description}
            title={props.title}
            videoNumber={props.videoNumber}
            videoId={props.videoId}
          />
        )}
      </Grid>
    </Paper>
  );
};

export default VideoCardMain;
