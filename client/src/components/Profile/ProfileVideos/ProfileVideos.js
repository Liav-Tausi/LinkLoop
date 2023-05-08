import { Box } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import VideoCardMain from "../../Feed/VideoCard/VideoCardMain";
import { deleteVideo, getVideosOfUser } from "../../../utils/funcs/mainFuncs";
import { APP_ACTIONS, AppContext, AppDispatchContext, IsSmallScreenContext } from "../../../App/AppStates/AppReducer";


const ProfileVideos = (props) => {
  const { message } =useContext(AppContext);
  const dispatch = useContext(AppDispatchContext)
  const [videosUser, setVideosUser] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log("ProfileVideos refresh");
  }, []);

  useEffect(() => {
    const fetchVideosData = async () => {
      setIsLoading(true)
      const retVal = await getVideosOfUser(props.username);
      setVideosUser(retVal.data.results);
      setIsLoading(false)
    };
    fetchVideosData();
  }, [props.username, message]);

  const handleDeleteFile = async (accessToken, videoId) => {
    const response = await deleteVideo(accessToken, videoId);
    if (response) {
      dispatch({
        type: APP_ACTIONS.MESSAGE,
        payload: "Video Has Been Deleted!"
      })
    }
  }

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
              isLoading={isLoading}
              username={props.username}
              handleDeleteFile={handleDeleteFile}
              videoId={element.id}
              videoNumber={element.video_url.split("/").pop()}
              video_url={element.video_url}
              title={element.title}
              description={element.description}
              userProfile={element.profile}
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
