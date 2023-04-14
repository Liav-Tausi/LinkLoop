import { Box, Container, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import AppLogo from "../../../assets/imgs/AppLogo.svg";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { APP_ACTIONS, AppContext, AppDispatchContext } from "../../../App/AppStates/AppReducer";
import { useContext } from "react";

const ProfilePatchTitle = () => {
  const { themeMode } = useContext(AppContext);
  const dispatch = useContext(AppDispatchContext);


  return (
    <Container
      sx={{
        mb: 3,
        borderBottom: "solid 3px" + themeMode.signUpBubbles,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: 25,
          my: 1,
          color: themeMode.textColor,
        }}
      >
        <Link to={"/"}>
          <Box
            pl={0}
            pr={1}
            cursor="pointer"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            onClick={() => {
              dispatch({
                type: APP_ACTIONS.PROFILE_PATCH,
              });
            }}
          >
            <img src={AppLogo} style={{ width: 35 }} alt="linkLoop logo"></img>
          </Box>
        </Link>
        Edit Personal Info:
      </Box>
      <Box
        p={1}
        cursor="pointer"
        onClick={() => {
          dispatch({
            type: APP_ACTIONS.PROFILE_PATCH,
          });
        }}
      >
        <IconButton>
          <CloseRoundedIcon sx={{ transform: "scale(1.2)" }} />
        </IconButton>
      </Box>
    </Container>
  );
}

export default ProfilePatchTitle;