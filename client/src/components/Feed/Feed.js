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
  const { video: videoId } = useParams();
  const dispatch = useContext(AppDispatchContext);
  const [videos, setVideos] = useState([]);
  const [video, setVideo] = useState(null);
  console.log(video)

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const data = await feedData;
        if (data) {
          setVideos(data);
        }
        const foundVideo = data.find(
          (element) => element.video_id_name === videoId
        );
        if (foundVideo) {
          setVideo(foundVideo);
        } else {
          setVideo(null);
          dispatch({
            type: APP_ACTIONS.MESSAGE,
            payload: "ERROR! No Video Found",
          });
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchVideo();
  }, [feedData, videoId]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
      }}
    >
      {video ? (
        <VideoCardMain
          key={video.id}
          videoId={video.id}
          videoNumber={video.video_url.split("/").pop()}
          video_url={video.video_url}
          title={video.title}
          userProfile={video.profile}
          description={video.description}
          date={video.created_time}
        />
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
