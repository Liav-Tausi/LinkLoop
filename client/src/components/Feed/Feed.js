import { Box, Paper, Skeleton, Grid } from "@mui/material";
import {
  APP_ACTIONS,
  AppContext,
  AppDispatchContext,
  IsSmallScreenContext,
} from "../../App/AppStates/AppReducer";
import { useContext, useEffect, useState } from "react";
import VideoCardMain from "./VideoCard/VideoCardMain";
import { useParams } from "react-router-dom";
import { getComments, getFeedData, getLikes, isLiked } from "../../utils/funcs/mainFuncs";
import VideoShare from "./VideoCard/VideoShare/VideoShare";
import { validateComment } from "../../utils/funcs/formValidators";
import CommentsOnPhone from "./Comments/CommentsOnPhone";
import CommentsOnPc from "./Comments/CommentsOnPc";

const Feed = (props) => {
  const { themeMode, accessToken, shareVideo, message } =
    useContext(AppContext);
  const { video: videoId } = useParams();
  const isSmallScreen = useContext(IsSmallScreenContext);
  const dispatch = useContext(AppDispatchContext);
  const [pageNum, setPageNum] = useState(1);
  const [videos, setVideos] = useState([]);
  const [video, setVideo] = useState(null);
  const [nextVideoId, setNextVideoId] = useState(null);
  const [previousVideoId, setPreviousVideoId] = useState(null);
  const commentsUrl = window.location.href.split("/")[4];
  const [commentData, setCommentData] = useState("");
  const [commentError, setCommentError] = useState(false);
  const [amountLikes, setAmountLikes] = useState(0);
  const [amountComments, setAmountComments] = useState(0);
  const [commentsContent, setCommentsContent] = useState([])
  const [liked, setLiked] = useState(false);

  const handleLike = (flag) => {
    if (flag) {
      setLiked(true)
    } else {
      setLiked(false);
    }
  }

  useEffect(() => {
    const getLikedStatus = async () => {
      if (accessToken) {
        setLiked(await isLiked(video?.id, accessToken));
      }
    };
    getLikedStatus();
  }, [video?.id, accessToken]);

  useEffect(() => {
    const countLikes = async () => {
      setAmountLikes(await getLikes(video?.id));
    };
    countLikes();
    const countComments = async () => {
      const comments = await getComments(video?.id);
      if (!comments[0]) {
         setCommentsContent([]);
        setAmountComments(comments.comment_count);
      } else {
        setCommentsContent(comments);
        setAmountComments(comments.length);
      }
    };
    countComments();
  }, [liked, message, video?.id]);



  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const data = await getFeedData(accessToken, pageNum);
        setVideos((prevVideos) => [...prevVideos, ...Object.values(data)]);
      } catch (error) {
        dispatch({
          type: APP_ACTIONS.MESSAGE,
          payload: "ERROR! Getting Videos",
        });
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


  const handleCommentChange = (event) => {
    setCommentError(!validateComment(event.target.value));
    setCommentData(event.target.value);
  };

  return (
    <>
      {shareVideo && <VideoShare title={video?.title} />}
      <Box
        sx={{
          display: "flex",
          gap: 3,
          flexDirection: isSmallScreen ? "column" : "row",
          justifyContent: "center",
        }}
      >
        <Grid item justifyContent="center">
          {video ? (
            <VideoCardMain
              key={video.id}
              comments={props.comments}
              videoId={video.id}
              video_id_name={video.video_id_name}
              videoNumber={video.video_url.split("/").pop()}
              video_url={video.video_url}
              title={video.title}
              userProfile={video.profile}
              description={video.description}
              date={video.created_time}
              handleLike={handleLike}
              amountLikes={amountLikes}
              amountComments={amountComments}
              liked={liked}
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
                  width={isSmallScreen ? "365px" : "320px"}
                  height={isSmallScreen ? "90vh" : "482px"}
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
        </Grid>
        {commentsUrl === "comments" && (
          <Grid item>
            <Box
              sx={{
                borderRadius: isSmallScreen ? "7px" : "15px",
                backgroundColor: themeMode.feed,
                position: "relative",
                p: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: isSmallScreen ? "center" : "flex-start",
                flexDirection: "column",
                width: isSmallScreen ? "42vh" : "340px",
                height: isSmallScreen ? "75vh" : "610px",
              }}
            >
              {!isSmallScreen ? (
                <CommentsOnPc
                  handleCommentChange={handleCommentChange}
                  commentError={commentError}
                  commentData={commentData}
                  commentsContent={commentsContent}
                  video={video}
                />
              ) : (
                <CommentsOnPhone
                  handleCommentChange={handleCommentChange}
                  commentError={commentError}
                  commentData={commentData}
                  commentsContent={commentsContent}
                  video={video}
                />
              )}
            </Box>
          </Grid>
        )}
      </Box>
    </>
  );
};

export default Feed;
