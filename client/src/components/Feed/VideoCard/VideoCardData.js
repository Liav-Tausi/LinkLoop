import { Box, Grid, Stack } from "@mui/material";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import ChatBubbleRoundedIcon from "@mui/icons-material/ChatBubbleRounded";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import { useContext, useEffect, useState } from "react";
import {
  APP_ACTIONS,
  AppContext,
  AppDispatchContext,
  IsSmallScreenContext,
} from "../../../App/AppStates/AppReducer";
import { videoLike } from "../../../utils/funcs/mainFuncs";
import SignIn from "../../NavBar/Menu/Sign/SignIn/SignIn";
import VideoIcons from "./VideoIcons";

const VideoCardData = (props) => {
  const { themeMode, accessToken, signInOpen } = useContext(AppContext);
  const dispatch = useContext(AppDispatchContext);
  const isSmallScreen = useContext(IsSmallScreenContext);
  const [likeState, setLikeState] = useState(false);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    if (props.liked) {
      setLikeState(true);
    }
  }, []);

  useEffect(() => {
    if (!accessToken) {
      setLikeState(false);
    }
  }, [accessToken]);

  const handleLike = async () => {
    if (accessToken) {
      if (!likeState) {
        setLikeState(true);
        await videoLike(props.videoId, accessToken, false);
      } else if (likeState) {
        setLikeState(false);
        await videoLike(props.videoId, accessToken, true);
      } else {
        return false;
      }
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
          <Stack gap={4} color={"white"}>
            <VideoIcons>
              <FavoriteRoundedIcon
                onClick={handleLike}
                sx={{
                  color: likeState
                    ? themeMode.appTheme
                    : themeMode.theme === "light"
                    ? "#c7c7c7"
                    : themeMode.textColor,
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
            <VideoIcons>
              <ChatBubbleRoundedIcon
                sx={{
                  color:
                    themeMode.theme === "light"
                      ? "#c7c7c7"
                      : themeMode.textColor,
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
            <VideoIcons>
              <ReplyOutlinedIcon
                sx={{
                  pb: 0.2,
                  px: 0.1,
                  color:
                    themeMode.theme === "light"
                      ? "#c7c7c7"
                      : themeMode.textColor,
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
