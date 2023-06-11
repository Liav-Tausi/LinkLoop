import { Box } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import VideoCardMain from "../../Feed/VideoCard/VideoCardMain";
import {
  deleteVideo,
  getComments,
  getLikes,
  getVideosOfUser,
  isLiked,
} from "../../../utils/funcs/mainFuncs";
import {
  APP_ACTIONS,
  AppContext,
  AppDispatchContext,
} from "../../../App/AppStates/AppReducer";
import VideoShare from "../../Feed/VideoCard/VideoShare/VideoShare";

const ProfileVideos = (props) => {
  const { message, shareVideo, accessToken } = useContext(AppContext);
  const dispatch = useContext(AppDispatchContext);
  const [videosUser, setVideosUser] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [amountLikes, setAmountLikes] = useState(0);
  const [amountComments, setAmountComments] = useState(0);
  const [liked, setLiked] = useState(false);

  const handleLike = (flag, videoId) => {
    if (flag) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  };

  useEffect(() => {
    const fetchVideosData = async () => {
      setIsLoading(true);
      const retVal = await getVideosOfUser(props.username);
      setVideosUser(retVal.data.results);
      setIsLoading(false);
    };
    fetchVideosData();
  }, [props.username, message]);

  const handleDeleteFile = async (accessToken, videoId) => {
    const response = await deleteVideo(accessToken, videoId);
    if (response) {
      dispatch({
        type: APP_ACTIONS.MESSAGE,
        payload: "Video Has Been Deleted!",
      });
    }
  };

  useEffect(() => {
    const getLikedStatus = async () => {
      if (accessToken) {
        const likedStatus = await Promise.all(
          videosUser.map((video) => isLiked(video.id, accessToken))
        );
        setLiked(likedStatus.some((status) => status));
      }
    };
    getLikedStatus();
  }, [videosUser, accessToken]);

  useEffect(() => {
    const updateLikesAndComments = async () => {
      const likes = await Promise.all(
        videosUser.map((video) => getLikes(video.id))
      );
      setAmountLikes(
        likes.reduce((total, likesCount) => total + likesCount, 0)
      );

      const comments = await Promise.all(
        videosUser.map((video) => getComments(video.id))
      );
      const totalCommentsCount = comments.reduce(
        (total, commentsList) =>
          total + (commentsList.length || commentsList.comment_count),
        0
      );
      setAmountComments(totalCommentsCount);
    };
    updateLikesAndComments();
  }, [videosUser, liked, message]);

  return (
    <>
      {videosUser.map((video) => {
        return shareVideo && <VideoShare title={video?.title} />;
      })}
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
                key={element.id}
                handleLike={handleLike}
                amountLikes={amountLikes}
                amountComments={amountComments}
                liked={liked}
                isLoading={isLoading}
                video_id_name={element.video_id_name}
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
          <Box
            sx={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            No Videos Yet
          </Box>
        )}
      </Box>
    </>
  );
};

export default ProfileVideos;
