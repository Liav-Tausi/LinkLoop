import axios from "axios";
import { URL } from "../config/conf";

export const getProfileData = async (accessToken, username) => {
  try {
    if (accessToken) {
      const response = await axios.get(`${URL}/api/v1/profile/main/0/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.status < 300) {
        return response;
      } else {
        return false;
      }
    } else if (username) {
      const response = await axios.get(
        `${URL}/api/v1/profile/main/?username=${username}`
      );
      if (response.status < 300) {
        return response;
      } else {
        return false;
      }
    } else {
      return false;
    }
  } catch {
    return false;
  }
};

export const patchProfileData = async (
  accessToken,
  elements,
  experienceData,
  educationData,
  skillData
) => {
  if (accessToken) {
    const response = await axios.patch(
      `${URL}/api/v1/profile/main/0/`,
      {
        first_name:
          elements[0].value.split(" ")[0].charAt(0).toUpperCase() +
          elements[0].value.split(" ")[0].slice(1),
        last_name:
          elements[0].value.split(" ")[1].charAt(0).toUpperCase() +
          elements[0].value.split(" ")[1].slice(1),
        headline: elements[1].value,
        location: `${elements[2].value} ${elements[4].value}`,
        about: elements[6].value,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const profileExperience = await patchProfileDataExperience(
      accessToken,
      experienceData
    );
    const profileEducation = await patchProfileDataEducation(
      accessToken,
      educationData
    );
    const profileSkill = await patchProfileDataSkill(accessToken, skillData);
    if (
      response.status < 300 &&
      profileExperience &&
      profileEducation &&
      profileSkill
    ) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

export const patchProfileDataSkill = async (accessToken, skillData) => {
  try {
    if (skillData) {
      const skillResponses = await Promise.all(
        skillData.map(async (skill) => {
          return await axios.post(
            `${URL}/api/v1/quals/skill/`,
            {
              skill_name: skill.skillName,
              skill_level: skill.skillLevel,
            },
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
        })
      );
      if (skillResponses.every((response) => response.status < 300)) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  } catch (error) {
    if (
      error.response.data.skill_name[0] ===
      "skill with this skill name already exists."
    ) {
      const skillResponses = await Promise.all(
        skillData.map(async (skill) => {
          return await axios.patch(
            `${URL}/api/v1/quals/skill/0/?skill_name=${skill.skillName}`,
            {
              skill_name: skill.skillName,
              skill_level: skill.skillLevel,
            },
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
        })
      );
      if (skillResponses.every((response) => response.status < 300)) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
};

export const patchProfileDataEducation = async (accessToken, educationData) => {
  try {
    if (educationData) {
      const educationResponses = await Promise.all(
        educationData.map(async (education) => {
          return await axios.post(
            `${URL}/api/v1/quals/education/`,
            {
              education_name: education.educationName,
              education_description: education.educationDescription,
              school_name: education.educationSchool,
              start_date: education.educationStartDate,
              end_date: education.educationEndDate,
            },
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
        })
      );
      if (educationResponses.every((response) => response.status < 300)) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  } catch (error) {
    if (
      error.response.data.education_name[0] ===
      "education with this education name already exists."
    ) {
      const educationResponses = await Promise.all(
        educationData.map(async (education) => {
          return await axios.patch(
            `${URL}/api/v1/quals/education/0/?education_name=${education.educationName}`,
            {
              education_name: education.educationName,
              education_description: education.educationDescription,
              school_name: education.educationSchool,
              start_date: education.educationStartDate,
              end_date: education.educationEndDate,
            },
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
        })
      );
      if (educationResponses.every((response) => response.status < 300)) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
};

export const patchProfileDataExperience = async (
  accessToken,
  experienceData
) => {
  try {
    if (experienceData) {
      const experienceResponses = await Promise.all(
        experienceData.map(async (experience) => {
          return await axios.post(
            `${URL}/api/v1/quals/experience/`,
            {
              experience_name: experience.experienceName,
              experience_description: experience.experienceDescription,
              start_date: experience.experienceStartDate,
              end_date: experience.experienceEndDate,
            },
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
        })
      );
      if (experienceResponses.every((response) => response.status < 300)) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  } catch (error) {
    if (
      error.response.data.experience_name[0] ===
      "experience with this experience name already exists."
    ) {
      const experienceResponses = await Promise.all(
        experienceData.map(async (experience) => {
          return await axios.patch(
            `${URL}/api/v1/quals/experience/0/?experience_name=${experience.experienceName}`,
            {
              experience_name: experience.experienceName,
              experience_description: experience.experienceDescription,
              start_date: experience.experienceStartDate,
              end_date: experience.experienceEndDate,
            },
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
        })
      );
      if (experienceResponses.every((response) => response.status < 300)) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
};


export const getUserQual= async (accessToken, type) => {
  try {
    if (accessToken) {
      const response = await axios.get(`${URL}/api/v1/quals/${type}/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.status < 300) {
        return response;
      } else {
        return false;
      }
    } else {
      return false;
    }
  } catch {
    return false;
  }
};


export const delUserQual = async (accessToken, type, name) => {
  try {
    if (accessToken) {
      const response = await axios.delete(
        `${URL}/api/v1/quals/${type}/0/?${type}_name=${name}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.status < 300) {
        return response;
      } else {
        return false;
      }
    } else {
      return false;
    }
  } catch {
    return false;
  }
};



export const getUserData = async (accessToken, username) => {
  try {
    if (username) {
      const response = await axios.get(
        `${URL}/api/v1/users/data/?username=${username}`
      );
      if (response.status < 300) {
        return response;
      } else {
        return false;
      }
    } else if (accessToken) {
      const response = await axios.get(`${URL}/api/v1/users/data/0/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.status < 300) {
        return response;
      } else {
        return false;
      }
    } else {
      return false;
    }
  } catch {
    return false;
  }
};

export const getVideosOfUser = async (username) => {
  try {
    if (username) {
      const response = await axios.get(
        `${URL}/api/v1/videos/main/?username=${username}`
      );
      if (response.status < 300) {
        return response;
      } else {
        return false;
      }
    } else {
      return false;
    }
  } catch {
    return false;
  }
};

export const getFeedData = async (accessToken) => {
  try {
    if (accessToken) {
      const response = await axios.get(`${URL}/api/v1/videos/main/`, {
        Authorization: "Bearer " + accessToken,
      });
      if (response.status < 300) {
        return await response.data.results;
      }
    } else {
      const response = await axios.get(`${URL}/api/v1/videos/main/`);
      if (response.status < 300) {
        return await response.data.results;
      }
    }
  } catch (error) {
    return false;
  }
};

export const isLiked = async (videoId, accessToken) => {
  try {
    const response = await axios.get(
      `${URL}/api/v1/videos/${videoId}/likes/0/`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (response.status < 300) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

export const videoLike = async (videoId, accessToken, remove) => {
  try {
    if (videoId && !remove) {
      const response = await axios.post(
        `${URL}/api/v1/videos/${videoId}/likes/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response < 300) {
        return response;
      } else {
        return false;
      }
    } else if (videoId && remove) {
      const response = await axios.delete(
        `${URL}/api/v1/videos/${videoId}/likes/0/`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response < 300) {
        return response;
      } else {
        return false;
      }
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};
