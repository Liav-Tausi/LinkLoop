import {
  APP_ACTIONS,
  AppContext,
  AppDispatchContext,
  IsSmallScreenContext,
} from "../../../../App/AppStates/AppReducer";
import VideoIcons from "../VideoIcons";
import { Link, useLocation } from "react-router-dom";
import VideoUpDownButtons from "../VideoUpDownButtons";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import ChatBubbleRoundedIcon from "@mui/icons-material/ChatBubbleRounded";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Box, Grid, Stack } from "@mui/material";
import { useContext } from "react";


const VideoCardDataDefault = (props) => {
  const { themeMode } = useContext(AppContext);
  const dispatch = useContext(AppDispatchContext);
  const isSmallScreen = useContext(IsSmallScreenContext);
  const location = useLocation();
  const currentPathname = location.pathname;
  const hasComments = currentPathname.includes("/comments");
  let newUrl = currentPathname;
  if (!hasComments) {
    newUrl += "/comments"; 
  } else {
    newUrl = newUrl.replace("/comments", ""); 
  }

  return (
    <Box>
      <Box
        sx={{
          position: "absolute",
          bottom: 65,
          left: "auto",
          right: 0,
          px: 2,
          py: 0.5,
          backgroundColor: "transparent",
          fontWeight: "thin",
          color: "white",
          textAlign: "right",
        }}
      >
        <Grid container direction="column" justifyContent="center">
          <Box
            sx={{
              textAlign: "right",
              fontSize: "12px",
              color: themeMode.textColor,
              textShadow:
                themeMode.theme == "dark"
                  ? "1px 2px 5px rgba(0, 0, 0, 1)"
                  : "1px 2px 4px rgba(0, 0, 0, 0.4)",
            }}
          >
            {props.videoViews} views
          </Box>
          <Box
            sx={{
              fontSize: 17,
              textAlign: "right",
              color: themeMode.textColor,
              textShadow:
                themeMode.theme == "dark"
                  ? "1px 2px 5px rgba(0, 0, 0, 1)"
                  : "1px 2px 4px rgba(0, 0, 0, 0.4)",
            }}
          >
            {props.title}
          </Box>
          <Box
            sx={{
              fontSize: 14,
              textAlign: "right",
              color: themeMode.textColor,
              textShadow:
                themeMode.theme == "dark"
                  ? "1px 2px 5px rgba(0, 0, 0, 1)"
                  : "1px 2px 4px rgba(0, 0, 0, 0.4)",
            }}
          >
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
          color: themeMode.textColor,
          textShadow:
            themeMode.theme == "dark"
              ? "1px 2px 5px rgba(0, 0, 0, 1)"
              : "1px 2px 5px rgba(0, 0, 0, 0.4)",
        }}
      >
        {props.date?.split("T")[0]}
      </Box>
      <VideoUpDownButtons
        comments={props.comments}
        nextVideo={props.nextVideo}
        previousVideo={props.previousVideo}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: isSmallScreen ? 85 : 50,
          left: isSmallScreen ? 5 : -65,
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
                  <Box sx={{ width: 40, height: 40 }}>
                    <img
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: "50%",
                        objectFit: "cover",
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
                position: "absolute",
                top: "40px",
                left: "50%",
                transform: "translateX(-50%)",
                whiteSpace: "nowrap",
                color: themeMode.textColor,
                display: "flex",
                justifyContent: "center",
                fontSize: "8px",
              }}
            >
              {`${props.userProfile?.user?.first_name} ${props.userProfile?.user?.last_name}`}
            </Box>
          </Box>
          <Box>
            <VideoIcons>
              <FavoriteRoundedIcon
                onClick={props.handleLike}
                sx={{
                  position: "relative",
                  color: props.liked ? themeMode.appTheme : themeMode.textColor,
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
                right: 16.5,
                position: "absolute",
                color: themeMode.textColor,
                display: "flex",
                justifyContent: "center",
              }}
            >
              {props.amountLikes}
            </Box>
          </Box>
          <Box>
            <Link to={newUrl}>
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
            </Link>
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
              {props.amountComments}
            </Box>
          </Box>
          <Box>
            <VideoIcons>
              <ReplyOutlinedIcon
                onClick={() => {
                  dispatch({
                    type: APP_ACTIONS.SHARE_VIDEO,
                  });
                }}
                sx={{
                  pb: 0.2,
                  px: 0.12,
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
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <ArrowBackIosRoundedIcon
              onClick={() => dispatch({ type: APP_ACTIONS.NOT_IMPLEMENTED })}
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
  );
};

export default VideoCardDataDefault;
