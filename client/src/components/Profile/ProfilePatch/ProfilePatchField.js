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
import { useParams } from "react-router-dom";
import ScrollBar from "../../../utils/Comps/ScrollBar";


const ProfilePatchField = () => {
  const { themeMode, accessToken } = useContext(AppContext);
  const dispatch = useContext(AppDispatchContext);
  const [loading, setLoading] = useState(false);
  const params = useParams();
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
      skill_name: "",
      skill_level: 0,
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
      education_name: "",
      education_description: "",
      school_name: "",
      start_date: "0000-00-00",
      end_date: "0000-00-00",
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
      experience_name: "",
      experience_description: "",
      start_date: "0000-00-00",
      end_date: "0000-00-00",
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
      const profile = await getProfileData(accessToken, null);
      const location = profile.data.location;
      const cityArray = location ? location.split(" ") : [];
      const country = cityArray[0];
      const city = cityArray.slice(1).join(" ");
      if (profile) {
        setPatchData({
          fullName: `${profile.data.user.first_name} ${profile.data.user.last_name}`,
          headline: profile.data.headline,
          location: `${country} ${city}`,
          about: profile.data.about ? profile.data.about : "",
        });
      }
      const qualification = await getUserQual(params.username);
      if (qualification) {
        setExperienceData(qualification?.data?.experience);
        setEducationData(qualification?.data?.education);
        setSkillData(qualification?.data?.skills);
      }
    };

    fetchProfileData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (
        Object.values(errors).some((error) => error) ||
        experienceError.some((error) =>
          Object.values(error).some((val) => val)
        ) ||
        educationError.some((error) =>
          Object.values(error).some((val) => val)
        ) ||
        skillError
          .filter((error) => error !== undefined)
          .some((error) => Object.values(error).some((val) => val))
      ) {
        setLoading(false);
        dispatch({
          type: APP_ACTIONS.MESSAGE,
          payload:
            "Please correct the errors in the form before submitting again.",
        });
      } else {
        setLoading(true);
        const form = event.target;
        const elements = form.elements;
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
          setLoading(false);
        } else {
          dispatch({
            type: APP_ACTIONS.MESSAGE,
            payload: "ERROR! Did Not Save successfully.",
          });
        }
      }
    } catch (error) {
      dispatch({
        type: APP_ACTIONS.MESSAGE,
        payload: "ERROR! Did Not Save successfully.",
      });
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
      skill_name: event.target.value,
    };
    setSkillData(newSkillData);
  };

  const handleSkillLevelChange = (event, index) => {
    if (index < 0 || index >= skillData.length) return;

    const newSkillError = [...skillError];
    if (!newSkillError[index]) {
      newSkillError[index] = { skillLevelError: false };
    }
    newSkillError[index].skillLevelError = validateLevel(event.target.value);
    setSkillError(newSkillError);

    const newSkillData = [...skillData];
    newSkillData[index].skill_level = event.target.value;
    setSkillData(newSkillData);
  };

  const handleAddSkill = () => {
    setSkillData((prevData) => [
      ...prevData,
      {
        skill_name: "",
        skill_level: 0,
      },
    ]);
    setSkillError((prevError) => [
      ...prevError,
      {
        skillNameError: false,
        skillLevelError: false,
      },
    ]);
  };

  const handleDeleteSkill = (index) => {
    const newSkillData = [...skillData];
    delUserQual(accessToken, "skill", newSkillData[index].skill_name);
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
      education_name: event.target.value,
    };
    setEducationData(newEducationData);
  };

  const handleEducationDescriptionChange = (event, index) => {
    const newEducationError = [...educationError];
    if (!newEducationError[index]) {
      newEducationError[index] = { educationDescriptionError: false };
    }
    newEducationError[index].educationDescriptionError =
      !validateQualDescription(event.target.value);
    setEducationError(newEducationError);

    const newEducationData = [...educationData];
    newEducationData[index].education_description = event.target.value;
    setEducationData(newEducationData);
  };

  const handleEducationSchoolChange = (event, index) => {
    const newEducationError = [...educationError];
    if (!newEducationError[index]) {
      newEducationError[index] = { educationSchoolError: false };
    }
    newEducationError[index].educationSchoolError = !validateQualName(
      event.target.value
    );
    setEducationError(newEducationError);

    const newEducationData = [...educationData];
    newEducationData[index].school_name = event.target.value;
    setEducationData(newEducationData);
  };

  const handleEducationStartDateChange = (event, index) => {
    const newEducationData = [...educationData];
    newEducationData[index].start_date = event.target.value;
    const newEducationError = [...educationError];
    newEducationError[index].educationStartDateError = !validateStartDate(
      event.target.value,
      educationData[index].end_date
    );
    if (educationData[index].end_date) {
      newEducationError[index].educationEndDateError = !validateEndDate(
        educationData[index].end_date,
        event.target.value
      );
    }
    setEducationData(newEducationData);
    setEducationError(newEducationError);
  };

  const handleEducationEndDateChange = (event, index) => {
    const newEducationData = [...educationData];
    newEducationData[index].end_date = event.target.value;
    const newEducationError = [...educationError];
    newEducationError[index].educationEndDateError = !validateEndDate(
      event.target.value,
      educationData[index].end_date
    );
    if (educationData[index].start_date) {
      newEducationError[index].educationStartDateError = !validateStartDate(
        educationData[index].start_date,
        event.target.value
      );
    }
    setEducationData(newEducationData);
    setEducationError(newEducationError);
  };

  const handleAddEducation = () => {
    setEducationData((prevData) => [
      ...prevData,
      {
        education_name: "",
        education_description: "",
        education_school: "",
        start_date: "0000-00-00",
        end_date: "0000-00-00",
      },
    ]);
    setEducationError((prevError) => [
      ...prevError,
      {
        educationNameError: false,
        educationDescriptionError: false,
        educationSchool: false,
        educationStartDateError: false,
        educationEndDateError: false,
      },
    ]);
  };

  const handleDeleteEducation = (index) => {
    const newEducationData = [...educationData];
    delUserQual(
      accessToken,
      "education",
      newEducationData[index].education_name
    );
    newEducationData.splice(index, 1);
    setEducationData(newEducationData);

    const newEducationError = [...educationError];
    newEducationError.splice(index, 1);
    setEducationError(newEducationError);
  };

  // ---------------- Experience -----------------

  const handleExperienceNameChange = (event, index) => {
    if (index < 0 || index >= experienceData.length) return;

    const newExperienceError = [...experienceError];
    newExperienceError[index] = {
      ...newExperienceError[index],
      experienceNameError: !validateQualName(event.target.value),
    };
    setExperienceError(newExperienceError);

    const newExperienceData = [...experienceData];
    newExperienceData[index] = {
      ...newExperienceData[index],
      experience_name: event.target.value,
    };
    setExperienceData(newExperienceData);
  };

  const handleExperienceDescriptionChange = (event, index) => {
    const newExperienceError = [...experienceError];
    if (!newExperienceError[index]) {
      newExperienceError[index] = { experienceDescriptionError: false };
    }
    newExperienceError[index].experienceDescriptionError =
      !validateQualDescription(event.target.value);
    setExperienceError(newExperienceError);

    const newExperienceData = [...experienceData];
    newExperienceData[index].experience_description = event.target.value;
    setExperienceData(newExperienceData);
  };

  const handleExperienceStartDateChange = (event, index) => {
    const newExperienceData = [...experienceData];
    newExperienceData[index].start_date = event.target.value;
    const newExperienceError = [...experienceError];
    newExperienceError[index].experienceStartDateError = !validateStartDate(
      event.target.value,
      experienceData[index].end_date
    );
    if (experienceData[index].end_date) {
      newExperienceError[index].experienceEndDateError = !validateEndDate(
        experienceData[index].end_date,
        event.target.value
      );
    }
    setExperienceData(newExperienceData);
    setExperienceError(newExperienceError);
  };

  const handleExperienceEndDateChange = (event, index) => {
    const newExperienceData = [...experienceData];
    newExperienceData[index].end_date = event.target.value;
    const newExperienceError = [...experienceError];
    newExperienceError[index].experienceEndDateError = !validateEndDate(
      event.target.value,
      experienceData[index].start_date
    );
    if (experienceData[index].start_date) {
      newExperienceError[index].experienceStartDateError = !validateStartDate(
        experienceData[index].start_date,
        event.target.value
      );
    }
    setExperienceData(newExperienceData);
    setExperienceError(newExperienceError);
  };

  const handleAddExperience = () => {
    setExperienceData((prevData) => [
      ...prevData,
      {
        experience_name: "",
        experience_description: "",
        start_date: "0000-00-00",
        end_date: "0000-00-00",
      },
    ]);
    setExperienceError((prevError) => [
      ...prevError,
      {
        experienceNameError: false,
        experienceDescriptionError: false,
        experienceStartDateError: false,
        experienceEndDateError: false,
      },
    ]);
  };

  const handleDeleteExperience = (index) => {
    const newExperienceData = [...experienceData];
    delUserQual(
      accessToken,
      "experience",
      newExperienceData[index].experience_name
    );
    newExperienceData.splice(index, 1);
    setExperienceData(newExperienceData);

    const newExperienceError = [...experienceError];
    newExperienceError.splice(index, 1);
    setExperienceError(newExperienceError);
  };

  return (
    <>
      {loading && <Loading />}
      <ScrollBar maxHeight={"520px"}>
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
      </ScrollBar>
    </>
  );
};

export default ProfilePatchField;
