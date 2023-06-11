import { Box, Grid, Stack } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import {
  APP_ACTIONS,
  AppContext,
  AppDispatchContext,
  IsSmallScreenContext,
} from "../../../../App/AppStates/AppReducer";
import {
  getComments,
  getLikes,
  isLiked,
  videoLike,
} from "../../../../utils/funcs/mainFuncs";
import SignIn from "../../../NavBar/Menu/Sign/SignIn/SignIn";
import NotImplemented from "../../../../utils/Comps/NotImplemented";
import VideoCardDataDefault from "./VideoCardDataDefault";

const VideoCardData = (props) => {
  const { accessToken, signInOpen, notImplemented, message } =
    useContext(AppContext);
  const dispatch = useContext(AppDispatchContext);
  const isSmallScreen = useContext(IsSmallScreenContext);

  const [load, setLoad] = useState(false);
  const urlParts = window.location.href.split("/")[3];

  useEffect(() => {
    if (!accessToken) {
      props.handleLike(false);
    }
  }, [accessToken]);

  const handleLikeEvent = async () => {
    if (accessToken) {
      if (!props.liked) {
        await videoLike(props.videoId, accessToken, false);
      } else if (props.liked) {
        await videoLike(props.videoId, accessToken, true);
      } else {
        return false;
      }
      props.handleLike(!props.liked);
    } else {
      dispatch({
        type: APP_ACTIONS.SIGN_IN_OPEN,
      });
      if (!signInOpen && accessToken) {
        handleLikeEvent();
      }
    }
  };

  return (
    <>
      {notImplemented && <NotImplemented />}
      {signInOpen && <SignIn />}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: isSmallScreen ? "42vh" : "340px",
            height: isSmallScreen ? "84vh" : "610px",
          }}
        >
          <video
            style={{
              height: "100%",
              width: "100%",
              cursor: "pointer",
              borderRadius: isSmallScreen ? "8px" : "1.5%",
            }}
            onLoad={() => setLoad(true)}
            src={props.videoUrl}
            controls
            required
            autoPlay={urlParts === "profile" ? false : true}
            loop
          ></video>
        </Box>
        <VideoCardDataDefault
          handleLike={handleLikeEvent}
          amountLikes={props.amountLikes}
          liked={props.liked}
          amountComments={props.amountComments}
          comments={props.comments}
          videoUrl={props.video_url}
          videoViews={props.videoViews}
          date={props.date}
          userProfile={props.userProfile}
          description={props.description}
          title={props.title}
          videoNumber={props.videoNumber}
          videoId={props.videoId}
          nextVideo={props.nextVideo}
          previousVideo={props.previousVideo}
        />
      </Box>
    </>
  );
};

export default VideoCardData;
