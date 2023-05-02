import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import VideoCardMain from "../../Feed/VideoCard/VideoCardMain";
import { getVideosOfUser } from "../../../utils/funcs/mainFuncs";

const ProfileVideos = (props) => {
  const [videosUser, setVideosUser] = useState([]);

  useEffect(() => {
    console.log("ProfileVideos refresh");
  }, []);

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
        justifyContent: "center",
        py: 2,
        mx: 5,
        flexWrap: "wrap",
        "@media (min-width: 600px)": {
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
        },
      }}
    >
      {videosUser.length > 0 ? (
        videosUser.map((element) => (
          <Box
            key={element.id}
            sx={{
              flex: "1 1 25%",
              display: "flex",
              justifyContent: "center",
              mb: 4,
            }}
          >
            <VideoCardMain
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
        <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
          No Videos Yet
        </Box>
      )}
    </Box>
  );
};

export default ProfileVideos;
