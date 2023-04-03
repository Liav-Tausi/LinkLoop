import { Box } from "@mui/material";
import { AppContext } from "../../App/AppStates/AppReducer";
import { useContext, useEffect, useState } from "react";
import Video from "./Video/Video";

const Feed = () => {
  const { feedData } = useContext(AppContext);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const data = await feedData;
      setVideos(data);
    };
    fetchVideos();
  }, [feedData]);

  return (
    <Box>
      {videos.map((element) => {
        return (
          <Video key={element.id} video_id={element.video_url.split("=")[1]} />
        );
      })}
    </Box>
  );
};

export default Feed;
