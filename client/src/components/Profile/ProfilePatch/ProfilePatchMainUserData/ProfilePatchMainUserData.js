import { useContext } from "react";
import { AppContext } from "../../../../App/AppStates/AppReducer";
import { Box, Stack } from "@mui/material";
import ProfilePatchLocation from "../ProfilePatchLocation";
import SignFieldTemp from "../../../NavBar/Menu/Sign/SignFieldTemp";

const ProfilePatchMainUserData = (props) => {
    const { themeMode } = useContext(AppContext);
    
  return (
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
            <Box
              sx={{
                color: themeMode.textColor,
                ml: 2,
                my: 0.5,
                fontSize: 12,
              }}
            >
              How others will see you:
            </Box>
            <SignFieldTemp
              placeholder="Full Name"
              autocomplete={"text"}
              handleChange={props.handleFullNameChange}
              error={props.errors.fullNameError}
              sign={props.patchData?.fullName}
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
              Your professional headline:
            </Box>
            <SignFieldTemp
              placeholder="Headline"
              autocomplete={"text"}
              handleChange={props.handleHeadLineChange}
              error={props.errors.headlineError}
              sign={props.patchData.headline}
              padding="8px"
              paddingL="18px"
              multiline={false}
              maxRows={1}
            />
          </Box>
          <ProfilePatchLocation
            location={props.patchData?.location}
            handleLocationChange={props.handleLocationChange}
          />
        </Stack>
      </Box>
  );
}


export default ProfilePatchMainUserData;