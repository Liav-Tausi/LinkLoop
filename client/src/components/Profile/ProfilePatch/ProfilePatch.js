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
import PaperBack from "../../../utils/Comps/PaperBack";

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
            <Box sx={{ fontSize: 25, my: 1, color: themeMode.textColor }}>
              Edit Personal Info:
            </Box>
            <Link to={"/"}>
              <Box
                p={1}
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
          </Container>
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
            <Stack
              sx={{
                gap: 3,
              }}
            >
              <Box>
                <Box sx={{ ml: 2, my: 0.5, fontSize: 12 }}>
                  How others will see you:
                </Box>
                <SignFieldTemp
                  placeholder="Full Name"
                  padding="8px"
                  paddingL="18px"
                />
              </Box>
              <Box>
                <Box sx={{ ml: 2, my: 0.5, fontSize: 12 }}>
                  Your professional headline:
                </Box>
                <SignFieldTemp
                  placeholder="Headline"
                  padding="8px"
                  paddingL="18px"
                />
              </Box>
              <Box>
                <Box sx={{ ml: 2, my: 0.5, fontSize: 12 }}>Your location:</Box>
                <SignFieldTemp
                  placeholder="Location"
                  padding="8px"
                  paddingL="18px"
                />
              </Box>
            </Stack>
          </Box>
          <Box
            sx={{
              backgroundColor: themeMode.signUpBubbles,
              borderRadius: "26px",
              py: 2,
              px: 2,
              mx: 2,
            }}
          >
            <Box>
              <Box sx={{ ml: 2, my: 0.5, fontSize: 12 }}>About:</Box>
              <SignFieldTemp
                placeholder=""
                padding="13px"
                paddingL="18px"
                multiline={true}
                row="6"
              />
            </Box>
          </Box>
        </Box>
      </PaperBack>
    </BlurBack>
  );
};

export default ProfilePatch;
