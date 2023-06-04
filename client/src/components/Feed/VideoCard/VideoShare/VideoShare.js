import {
  TwitterShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
  FacebookMessengerShareButton,
  EmailShareButton,
  TwitterIcon,
  TelegramIcon,
  WhatsappIcon,
  LinkedinIcon,
  FacebookMessengerIcon,
  EmailIcon,
} from "react-share";
import { Box } from "@mui/material";
import BlurBack from "../../../../utils/Comps/BlurBack";
import PaperBack from "../../../../utils/Comps/PaperBack";
import ProfileVideoAndPatchAndPicTitle from "../../../Profile/ProfileVideoAndPatchAndPicTitle";
import {
  APP_ACTIONS,
  AppContext,
  AppDispatchContext,
  IsSmallScreenContext,
} from "../../../../App/AppStates/AppReducer";
import { useContext } from "react";
import SignFieldTemp from "../../../NavBar/Menu/Sign/SignFieldTemp";

const VideoShare = (props) => {
  const { themeMode } = useContext(AppContext)
  const dispatch = useContext(AppDispatchContext);
  const isSmallScreen = useContext(IsSmallScreenContext)
  const shareUrl = window.location.href;
  const title = "Check out this linkLoop video!";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      dispatch({
        type: APP_ACTIONS.MESSAGE,
        payload: "Video URL copied",
      });
    } catch (error) {
       dispatch({
         type: APP_ACTIONS.MESSAGE,
         payload: "ERROR! Failed to copy to clipboard",
       });
    }
  };

  return (
    <>
      <BlurBack>
        <PaperBack
          id="shareVideo"
          height={350}
          width={425}
          smallHeight={350}
          smallWidth={425}
          verySmallWidth={350}
          verySmallHeight={270}
          boxShadow={10}
        >
          <ProfileVideoAndPatchAndPicTitle
            text={"Share Video"}
            func={() => dispatch({ type: APP_ACTIONS.SHARE_VIDEO })}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: isSmallScreen ? 3 : 5,
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: 1,
                color: themeMode.textColor,
              }}
            >
              <span style={{ color: themeMode.appTheme }}>Title: </span>
              <Box>{props.title}</Box>
            </Box>
            <Box sx={{ px: 0.5 }}>
              <Box
                sx={{
                  ml: 3,
                  mb: 1,
                  fontSize: "11px",
                  color: themeMode.appTheme,
                }}
              >
                click for copy
              </Box>
              <Box sx={{ mx: 1 }}>
                <SignFieldTemp
                  readOnly={true}
                  autocomplete={"text"}
                  sign={window.location.href}
                  padding="5px"
                  paddingL="18px"
                  multiline={false}
                  maxRows={1}
                  handleCopy={handleCopy}
                />
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: 2,
                mx: 2,
              }}
            >
              <TwitterShareButton url={shareUrl} title={title}>
                <TwitterIcon size={isSmallScreen ? 42 : 50} round={true} />
              </TwitterShareButton>
              <TelegramShareButton url={shareUrl} title={title}>
                <TelegramIcon size={isSmallScreen ? 42 : 50} round={true} />
              </TelegramShareButton>
              <WhatsappShareButton url={shareUrl} title={title}>
                <WhatsappIcon size={isSmallScreen ? 42 : 50} round={true} />
              </WhatsappShareButton>
              <LinkedinShareButton url={shareUrl} title={title}>
                <LinkedinIcon size={isSmallScreen ? 42 : 50} round={true} />
              </LinkedinShareButton>
              <FacebookMessengerShareButton url={shareUrl} title={title}>
                <FacebookMessengerIcon
                  size={isSmallScreen ? 42 : 50}
                  round={true}
                />
              </FacebookMessengerShareButton>
              <EmailShareButton url={shareUrl} title={title}>
                <EmailIcon size={isSmallScreen ? 42 : 50} round={true} />
              </EmailShareButton>
            </Box>
          </Box>
        </PaperBack>
      </BlurBack>
    </>
  );
};

export default VideoShare;
