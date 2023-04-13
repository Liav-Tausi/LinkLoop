import { Box, Stack } from "@mui/material";
import SignFieldTemp from "../../NavBar/Menu/Sign/SignFieldTemp";
import { AppContext } from "../../../App/AppStates/AppReducer";
import { useContext } from "react";

const ProfilePatchField = () => {
   const { themeMode } = useContext(AppContext);

  return (
    <>
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
            multiline={false}
            maxRows={1}
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
            multiline={false}
            maxRows={1}
          />
        </Box>
        <Box>
          <Box sx={{ ml: 2, my: 0.5, fontSize: 12 }}>Your location:</Box>
          <SignFieldTemp
            placeholder="Location"
            padding="8px"
            paddingL="18px"
            multiline={false}
            maxRows={1}
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
      <Box sx={{ position: "relative" }}>
        <Box sx={{ ml: 2, my: 0.5, fontSize: 12 }}>About:</Box>
        <SignFieldTemp
          placeholder=""
          padding="13px"
          paddingL="18px"
          multiline={true}
          maxRows={5}
        />
      </Box>
    </Box>
    </>
  );
};

export default ProfilePatchField; 