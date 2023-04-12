import {
  Box,
  Container,
  Paper,
  Stack,
} from "@mui/material";
import { useContext } from "react";
import { APP_ACTIONS, AppContext, AppDispatchContext, Ref } from "../../../App/AppStates/AppReducer";
import BlurBack from "../../../utils/Comps/BlurBack";
import SignFieldTemp from "../../NavBar/Menu/Sign/SignFieldTemp";
import AppLogo from "../../../assets/imgs/AppLogo.svg"
import { Link } from "react-router-dom";

const ProfilePatch = () => {
  const { themeMode } = useContext(AppContext);
  const dispatch = useContext(AppDispatchContext);
  const ref = useContext(Ref);

  return (
    <BlurBack>
      <Paper
        ref={ref}
        id="profilePatch"
        sx={{
          boxShadow: 10,
          mt: 1,
          zIndex: 9999,
          borderRadius: "25px",
          backgroundColor: themeMode.sign,
          position: "fixed",
          left: "50%",
          top: "47%",
          height: 666,
          width: 666,
          transform: "translate(-50%, -50%)",
          "@media (max-width: 600px)": {
            height: 600,
            width: 350,
          },
          "@media (max-width: 428px)": {
            height: 650,
            width: 330,
          },
        }}
      >
        <Box>
          <Container
            sx={{
              mb: 5,
              borderBottom: "solid 3px" + themeMode.signUpBubbles,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ fontSize: 25, my: 1, color: themeMode.textColor }}>
              Edit Personal Info:
            </Box>
            <Link to={"/"}>
              <Box p={1} cursor="pointer" onClick={() => {
                dispatch({
                type: APP_ACTIONS.PROFILE_PATCH
              })}}>
                <img
                  src={AppLogo}
                  style={{ width: 35 }}
                  alt="linkLoop logo"
                ></img>
              </Box>
            </Link>
          </Container>
          <Box
            sx={{
              backgroundColor: themeMode.signUpBubbles,
              borderRadius: "26px",
              py: 2,
              px: 2,
              mx: 2,
            }}
          >
            <Stack
              sx={{
                gap: 3,
              }}
            >
              <SignFieldTemp placeholder={"Full Name"} />
              <SignFieldTemp placeholder={"Headline"} />
              <SignFieldTemp placeholder={"Location"} />
            </Stack>
          </Box>
        </Box>
      </Paper>
    </BlurBack>
  );
};

export default ProfilePatch;
