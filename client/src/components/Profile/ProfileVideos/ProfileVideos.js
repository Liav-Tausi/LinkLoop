import { Box, Container } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import VideoCard from "../../Feed/VideoCard/VideoCard";
import { getVideosOfUser } from "../../../utils/funcs/mainFuncs";
import { IsSmallScreenContext } from "../../../App/AppStates/AppReducer";

const ProfileVideos = (props) => {
  const isSmallScreen = useContext(IsSmallScreenContext);
  const [videosUser, setVideosUser] = useState([]);

  useEffect(() => {
    const fetchVideosData = async () => {
      const retVal = await getVideosOfUser(props.username);
      setVideosUser(retVal.data.results);
    };
    fetchVideosData();
  }, [props.username]);

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: isSmallScreen ? "nowrap" : "wrap",
        mx: 5,
        gap: 19,
      }}
    >
      {videosUser.length > 0 ? (
        videosUser.map((element) => (
          <Box key={element.id} sx={{ mb: isSmallScreen ? 4 : 0 }}>
            <VideoCard
              videoId={element.id}
              videoNumber={element.video_url.split("/").pop()}
              video_url={element.video_url}
              title={element.title}
              description={element.description}
              date={element.created_time}
            />
          </Box>
        ))
      ) : (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          No Videos Yet
        </Box>
      )}
    </Box>
  );
};

export default ProfileVideos;
