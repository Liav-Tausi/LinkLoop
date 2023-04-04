import { Box, Paper, Skeleton } from "@mui/material";
import {
  APP_ACTIONS,
  AppContext,
  AppDispatchContext,
} from "../../App/AppStates/AppReducer";
import { useContext, useEffect, useState } from "react";
import VideoCard from "./VideoCard/VideoCard";

const Feed = () => {
  const { feedData, themeMode } = useContext(AppContext);
  const dispatch = useContext(AppDispatchContext);
  const [videos, setVideos] = useState([]);

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
          <VideoCard
            key={element.id}
            id={element.id}
            video_id={element.video_url.split("/").pop()}
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
          <Skeleton
            variant="rectangular"
            width={400}
            height={600}
            animation="wave"
          />
        </Paper>
      )}
    </Box>
  );
};

export default Feed;
