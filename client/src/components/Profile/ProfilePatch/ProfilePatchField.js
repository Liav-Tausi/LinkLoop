import { Box, Stack } from "@mui/material";
import SignFieldTemp from "../../NavBar/Menu/Sign/SignFieldTemp";
import {
  APP_ACTIONS,
  AppContext,
  AppDispatchContext,
  IsSmallScreenContext,
} from "../../../App/AppStates/AppReducer";
import { useContext, useEffect, useState } from "react";
import SignSubmit from "../../NavBar/Menu/Sign/SignSubmit";
import ProfilePatchLocation from "./ProfilePatchLocation";
import {
  validateAbout,
  validateFullName,
  validateHeadline,
} from "../../../utils/funcs/formValidators";
import {
  getProfileData,
  patchProfileData,
} from "../../../utils/funcs/mainFuncs";

const ProfilePatchField = () => {
  const { themeMode, accessToken } = useContext(AppContext);
  const dispatch = useContext(AppDispatchContext);
  const isSmallScreen = useContext(IsSmallScreenContext);
  const [formSubmit, setFormSubmit] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [patchData, setPatchData] = useState({
    fullName: "",
    headline: "",
    location: "",
    about: "",
  });

  useEffect(() => {
    const fetchProfileData = async () => {
      const retVal = await getProfileData(accessToken, null);
      setProfileData(retVal.data);
    };
    fetchProfileData();
  }, []);

  useEffect(() => {
    if (profileData) {
      setPatchData({
        fullName: `${profileData?.user?.first_name} ${profileData?.user?.last_name}`,
        headline: profileData?.headline,
        location: `${profileData?.location.split(" ")[0]}
         ${profileData?.location.split(" ")}`,
        about: profileData.about ? profileData?.about : "",
      });
    }
  }, [profileData]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormSubmit(true);
    if (errors.fullNameError || errors.headlineError || errors.aboutError) {
      dispatch({
        type: APP_ACTIONS.MESSAGE,
        payload:
          "Please correct the errors in the form before submitting again.",
      });
    } else {
      const form = event.target;
      const elements = form.elements;
      const retVal = await patchProfileData(accessToken, elements);
      dispatch({
        type: APP_ACTIONS.MESSAGE,
        payload: "Your Personal Info have Change successfully.",
      });
      dispatch({
        type: APP_ACTIONS.PROFILE_PATCH
      })
    }
  };

  const [errors, setErrors] = useState({
    fullNameError: false,
    headlineError: false,
    aboutError: false,
  });

  const handleFullNameChange = (event) => {
    setErrors((error) => ({
      ...error,
      fullNameError: !validateFullName(event.target.value),
    }));
    setPatchData((data) => ({ ...data, fullName: event.target.value }));
  };

  const handleHeadLineChange = (event) => {
    setErrors((error) => ({
      ...error,
      headlineError: !validateHeadline(event.target.value),
    }));
    setPatchData((data) => ({ ...data, headline: event.target.value }));
  };

  const handleLocationChange = (country, city) => {
    setPatchData((data) => ({ ...data, location: `${country} ${city}` }));
  };

  const handleAboutChange = (event) => {
    setErrors((error) => ({
      ...error,
      aboutError: !validateAbout(event.target.value),
    }));
    setPatchData((data) => ({ ...data, about: event.target.value }));
  };

  return (
    <form onSubmit={handleSubmit}>
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
              sx={{ color: themeMode.textColor, ml: 2, my: 0.5, fontSize: 12 }}
            >
              How others will see you:
            </Box>
            <SignFieldTemp
              placeholder="Full Name"
              autocomplete={"text"}
              handleChange={handleFullNameChange}
              error={errors.fullNameError}
              sign={patchData.fullName}
              padding="8px"
              paddingL="18px"
              multiline={false}
              maxRows={1}
            />
          </Box>
          <Box>
            <Box
              sx={{ color: themeMode.textColor, ml: 2, my: 0.5, fontSize: 12 }}
            >
              Your professional headline:
            </Box>
            <SignFieldTemp
              placeholder="Headline"
              autocomplete={"text"}
              handleChange={handleHeadLineChange}
              error={errors.headlineError}
              sign={patchData.headline}
              padding="8px"
              paddingL="18px"
              multiline={false}
              maxRows={1}
            />
          </Box>
          <ProfilePatchLocation
            location={profileData?.location}
            handleLocationChange={handleLocationChange}
          />
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
          <Box
            sx={{ color: themeMode.textColor, ml: 2, my: 0.5, fontSize: 12 }}
          >
            About:
          </Box>
          <SignFieldTemp
            placeholder={profileData?.about}
            autocomplete={"text"}
            handleChange={handleAboutChange}
            error={errors.aboutError}
            sign={patchData.about}
            padding="13px"
            paddingL="18px"
            multiline={true}
            maxRows={isSmallScreen ? 2 : 4}
          />
        </Box>
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
    </form>
  );
};

export default ProfilePatchField;
