import { Box } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import CircularProgress from "@mui/material/CircularProgress";
import { useContext, useState } from "react";
import {
  APP_ACTIONS,
  AppContext,
  AppDispatchContext,
  IsSmallScreenContext,
} from "../../../App/AppStates/AppReducer";
import ScrollBar from "../../../utils/Comps/ScrollBar";
import SignFieldTemp from "../../NavBar/Menu/Sign/SignFieldTemp";
import Comment from "./Comment";
import { createComments } from "../../../utils/funcs/mainFuncs";

const CommentsOnPc = (props) => {
  const { themeMode, accessToken } = useContext(AppContext);
  const isSmallScreen = useContext(IsSmallScreenContext);
  const [submit, setSubmit] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useContext(AppDispatchContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (accessToken) {
      setLoading(true);
      const response = await createComments(
        accessToken,
        props.video.id,
        event.target[0].value
      );
      if (response) {
        setLoading(false);
        dispatch({
          type: APP_ACTIONS.MESSAGE,
          payload: "Comment has been Added.",
        });
      } else {
        setLoading(false);
        dispatch({
          type: APP_ACTIONS.MESSAGE,
          payload: "ERROR! Comment has not been Added.",
        });
      }
    } else {
      dispatch({
        type: APP_ACTIONS.SIGN_IN_OPEN,
      });
    }
  };

  return (
    <>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "start",
          flexDirection: "column",
          width: "100%",
          mt: 1,
          pb: 0.5,
        }}
      >
        <ScrollBar maxHeight={525}>
          {[...props.commentsContent].reverse().map((comment) => (
            <Comment
              loading={loading}
              comment={comment}
              key={comment.id}
              video={props.video}
            />
          ))}
        </ScrollBar>
      </Box>
      <form onSubmit={(event) => handleSubmit(event)} style={{ width: "100%" }}>
        <SignFieldTemp
          comments={true}
          placeholder={"Add a comment..."}
          autocomplete={"text"}
          handleChange={props.handleCommentChange}
          error={props.commentError}
          sign={props.commentData}
          padding="11px"
          paddingL="18px"
          multiline={true}
          maxRows={isSmallScreen ? 2 : 3}
        >
          <button
            disabled={loading}
            type="submit"
            style={{
              p: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              border: "none",
              background: "none",
              outline: "none",
              flex: 1,
            }}
            onMouseOver={() => setSubmit(true)}
            onMouseLeave={() => setSubmit(false)}
          >
            {loading ? (
              <CircularProgress
                thickness={2}
                size="1.7rem"
                sx={{ color: themeMode.appTheme }}
              />
            ) : (
              <SendIcon
                sx={{
                  cursor: "pointer",
                  color: submit ? themeMode.secTextColor : themeMode.textColor,
                  transform: "scale(1)",
                  "&:hover": {
                    transform: "scale(1.01)",
                    cursor: "pointer",
                  },
                  "&:active": {
                    transform: "scale(0.9)",
                  },
                }}
              />
            )}
          </button>
        </SignFieldTemp>
      </form>
    </>
  );
};

export default CommentsOnPc;
