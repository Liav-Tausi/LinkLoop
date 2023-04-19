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
  getUserExperience,
  patchProfileData,
} from "../../../utils/funcs/mainFuncs";
import ProfilePatchMultiline from "./ProfilePatchMultiline";
import ProfilePatchExperience from "./ProfilePatchExperience/ProfilePatchExperience";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const ProfilePatchField = () => {
  const { themeMode, accessToken, user } = useContext(AppContext);
  const dispatch = useContext(AppDispatchContext);
  const isSmallScreen = useContext(IsSmallScreenContext);
  const [formSubmit, setFormSubmit] = useState(true)
  const [profileData, setProfileData] = useState(null);
  const [numExperiences, setNumExperiences] = useState(false);
  const [experienceData, setExperienceData] = useState([
    {
      experienceName: "",
      experienceDescription: "",
      experienceStartDate: "",
      experienceEndDate: "",
    },
  ]);
  const [experienceError, setExperienceError] = useState([
    {
      experienceNameError: false,
      experienceDescriptionError: false,
      experienceStartDateError: false,
      experienceEndDateError: false,
    },
  ]);

  const [patchData, setPatchData] = useState({
    fullName: "",
    headline: "",
    location: "",
    about: "",
  });
  const [errors, setErrors] = useState({
    fullNameError: false,
    headlineError: false,
    aboutError: false,
  });

  useEffect(() => {
    const fetchProfileData = async () => {
      const retVal = await getProfileData(accessToken, null);
      setProfileData(retVal.data);
      const retVal2 = await getUserExperience(accessToken);
      setExperienceData(retVal2.data.results);
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
        about: profileData?.about ? profileData?.about : "",
      });
    }
  }, [profileData]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormSubmit(true);
    if (Object.values(errors).some((error) => error) ||
      experienceError.some((error) => Object.values(error).some((val) => val))
    ) {
      dispatch({
        type: APP_ACTIONS.MESSAGE,
        payload:
          "Please correct the errors in the form before submitting again.",
      });
    } else {
      const form = event.target;
      const elements = form.elements;
      const response = await patchProfileData(
        accessToken,
        elements,
        experienceData
      );
      if (response) {
        dispatch({
          type: APP_ACTIONS.MESSAGE,
          payload: "Saved successfully.",
        });
        dispatch({
          type: APP_ACTIONS.PROFILE_PATCH,
        });
      } else {
        dispatch({
          type: APP_ACTIONS.MESSAGE,
          payload: "ERROR! Did Not Save successfully.",
        });
      }
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

  const handleExperienceNameChange = (event, index) => {
    if (index < 0 || index >= experienceData.length) return;

    const newExperienceError = [...experienceError];
    newExperienceError[index] = {
      ...newExperienceError[index],
      experienceNameError: !validateExperienceName(event.target.value),
    };
    setExperienceError(newExperienceError);

    const newExperienceData = [...experienceData];
    newExperienceData[index] = {
      ...newExperienceData[index],
      experienceName: event.target.value,
    };
    setExperienceData(newExperienceData);
  };

  const handleExperienceDescriptionChange = (event, index) => {
    const newExperienceError = [...experienceError];
    newExperienceError[index].experienceDescriptionError =
      !validateExperienceDescription(event.target.value);
    setExperienceError(newExperienceError);

    const newExperienceData = [...experienceData];
    newExperienceData[index].experienceDescription = event.target.value;
    setExperienceData(newExperienceData);
  };

  const handleExperienceStartDateChange = (event, index) => {
    const newExperienceData = [...experienceData];
    newExperienceData[index].experienceStartDate = event.target.value;
    const newExperienceError = [...experienceError];
    newExperienceError[index].experienceStartDateError =
      !validateExperienceStartDate(
        event.target.value,
        experienceData[index].experienceEndDate
      );
    if (experienceData[index].experienceEndDate) {
      newExperienceError[index].experienceEndDateError =
        !validateExperienceEndDate(
          experienceData[index].experienceEndDate,
          event.target.value
        );
    }
    setExperienceData(newExperienceData);
    setExperienceError(newExperienceError);
  };
  const handleExperienceEndDateChange = (event, index) => {
    const newExperienceData = [...experienceData];
    newExperienceData[index].experienceEndDate = event.target.value;
    const newExperienceError = [...experienceError];
    newExperienceError[index].experienceEndDateError =
      !validateExperienceEndDate(
        event.target.value,
        experienceData[index].experienceStartDate
      );
    if (experienceData[index].experienceStartDate) {
      newExperienceError[index].experienceStartDateError =
        !validateExperienceStartDate(
          experienceData[index].experienceStartDate,
          event.target.value
        );
    }
    setExperienceData(newExperienceData);
    setExperienceError(newExperienceError);
  };


  const handleDeleteExperience = (index) => {
    const newExperienceData = [...experienceData];
    newExperienceData.splice(index, 1);
    setExperienceData(newExperienceData);

    const newExperienceError = [...experienceError];
    newExperienceError.splice(index, 1);
    setExperienceError(newExperienceError);
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
          {experienceData.map((experience, index) => (
            <ProfilePatchExperience
              key={index}
              experienceData={experience}
              experienceError={experienceError[index]}
              handleExperienceNameChange={(event) =>
                handleExperienceNameChange(event, index)
              }
              handleExperienceDescriptionChange={(event) =>
                handleExperienceDescriptionChange(event, index)
              }
              handleExperienceStartDateChange={(event) =>
                handleExperienceStartDateChange(event, index)
              }
              handleExperienceEndDateChange={(event) =>
                handleExperienceEndDateChange(event, index)
              }
              handleDeleteExperience={() => handleDeleteExperience(index)}
            />
          ))}
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
