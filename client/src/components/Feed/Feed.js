import { Box, Paper, Skeleton } from "@mui/material";
import {
  APP_ACTIONS,
  AppContext,
  AppDispatchContext,
} from "../../App/AppStates/AppReducer";
import { useContext, useEffect, useState } from "react";
import VideoCardMain from "./VideoCard/VideoCardMain";
import { useParams } from "react-router-dom";

const Feed = () => {
  const { feedData, themeMode } = useContext(AppContext);
  const dispatch = useContext(AppDispatchContext);
  const [videos, setVideos] = useState([]);
  const { video } = useParams();

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const data = await feedData;
        if (data) {
          setVideos(data);
        } else {
          dispatch({
            type: APP_ACTIONS.MESSAGE,
            payload: "ERROR! Connection Error",
          });
        }
      } catch (error) {
        dispatch({
          type: APP_ACTIONS.MESSAGE,
          payload: "ERROR! Connection Error",
        });
      }
    };
    fetchVideos();
  }, [feedData]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
      }}
    >
      {videos.length > 0 ? (
        videos.map((element) => (
          <VideoCardMain
            key={element.id}
            videoId={element.id}
            videoNumber={element.video_url.split("/").pop()}
            video_url={element.video_url}
            title={element.title}
            description={element.description}
            date={element.created_time}
          />
        ))
      ) : (
        <Paper
          sx={{
            backgroundColor: themeMode.feed,
            boxShadow: 5,
            p: 2,
          }}
        >
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
        </Paper>
      )}
    </Box>
  );
};

export default Feed;
