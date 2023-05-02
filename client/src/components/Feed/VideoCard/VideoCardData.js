import { Box, Grid, Stack } from "@mui/material";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import ChatBubbleRoundedIcon from "@mui/icons-material/ChatBubbleRounded";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { useContext, useEffect, useState } from "react";
import {
  APP_ACTIONS,
  AppContext,
  AppDispatchContext,
  IsSmallScreenContext,
} from "../../../App/AppStates/AppReducer";
import {
  countComments,
  countLikes,
  isLiked,
  videoLike,
} from "../../../utils/funcs/mainFuncs";
import SignIn from "../../NavBar/Menu/Sign/SignIn/SignIn";
import VideoIcons from "./VideoIcons";
import { Link } from "react-router-dom";

const VideoCardData = (props) => {
  const { themeMode, accessToken, signInOpen } = useContext(AppContext);
  const dispatch = useContext(AppDispatchContext);
  const isSmallScreen = useContext(IsSmallScreenContext);
  const [liked, setLiked] = useState(false);
  const [amountLikes, setAmountLikes] = useState(0);
  const [amountComments, setAmountComments] = useState(0);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    if (!accessToken) {
      setLiked(false);
    }
  }, [accessToken]);

  useEffect(() => {
    const getLikedStatus = async () => {
      if (accessToken) {
        setLiked(await isLiked(props.videoId, accessToken));
      }
    };
    getLikedStatus();
  }, [props.videoId, accessToken]);

  useEffect(() => {
    const getLikes = async () => {
      setAmountLikes(await countLikes(accessToken, props.videoId));
    };
    getLikes();
    const getComments = async () => {
      setAmountComments(await countComments(accessToken, props.videoId));
    };
    getComments();
  }, [liked]);

  const handleLike = async () => {
    if (accessToken) {
      if (!liked) {
        await videoLike(props.videoId, accessToken, false);
      } else if (liked) {
        await videoLike(props.videoId, accessToken, true);
      } else {
        return false;
      }
      setLiked(!liked);
    } else {
      dispatch({
        type: APP_ACTIONS.SIGN_IN_OPEN,
      });
      if (!signInOpen && accessToken) {
        handleLike();
      }
    }
  };

  return (
    <>
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
            width: "335px",
            height: "595px",
          }}
        >
          <iframe
            title={props.videoUrl}
            style={{
              height: "100%",
              width: "100%",
              cursor: "pointer",
              borderRadius: isSmallScreen ? "7px" : "12px",
              visibility: load ? "visible" : "hidden",
            }}
            onLoad={() => setLoad(true)}
            src={props.videoUrl}
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </Box>
        <Box
          sx={{
            position: "absolute",
            bottom: 65,
            left: "auto",
            right: 5,
            px: 2,
            py: 0.5,
            backgroundColor: "transparent",
            fontWeight: "thin",
            color: "white",
            textShadow: "0px 1px 11px #000",
            textAlign: "right",
          }}
        >
          <Grid container direction="column" sx={{ gap: 1.3 }}>
            <Box sx={{ fontSize: 17, textAlign: "right" }}>{props.title}</Box>
            <Box sx={{ fontSize: 14, textAlign: "right" }}>
              {props.description}
            </Box>
          </Grid>
        </Box>
        <Box
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            px: 2,
            py: 1,
            backgroundColor: "transparent",
            fontWeight: "thin",
            color: "white",
            textShadow: "0px 1px 11px #000",
          }}
        >
          {props.date?.split("T")[0]}
        </Box>
        <Box
          sx={{
            position: "absolute",
            bottom: isSmallScreen ? 85 : 50,
            left: isSmallScreen ? 5 : -65,
            textShadow: "0px 1px 11px #000",
          }}
        >
          <Stack gap={5} color="white">
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  position: "relative",
                  cursor: "pointer",
                }}
              >
                <Link to={`/profile/${props.userProfile?.user?.username}`}>
                  {props.userProfile?.profile_picture ? (
                    <Box sx={{ width: 43, height: 40 }}>
                      <img
                        style={{
                          width: "100%",
                          borderRadius: "50%",
                        }}
                        src={props.userProfile.profile_picture}
                        alt="profile picture"
                      />
                    </Box>
                  ) : (
                    <AccountCircleIcon
                      sx={{
                        mt: 0.45,
                        transform: "scale(1.95)",
                        color: themeMode.anonymousPicture,
                        mx: 1,
                      }}
                    />
                  )}
                </Link>
              </Box>
              <Box
                sx={{
                  mt: 1,
                  top: 40,
                  right: 2,
                  whiteSpace: "nowrap",
                  position: "absolute",
                  color: themeMode.textColor,
                  display: "flex",
                  justifyContent: "center",
                  fontSize: "8px",
                  textShadow: 0,
                }}
              >
                {`${props.userProfile?.user?.first_name} ${props.userProfile?.user?.last_name}`}
              </Box>
            </Box>
            <Box>
              <VideoIcons>
                <FavoriteRoundedIcon
                  onClick={handleLike}
                  sx={{
                    position: "relative",
                    color: liked ? themeMode.appTheme : themeMode.textColor,
                    transform: "scale(1.1)",
                    "&:hover": {
                      transform: "scale(1.05)",
                      cursor: "pointer",
                    },
                    "&:active": {
                      transform: "scale(1)",
                    },
                  }}
                />
              </VideoIcons>
              <Box
                sx={{
                  mt: 1,
                  top: 117,
                  right: 16,
                  position: "absolute",
                  color: themeMode.textColor,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {amountLikes}
              </Box>
            </Box>
            <Box>
              <VideoIcons>
                <ChatBubbleRoundedIcon
                  sx={{
                    position: "relative",
                    color: themeMode.textColor,
                    transform: "scale(0.95)",
                    "&:hover": {
                      transform: "scale(0.93)",
                      cursor: "pointer",
                    },
                    "&:active": {
                      transform: "scale(0.9)",
                    },
                  }}
                />
              </VideoIcons>
              <Box
                sx={{
                  mt: 1,
                  top: 200,
                  right: 16,
                  position: "absolute",
                  color: themeMode.textColor,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {amountComments}
              </Box>
            </Box>
            <VideoIcons>
              <ReplyOutlinedIcon
                sx={{
                  pb: 0.2,
                  px: 0.1,
                  color: themeMode.textColor,
                  transform: "scale(1.4)",
                  "&:hover": {
                    transform: "scale(1.35)",
                    cursor: "pointer",
                  },
                  "&:active": {
                    transform: "scale(1.25)",
                  },
                }}
              />
            </VideoIcons>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <ArrowBackIosRoundedIcon
                sx={{
                  marginTop: 2,
                  color: themeMode.appTheme,
                  transform: "scale(1.8)",
                  "&:hover": {
                    transform: "scale(1.6)",
                    cursor: "pointer",
                  },
                  "&:active": {
                    transform: "scale(1.35)",
                  },
                }}
              />
            </Box>
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default VideoCardData;
