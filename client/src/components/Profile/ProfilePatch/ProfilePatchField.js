import { Box } from "@mui/material";
import {
  APP_ACTIONS,
  AppContext,
  AppDispatchContext,
} from "../../../App/AppStates/AppReducer";
import { useContext, useEffect, useState } from "react";
import SignSubmit from "../../NavBar/Menu/Sign/SignSubmit";
import {
  validateAbout,
  validateEndDate,
  validateFullName,
  validateHeadline,
  validateLevel,
  validateQualDescription,
  validateQualName,
  validateStartDate,
} from "../../../utils/funcs/formValidators";
import {
  delUserQual,
  getProfileData,
  getUserQual,
  patchProfileData,
} from "../../../utils/funcs/mainFuncs";
import ProfilePatchMultiline from "./ProfilePatchMultiline";
import ProfilePatchExperience from "./ProfilePatchExperience/ProfilePatchExperience";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ProfilePatchEducation from "./ProfilePatchEducation/ProfilePatchEducation";
import ProfilePatchSkill from "./ProfilePatchSkill/ProfilePatchSkill";
import ProfilePatchMainUserData from "./ProfilePatchMainUserData/ProfilePatchMainUserData";
import Loading from "../../../utils/Comps/Loading";

const ProfilePatchField = () => {
  const { themeMode, accessToken, user } = useContext(AppContext);
  const dispatch = useContext(AppDispatchContext);
  const [formSubmit, setFormSubmit] = useState(true);
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

  const [skillData, setSkillData] = useState([
    {
      skillName: "",
      skillLevel: 0,
    },
  ]);

  const [skillError, setSkillError] = useState([
    {
      skillNameError: false,
      skillLevelError: false,
    },
  ]);

  const [educationData, setEducationData] = useState([
    {
      educationName: "",
      educationDescription: "",
      educationSchool: "",
      educationStartDate: "0000-00-00",
      educationEndDate: "0000-00-00",
    },
  ]);

  const [educationError, setEducationError] = useState([
    {
      educationNameError: false,
      educationDescriptionError: false,
      educationSchoolError: false,
      educationStartDateError: false,
      educationEndDateError: false,
    },
  ]);

  const [experienceData, setExperienceData] = useState([
    {
      experienceName: "",
      experienceDescription: "",
      experienceStartDate: "0000-00-00",
      experienceEndDate: "0000-00-00",
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
  useEffect(() => {
    const fetchProfileData = async () => {
      const retVal = await getProfileData(accessToken, null);
      const location = retVal.data.location;
      const cityArray = location ? location.split(" ") : [];
      const country = cityArray[0];
      const city = cityArray.slice(1).join(" ");
      if (retVal) {
        setPatchData({
          fullName: `${retVal.data.user.first_name} ${retVal.data.user.last_name}`,
          headline: retVal.data.headline,
          location: `${country} ${city}`,
          about: retVal.data.about ? retVal.data.about : "",
        });
      }
      const retVal2 = await getUserQual(accessToken, "experience");
      if (retVal2) {
        const newData = retVal2.data.results.map((experience) => ({
          experienceName: experience.experience_name,
          experienceDescription: experience.experience_description,
          experienceStartDate: experience.start_date,
          experienceEndDate: experience.end_date,
        }));
        setExperienceData(newData);
      }
      const retVal3 = await getUserQual(accessToken, "education");
      if (retVal3) {
        const newData = retVal3.data.results.map((education) => ({
          educationName: education.education_name,
          educationDescription: education.education_description,
          educationSchool: education.school_name,
          educationStartDate: education.start_date,
          educationEndDate: education.end_date,
        }));
        setEducationData(newData);
      }
      const retVal4 = await getUserQual(accessToken, "skill");
      if (retVal4) {
        const newData = retVal4.data.results.map((skill) => ({
          skillName: skill.skill_name,
          skillLevel: skill.skill_level,
        }));
        setSkillData(newData);
      }
    };

    fetchProfileData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormSubmit(true);
    if (
      Object.values(errors).some((error) => error) ||
      experienceError.some((error) =>
        Object.values(error).some((val) => val)
      ) ||
      educationError.some((error) => Object.values(error).some((val) => val)) ||
      skillError.some((error) => Object.values(error).some((val) => val))
    ) {
      dispatch({
        type: APP_ACTIONS.MESSAGE,
        payload:
          "Please correct the errors in the form before submitting again.",
      });
    } else {
      const form = event.target;
      const elements = form.elements;
      setFormSubmit(false);
      const response = await patchProfileData(
        accessToken,
        elements,
        experienceData,
        educationData,
        skillData
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

  // -------------------- User --------------------

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

  // ---------------- skill --------------------

  const handleSkillNameChange = (event, index) => {
    if (index < 0 || index >= skillData.length) return;

    const newSkillError = [...skillError];
    newSkillError[index] = {
      ...newSkillError[index],
      skillNameError: !validateQualName(event.target.value),
    };
    setSkillError(newSkillError);

    const newSkillData = [...skillData];
    newSkillData[index] = {
      ...newSkillData[index],
      skillName: event.target.value,
    };
    setSkillData(newSkillData);
  };

  const handleSkillLevelChange = (event, index) => {
    const newSkillError = [...skillError];
    newSkillError[index].skillLevelError = validateLevel(event.target.value);
    setSkillError(newSkillError);

    const newSkillData = [...skillData];
    newSkillData[index].skillLevel = event.target.value;
    setSkillData(newSkillData);
  };

  const handleAddSkill = () => {
    setSkillData((prevData) => [...prevData, {}]);
    setSkillError((prevError) => [...prevError, {}]);
  };

  const handleDeleteSkill = (index) => {
    const newSkillData = [...skillData];
    delUserQual(accessToken, "skill", newSkillData[index].skillName);
    newSkillData.splice(index, 1);
    setSkillData(newSkillData);

    const newSkillError = [...skillError];
    newSkillError.splice(index, 1);
    setSkillError(newSkillError);
  };

  // ---------------- Education -----------------

  const handleEducationNameChange = (event, index) => {
    if (index < 0 || index >= educationData.length) return;

    const newEducationError = [...educationError];
    newEducationError[index] = {
      ...newEducationError[index],
      educationNameError: !validateQualName(event.target.value),
    };
    setEducationError(newEducationError);

    const newEducationData = [...educationData];
    newEducationData[index] = {
      ...newEducationData[index],
      educationName: event.target.value,
    };
    setEducationData(newEducationData);
  };

  const handleEducationDescriptionChange = (event, index) => {
    const newEducationError = [...educationError];
    newEducationError[index].educationDescriptionError =
      !validateQualDescription(event.target.value);
    setEducationError(newEducationError);

    const newEducationData = [...educationData];
    newEducationData[index].educationDescription = event.target.value;
    setEducationData(newEducationData);
  };

  const handleEducationSchoolChange = (event, index) => {
    const newEducationError = [...educationError];
    newEducationError[index].educationSchoolError = !validateQualName(
      event.target.value
    );
    setEducationError(newEducationError);

    const newEducationData = [...educationData];
    newEducationData[index].educationSchool = event.target.value;
    setEducationData(newEducationData);
  };

  const handleEducationStartDateChange = (event, index) => {
    const newEducationData = [...educationData];
    newEducationData[index].educationStartDate = event.target.value;
    const newEducationError = [...educationError];
    newEducationError[index].educationStartDateError = !validateStartDate(
      event.target.value,
      educationData[index].educationEndDate
    );
    if (educationData[index].educationEndDate) {
      newEducationError[index].educationEndDateError = !validateEndDate(
        educationData[index].educationEndDate,
        event.target.value
      );
    }
    setEducationData(newEducationData);
    setEducationError(newEducationError);
  };

  const handleEducationEndDateChange = (event, index) => {
    const newEducationData = [...educationData];
    newEducationData[index].educationEndDate = event.target.value;
    const newEducationError = [...educationError];
    newEducationError[index].educationEndDateError = !validateEndDate(
      event.target.value,
      educationData[index].educationStartDate
    );
    if (educationData[index].educationStartDate) {
      newEducationError[index].educationStartDateError = !validateStartDate(
        educationData[index].educationStartDate,
        event.target.value
      );
    }
    setEducationData(newEducationData);
    setEducationError(newEducationError);
  };

  const handleAddEducation = () => {
    setEducationData((prevData) => [...prevData, {}]);
    setEducationError((prevError) => [...prevError, {}]);
  };
  const handleDeleteEducation = (index) => {
    const newEducationData = [...educationData];
    delUserQual(
      accessToken,
      "education",
      newEducationData[index].educationName
    );
    newEducationData.splice(index, 1);
    setEducationData(newEducationData);

    const newEducationError = [...educationError];
    newEducationError.splice(index, 1);
    setEducationError(newEducationError);
  };

  // ---------------- Experience -----------------

  const handleExperienceNameChange = (event, index) => {
    if (index < 0 || index >= educationData.length) return;

    const newExperienceError = [...experienceError];
    newExperienceError[index] = {
      ...newExperienceError[index],
      experienceNameError: !validateQualName(event.target.value),
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
      !validateQualDescription(event.target.value);
    setExperienceError(newExperienceError);

    const newExperienceData = [...experienceData];
    newExperienceData[index].experienceDescription = event.target.value;
    setExperienceData(newExperienceData);
  };

  const handleExperienceStartDateChange = (event, index) => {
    const newExperienceData = [...experienceData];
    newExperienceData[index].experienceStartDate = event.target.value;
    const newExperienceError = [...experienceError];
    newExperienceError[index].experienceStartDateError = !validateStartDate(
      event.target.value,
      experienceData[index].experienceEndDate
    );
    if (experienceData[index].experienceEndDate) {
      newExperienceError[index].experienceEndDateError = !validateEndDate(
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
    newExperienceError[index].experienceEndDateError = !validateEndDate(
      event.target.value,
      experienceData[index].experienceStartDate
    );
    if (experienceData[index].experienceStartDate) {
      newExperienceError[index].experienceStartDateError = !validateStartDate(
        experienceData[index].experienceStartDate,
        event.target.value
      );
    }
    setExperienceData(newExperienceData);
    setExperienceError(newExperienceError);
  };

  const handleAddExperience = () => {
    setExperienceData((prevData) => [...prevData, {}]);
    setExperienceError((prevError) => [...prevError, {}]);
  };

  const handleDeleteExperience = (index) => {
    const newExperienceData = [...experienceData];
    delUserQual(
      accessToken,
      "experience",
      newExperienceData[index].experienceName
    );
    newExperienceData.splice(index, 1);
    setExperienceData(newExperienceData);

    const newExperienceError = [...experienceError];
    newExperienceError.splice(index, 1);
    setExperienceError(newExperienceError);
  };

  return (
    <>
      {!formSubmit && <Loading />}
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
          <ProfilePatchMainUserData
            patchData={patchData}
            errors={errors}
            handleFullNameChange={handleFullNameChange}
            handleHeadLineChange={handleHeadLineChange}
            handleLocationChange={handleLocationChange}
          />
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <ProfilePatchMultiline
              handleAboutChange={handleAboutChange}
              profileData={patchData?.about}
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
                onClick={handleAddExperience}
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
                onClick={handleAddEducation}
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
                Add New Education
                <AddCircleIcon />
              </Box>
            </Box>
            {educationData.map((education, index) => (
              <ProfilePatchEducation
                key={index}
                educationData={education}
                educationError={educationError[index]}
                handleEducationNameChange={(event) =>
                  handleEducationNameChange(event, index)
                }
                handleEducationDescriptionChange={(event) =>
                  handleEducationDescriptionChange(event, index)
                }
                handleEducationStartDateChange={(event) =>
                  handleEducationStartDateChange(event, index)
                }
                handleEducationEndDateChange={(event) =>
                  handleEducationEndDateChange(event, index)
                }
                handleEducationSchoolChange={(event) =>
                  handleEducationSchoolChange(event, index)
                }
                handleDeleteEducation={() => handleDeleteEducation(index)}
              />
            ))}

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
                onClick={handleAddSkill}
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
                Add New Skill
                <AddCircleIcon />
              </Box>
            </Box>
            {skillData.map((skill, index) => (
              <ProfilePatchSkill
                key={index}
                skillData={skill}
                skillError={skillError[index]}
                handleSkillNameChange={(event) =>
                  handleSkillNameChange(event, index)
                }
                handleSkillLevelChange={(event) =>
                  handleSkillLevelChange(event, index)
                }
                handleDeleteSkill={() => handleDeleteSkill(index)}
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
    </>
  );
};

export default ProfilePatchField;
