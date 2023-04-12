import {
  Box,
  Container,
  InputBase,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useContext } from "react";
import { AppContext, Ref } from "../../../App/AppStates/AppReducer";
import BlurBack from "../../../utils/Comps/BlurBack";
import SignFieldTemp from "../../NavBar/Menu/Sign/SignFieldTemp";

const ProfilePatch = () => {
  const { themeMode } = useContext(AppContext);
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
            sx={{ mb: 5, borderBottom: "solid 3px" + themeMode.signUpBubbles }}
          >
            <Box sx={{ fontSize: 25, my: 1, color: themeMode.textColor }}>
              Edit Personal Info:
            </Box>
          </Container>
          <Container
            sx={{
              backgroundColor: themeMode.signUpBubbles,
              borderRadius: "1%",
              py: 5,
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
          </Container>
        </Box>
      </Paper>
    </BlurBack>
  );
};

export default ProfilePatch;
