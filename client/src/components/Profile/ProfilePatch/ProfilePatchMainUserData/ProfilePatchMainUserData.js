import { useContext } from "react";
import { AppContext } from "../../../../App/AppStates/AppReducer";
import { Box, Stack } from "@mui/material";
import ProfilePatchLocation from "../ProfilePatchLocation";
import SignFieldTemp from "../../../NavBar/Menu/Sign/SignFieldTemp";
import ProfilePatchMultiline from "../ProfilePatchMultiline";
import AddCircleIcon from "@mui/icons-material/AddCircle";




const ProfilePatchMainUserData = (props) => {
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
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <ProfilePatchMultiline
          handleAboutChange={props.handleAboutChange}
          profileData={props.patchData?.about}
          errors={props.errors.about}
          patchData={props.patchData?.about}
          text={"About"}
        />
        <Box
          sx={{
            mx: 2,
            py: 0.3,
            borderRadius: "25px",
            display: "flex",
            justifyContent: "start",
            backgroundColor: themeMode.signUpBubbles,
          }}
        >
          <Box
            onClick={props.handleAddExperience}
            sx={{
              color: themeMode.textColor,
              background: themeMode.signUpField,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "25px",
              "&:hover": {
                backgroundColor: themeMode.signUpFieldHover,
                cursor: "pointer",
              },
              "&:active": {
                transform: "scale(0.98)",
              },
              px: 2,
              mx: 2,
              my: 0.5,
              py: 0.7,
              fontSize: 12,
              gap: 1,
            }}
          >
            Add New Experience
            <AddCircleIcon />
          </Box>
        </Box>
      </Box>
    </>
  );
}


export default ProfilePatchMainUserData;