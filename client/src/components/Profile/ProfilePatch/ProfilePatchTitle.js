import { Box, Container } from "@mui/material";
import { Link } from "react-router-dom";
import AppLogo from "../../../assets/imgs/AppLogo.svg";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import {
  APP_ACTIONS,
  AppContext,
  AppDispatchContext,
} from "../../../App/AppStates/AppReducer";
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
        onClick={() => {
          dispatch({
            type: APP_ACTIONS.PROFILE_PATCH,
          });
        }}
        sx={{
          display: "flex",
          justifyContent: "center",
          borderRadius: "50%",
          px: 0.7,
          py: 0.7,
          "&:hover": {
            backgroundColor: themeMode.navInputColor,
            cursor: "pointer",
          },
          "&:active": {
            transform: "scale(0.98)",
          },
        }}
      >
        <CloseRoundedIcon
          sx={{ transform: "scale(1.2)", color: themeMode.textColor }}
        />
      </Box>
    </Container>
  );
};

export default ProfilePatchTitle;
