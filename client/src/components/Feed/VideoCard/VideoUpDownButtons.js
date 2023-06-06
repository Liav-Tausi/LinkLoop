import { Box, Stack } from "@mui/material";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import VideoIcons from "./VideoIcons";
import { Link } from "react-router-dom";
import {
  APP_ACTIONS,
  AppContext,
  AppDispatchContext,
  IsSmallScreenContext,
} from "../../../App/AppStates/AppReducer";
import { useContext } from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const VideoUpDownButtons = (props) => {
  const { themeMode } = useContext(AppContext);
  const dispatch = useContext(AppDispatchContext);
  const isSmallScreen = useContext(IsSmallScreenContext);

  return (
    <Box sx={{ flex: 1 }}>
      <Box
        sx={{
          position: "absolute",
          bottom: isSmallScreen ? 165 : 50,
          right: isSmallScreen ? 5 : props.comments ? -455 : -65,
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
              {props.nextVideo && (
                <Link to={`/${props.nextVideo}`}>
                  <VideoIcons arrow={true}>
                    <KeyboardArrowDownIcon
                      sx={{
                        color: themeMode.textColor,
                        transform: "scale(1.5)",
                      }}
                    />
                  </VideoIcons>
                </Link>
              )}
            </Box>
          </Box>
        </Stack>
      </Box>
      <Box
        sx={{
          position: "absolute",
          top: isSmallScreen ? 145 : 50,
          right: isSmallScreen ? 5 : props.comments ? -455 : -65,
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
              {props.previousVideo && (
                <Link to={`/${props.previousVideo}`}>
                  <VideoIcons arrow={true}>
                    <KeyboardArrowUpIcon
                      sx={{
                        color: themeMode.textColor,
                        transform: "scale(1.5)",
                      }}
                    />
                  </VideoIcons>
                </Link>
              )}
            </Box>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default VideoUpDownButtons;
