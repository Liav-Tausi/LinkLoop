import { Box, Stack, Button } from "@mui/material";
import { useContext, useState } from "react";
import {
  APP_ACTIONS,
  AppContext,
  AppDispatchContext,
  IsSmallScreenContext,
} from "../../../App/AppStates/AppReducer";
import SignFieldTemp from "../../NavBar/Menu/Sign/SignFieldTemp";
import {
  validateVideoDescription,
  validateVideoTitle,
} from "../../../utils/funcs/formValidators";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import ScrollBar from "../../../utils/Comps/ScrollBar";
import Loading from "../../../utils/Comps/Loading";
import SignSubmit from "../../NavBar/Menu/Sign/SignSubmit";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { postVideo } from "../../../utils/funcs/mainFuncs";



const ProfileAddVideoField = () => {
  const { themeMode, accessToken} = useContext(AppContext);
  const dispatch = useContext(AppDispatchContext)
  const isSmallScreen = useContext(IsSmallScreenContext);
  const [videoUrl, setVideoUrl] = useState("");
  const [file, setFile] = useState("");
  const [loading, setLoading] = useState(false);

  const [videoData, setPatchData] = useState({
    title: "",
    description: "",
    topic: "",
  });

  const [errors, setErrors] = useState({
    titleError: false,
    descriptionError: false,
    topicError: false,
    fileError: false,
  });

  const handleChange = (event) => {
    const addedFile = event.target.files[0];
    if (addedFile.size > 26214400) {
      setErrors((error) => ({
        ...error,
        fileError: true,
      }));
      setFile("");
    } else {
      setErrors((error) => ({
        ...error,
        fileError: false,
      }));
      setFile(addedFile);
      setVideoUrl(URL.createObjectURL(addedFile));
    }
  };

  const handleTitleChange = (event) => {
    setErrors((error) => ({
      ...error,
      titleError: !validateVideoTitle(event.target.value),
    }));
    setPatchData((data) => ({ ...data, title: event.target.value }));
  };

  const handleTopicChange = (event) => {
    setErrors((error) => ({
      ...error,
      topicError: !validateVideoTitle(event.target.value),
    }));
    setPatchData((data) => ({ ...data, topic: event.target.value }));
  };

  const handleDescriptionChange = (event) => {
    setErrors((error) => ({
      ...error,
      descriptionError: !validateVideoDescription(event.target.value),
    }));
    setPatchData((data) => ({ ...data, description: event.target.value }));
  };

  const handleDeleteFile = () => {
    setFile("")
    setVideoUrl("")
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const title = event.target[0].value
    const topic = event.target[1].value;
    const description = event.target[2].value;
    if (
      errors.titleError ||
      errors.topicError ||
      errors.descriptionError ||
      errors.fileError
    ) {
      dispatch({
        type: APP_ACTIONS.MESSAGE,
        payload:
          "Please correct the errors in the form before submitting again.",
      });
    } else {
      setLoading(true);
      const response = await postVideo(
        accessToken,
        title,
        topic,
        description,
        file
      );
      if (response) {
        setLoading(false)
        dispatch({
          type: APP_ACTIONS.MESSAGE,
          payload: "Video Has Been Added!"
        })
        dispatch({
          type: APP_ACTIONS.ADD_VIDEO
        });
      }
    }
  };
  return (
    <>
      {loading && <Loading />}
      <ScrollBar maxHeight={"465px"}>
        <Box
          sx={{
            backgroundColor: themeMode.signUpBubbles,
            borderRadius: "26px",
            py: 2,
            px: 2,
            mx: 2,
            mb: 3,
          }}
        >
          <form onSubmit={handleSubmit}>
            <Stack
              sx={{
                gap: 3,
              }}
            >
              <Box>
                <Box
                  sx={{
                    color: themeMode.textColor,
                    ml: 2,
                    my: 0.5,
                    fontSize: 12,
                  }}
                >
                  Your Video Title:
                </Box>
                <SignFieldTemp
                  placeholder="Title"
                  autocomplete={"text"}
                  handleChange={handleTitleChange}
                  error={errors.titleError}
                  sign={videoData.title}
                  padding="8px"
                  paddingL="18px"
                  multiline={false}
                  maxRows={1}
                />
              </Box>
              <Box>
                <Box
                  sx={{
                    color: themeMode.textColor,
                    ml: 2,
                    my: 0.5,
                    fontSize: 12,
                  }}
                >
                  Topic of Video:
                </Box>
                <SignFieldTemp
                  placeholder="Topic"
                  autocomplete={"text"}
                  handleChange={handleTopicChange}
                  error={errors.topicError}
                  sign={videoData.topic}
                  padding="8px"
                  paddingL="18px"
                  multiline={false}
                  maxRows={1}
                />
              </Box>
              <Box>
                <Box
                  sx={{
                    color: themeMode.textColor,
                    ml: 2,
                    my: 0.5,
                    fontSize: 12,
                  }}
                >
                  Description:
                </Box>
                <SignFieldTemp
                  placeholder="Description"
                  autocomplete={"text"}
                  handleChange={handleDescriptionChange}
                  error={errors.descriptionError}
                  sign={videoData.description}
                  padding="12px"
                  paddingL="18px"
                  multiline={true}
                  maxRows={isSmallScreen ? 2 : 4}
                />
              </Box>
              <Box
                sx={{
                  border:
                    "1px solid" +
                    (errors.fileError
                      ? themeMode.appTheme
                      : themeMode.signUpFieldHover)
                      ? file && "none"
                      : "none",
                  display: "flex",
                  justifyContent: "center",
                  borderRadius: "13px",
                  p: 0,
                }}
              >
                {file === "" ? (
                  <Button
                    variant="contained"
                    component="label"
                    sx={{
                      borderRadius: "13px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      p: 3,
                      flex: 1,
                      color: themeMode.textColor,
                      backgroundColor: themeMode.signUpFieldHover,
                      "&:hover": {
                        backgroundColor: themeMode.signUpField,
                      },
                    }}
                  >
                    <PlayCircleIcon
                      sx={{ color: themeMode.textColor, fontSize: 65 }}
                    />
                    <Box sx={{ textAlign: "center" }}>Upload a Video</Box>
                    <input
                      hidden
                      type="file"
                      onChange={handleChange}
                      accept="video/*"
                      required
                    />
                  </Button>
                ) : (
                  <Box
                    sx={{
                      mt: 2,
                      display: "flex",
                      justifyContent: "center",
                      flexDirection: "column",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        position: "relative",
                        border:
                          "7px solid" +
                          (errors.fileError
                            ? themeMode.appTheme
                            : themeMode.signUpFieldHover),
                        borderRadius: "5px",
                      }}
                    >
                      <video
                        src={videoUrl}
                        style={{
                          width: "100%",
                          height: "100%",
                        }}
                        controls
                        required
                      />
                      <Box
                        onClick={handleDeleteFile}
                        sx={{
                          display: loading ? "none" : "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          borderRadius: "50%",
                          position: "absolute",
                          top: 5,
                          right: 5,
                          zIndex: 9999,
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
                    </Box>
                  </Box>
                )}
              </Box>
            </Stack>
            <Box
              sx={{
                position: "absolute",
                display: "flex",
                justifyContent: "center",
                bottom: 22,
                left: "50%",
                right: "50%",
              }}
            >
              <SignSubmit />
            </Box>
          </form>
        </Box>
      </ScrollBar>
    </>
  );
};

export default ProfileAddVideoField;
