import { Box } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import VideoCardMain from "../../Feed/VideoCard/VideoCardMain";
import { deleteVideo, getVideosOfUser } from "../../../utils/funcs/mainFuncs";
import { APP_ACTIONS, AppContext, AppDispatchContext, IsSmallScreenContext } from "../../../App/AppStates/AppReducer";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const ProfileVideos = (props) => {
  const {message, themeMode, accessToken } = useContext(AppContext)
  const isSmallScreen = useContext(IsSmallScreenContext)
  const dispatch = useContext(AppDispatchContext)
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
              position: "relative",
              mb: 4,
            }}
          >
            <Box
              onClick={() => handleDeleteFile(accessToken, element.id)}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "50%",
                position: "absolute",
                top: 15,
                left: isSmallScreen ? 16 : 65,
                zIndex: 1000,
                px: 0.7,
                py: 0.7,
                backgroundColor: themeMode.navInputColor,
                "&:hover": {
                  backgroundColor: themeMode.navInputColorHover,
                  cursor: "pointer",
                },
                "&:active": {
                  transform: "scale(0.98)",
                },
              }}
            >
              <CloseRoundedIcon
                sx={{
                  transform: "scale(1.2)",
                  color: themeMode.textColor,
                }}
              />
            </Box>
            <VideoCardMain
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
