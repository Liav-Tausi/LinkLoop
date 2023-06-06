import {
  Box,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
} from "@mui/material";
import {
  APP_ACTIONS,
  AppContext,
  AppDispatchContext,
  IsSmallScreenContext,
} from "../../../App/AppStates/AppReducer";
import { useContext } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { handleDeleteComment } from "../../../utils/funcs/mainFuncs";

const Comment = (props) => {
  const moment = require("moment");
  const { themeMode, connectedUser, accessToken } = useContext(AppContext);
  const isSmallScreen = useContext(IsSmallScreenContext);
  const { id, comment_text, created_time, profile } = props.comment;
  const currentTime = moment();
  const timeAgo = moment(created_time).from(currentTime);
  const dispatch = useContext(AppDispatchContext);

  const commentDelete = async () => {
    const response = await handleDeleteComment(accessToken, props.video.id, id);
    if (response) {
      dispatch({
        type: APP_ACTIONS.MESSAGE,
        payload: "comment has been deleted",
      });
    } else {
      dispatch({
        type: APP_ACTIONS.MESSAGE,
        payload: "ERROR! comment has not been deleted",
      });
    }
  };

  return (
    <List
      sx={{
        width: "100%",
        maxWidth: 360,
        borderTop: "1px solid" + themeMode.commentsBorder,
        borderBottom: "1px solid" + themeMode.commentsBorder,
      }}
    >
      {connectedUser?.username === profile.user.username && (
        <Box
          onClick={() => commentDelete()}
          sx={{
            borderRadius: "50%",
            position: "absolute",
            bottom: 4,
            right: 12,
            zIndex: 1000,
            p: isSmallScreen ? 0.3 : 0.1,
            display: props.loading ? "none" : "flex",
            justifyContent: "center",
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
          <DeleteIcon
            sx={{
              transform: isSmallScreen ? "scale(0.75)" : "scale(0.7)",
              color: themeMode.textColor,
            }}
          />
        </Box>
      )}
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="profile picture" src={profile.profile_picture} />
        </ListItemAvatar>
        <ListItemText
          sx={{ color: themeMode.secTextColor, fontSize: "10px" }}
          primary={
            <Box
              sx={{ fontSize: "12px" }}
            >{`${profile.user.first_name} ${profile.user.last_name}`}</Box>
          }
          secondary={
            <Box sx={{ color: themeMode.textColor }}>
              <Typography
                sx={{
                  display: "inline",
                  fontSize: "14px",
                  wordWrap: "break-word",
                  maxWidth: "100%",
                }}
                component="span"
                variant="body1"
                color={themeMode.textColor}
              >
                {comment_text}
              </Typography>
            </Box>
          }
        />
        <Typography
          sx={{
            color: themeMode.textColor,
            fontSize: "12px",
            whiteSpace: "nowrap",
          }}
        >
          {timeAgo}
        </Typography>
      </ListItem>
    </List>
  );
};

export default Comment;
