import { Box, Paper, Skeleton } from "@mui/material";
import {
  AppContext,
  AppDispatchContext,
} from "../../App/AppStates/AppReducer";
import { useContext, useEffect, useState } from "react";
import VideoCardMain from "./VideoCard/VideoCardMain";
import { useNavigate, useParams } from "react-router-dom";
import { getFeedData } from "../../utils/funcs/mainFuncs";

const Feed = () => {
  const { themeMode, accessToken } = useContext(AppContext);
  const { video: videoId } = useParams();
  const dispatch = useContext(AppDispatchContext);
  const [pageNum, setPageNum] = useState(1);
  const [videos, setVideos] = useState([]);
  const [video, setVideo] = useState(null);
  const [nextVideoId, setNextVideoId] = useState(null);
  const [previousVideoId, setPreviousVideoId] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const data = await getFeedData(accessToken, pageNum);
        setVideos((prevVideos) => [...prevVideos, ...Object.values(data)]);
      } catch (error) {
        return error
      }
    };

    fetchVideos();
  }, [accessToken, pageNum]);


  useEffect(() => {
    const currentIndex = videos.findIndex(
      (element) => element.video_id_name === videoId
    );

    if (currentIndex >= 0 && currentIndex < videos.length - 1) {
      if (videos[currentIndex - 1]) {
        setPreviousVideoId(videos[currentIndex - 1].video_id_name);
      }
      setNextVideoId(videos[currentIndex + 1].video_id_name);
    } else if (currentIndex === videos.length - 1 && videos.length % 5 === 0) {
      setPageNum((prevPageNum) => prevPageNum + 1);
    } else {
      setNextVideoId(null);
    }

    if (currentIndex > 0) {
      setPreviousVideoId(videos[currentIndex - 1].video_id_name);
    } else {
      setPreviousVideoId(null);
    }

    const foundVideo = videos.find(
      (element) => element.video_id_name === videoId
    );
    if (foundVideo) {
      setVideo(foundVideo);
    } else {
      setVideo(null);
    }
  }, [videoId, videos, dispatch]);

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
          nextVideo={nextVideoId}
          previousVideo={previousVideoId}
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
