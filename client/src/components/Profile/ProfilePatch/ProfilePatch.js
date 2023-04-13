import { Box, Container, IconButton } from "@mui/material";
import { useContext } from "react";
import { APP_ACTIONS, AppContext, AppDispatchContext, Ref } from "../../../App/AppStates/AppReducer";
import BlurBack from "../../../utils/Comps/BlurBack";
import AppLogo from "../../../assets/imgs/AppLogo.svg"
import { Link } from "react-router-dom";
import PaperBack from "../../../utils/Comps/PaperBack";
import SignSubmit from "../../NavBar/Menu/Sign/SignSubmit";
import ProfilePatchField from "./ProfilePatchField";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const ProfilePatch = () => {
  const { themeMode } = useContext(AppContext);
  const dispatch = useContext(AppDispatchContext);
  const ref = useContext(Ref);

  return (
    <BlurBack>
      <PaperBack
        id="profilePatch"
        height={666}
        width={666}
        smallHeight={600}
        boxShadow={10}
      >
        <Box>
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
                  onClick={() => {
                    dispatch({
                      type: APP_ACTIONS.PROFILE_PATCH,
                    });
                  }}
                >
                  <img
                    src={AppLogo}
                    style={{ width: 35 }}
                    alt="linkLoop logo"
                  ></img>
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
          <ProfilePatchField />
        </Box>
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
      </PaperBack>
    </BlurBack>
  );
};

export default ProfilePatch;
