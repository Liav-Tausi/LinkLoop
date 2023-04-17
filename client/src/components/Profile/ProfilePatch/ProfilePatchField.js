import { Box, Stack, Button } from "@mui/material";
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
  validateExperienceDescription,
  validateExperienceEndDate,
  validateExperienceName,
  validateExperienceStartDate,
  validateFullName,
  validateHeadline,
} from "../../../utils/funcs/formValidators";
import {
  getProfileData,
  patchProfileData,
} from "../../../utils/funcs/mainFuncs";
import ProfilePatchMultiline from "./ProfilePatchMultiline";
import ProfilePatchExperience from "./ProfilePatchExperience/ProfilePatchExperience";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const ProfilePatchField = () => {
  const { themeMode, accessToken } = useContext(AppContext);
  const dispatch = useContext(AppDispatchContext);
  const isSmallScreen = useContext(IsSmallScreenContext);
  const [formSubmit, setFormSubmit] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [numExperiences, setNumExperiences] = useState(false);
  const [patchData, setPatchData] = useState({
    fullName: "",
    headline: "",
    location: "",
    about: "",
    skills: "",
    experience: [
      {
        experienceName: "",
        experienceDescription: "",
        experienceStartDate: "",
        experienceEndDate: "",
      },
    ],
    education: "",
  });

  const [errors, setErrors] = useState({
    fullNameError: false,
    headlineError: false,
    aboutError: false,
    experienceError: [
      {
        experienceNameError: false,
        experienceDescriptionError: false,
        experienceStartDateError: false,
        experienceEndDateError: false,
      },
    ],
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
        experience: profileData.experience ? profileData.experience : "",
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
      console.log(retVal);
      dispatch({
        type: APP_ACTIONS.MESSAGE,
        payload: "Saved successfully.",
      });
      dispatch({
        type: APP_ACTIONS.PROFILE_PATCH,
      });
    }
  };

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

  const handleExperienceNameChange = (event) => {
    setErrors((error) => ({
      ...error,
      experienceError: {
        ...error.experienceError,
        experienceNameError: !validateExperienceName(event.target.value),
      },
    }));
    setPatchData((data) => ({
      ...data,
      experience: {
        ...data.experience,
        experienceName: event.target.value,
      },
    }));
  };

  const handleExperienceDescriptionChange = (event) => {
    setErrors((error) => ({
      ...error,
      experienceError: {
        ...error.experienceError,
        experienceDescriptionError: !validateExperienceDescription(
          event.target.value
        ),
      },
    }));
    setPatchData((data) => ({
      ...data,
      experience: {
        ...data.experience,
        experienceDescription: event.target.value,
      },
    }));
  };

  const handleExperienceStartDateChange = (event) => {
    setErrors((error) => ({
      ...error,
      experienceError: {
        ...error.experienceError,
        experienceStartDateError: !validateExperienceStartDate(
          event.target.value
        ),
      },
    }));
    setPatchData((data) => ({
      ...data,
      experience: {
        ...data.experience,
        experienceStartDate: event.target.value,
      },
    }));
  };

  const handleExperienceEndDateChange = (event) => {
    setErrors((error) => ({
      ...error,
      experienceError: {
        ...error.experienceError,
        experienceEndDateError: !validateExperienceEndDate(event.target.value),
      },
    }));
    setPatchData((data) => ({
      ...data,
      experience: {
        ...data.experience,
        experienceEndDate: event.target.value,
      },
    }));
  };

  const handleDeleteExperience = () => {
    setNumExperiences(false);
  };

  return (
    <Box
      sx={{
        overflowY: "scroll",
        maxHeight: "520px",
        "&::-webkit-scrollbar": {
          borderRadius: "3px",
          width: "6px",
        },
        "&::-webkit-scrollbar-track": {
          borderRadius: "3px",
          background: themeMode.feed,
        },
        "&::-webkit-scrollbar-thumb": {
          background: themeMode.signUpBubbles,
          borderRadius: "3px",
        },
        "&::-webkit-scrollbar-thumb:hover": {
          background: themeMode.appTheme,
        },
      }}
    >
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
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <ProfilePatchMultiline
            handleAboutChange={handleAboutChange}
            profileData={profileData?.about}
            errors={errors.about}
            patchData={patchData?.about}
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
              onClick={() => setNumExperiences(true)}
              sx={{
                color: themeMode.textColor,
                background: themeMode.signUpField,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "15px",
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
                py: 0.3,
                fontSize: 12,
                gap: 1,
              }}
            >
              Add New Experiences
              <AddCircleIcon />
            </Box>
          </Box>
          {numExperiences && (
            <ProfilePatchExperience
              errors={errors.experienceError}
              patchData={patchData.experience}
              handleExperienceNameChange={handleExperienceNameChange}
              handleExperienceDescriptionChange={
                handleExperienceDescriptionChange
              }
              handleExperienceStartDateChange={handleExperienceStartDateChange}
              handleExperienceEndDateChange={handleExperienceEndDateChange}
              handleDeleteExperience={handleDeleteExperience}
            />
          )}
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
    </Box>
  );
};

export default ProfilePatchField;
