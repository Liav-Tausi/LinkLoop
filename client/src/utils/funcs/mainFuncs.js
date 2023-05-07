import axios from "axios";
import { URL, APIV1, SEARCH, VIDEOS, MAIN, QUALS, PROFILE, USERS, AUTH} from "../config/conf";

export const searchQuery = async (query) => {
  try {
    if (query) {
      const response = await axios.get(
        `${URL}${APIV1}${SEARCH}query/?q=${query}`
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

export const getGoogleClientId = async () => {
  try {
    const response = await axios.get(`${URL}${APIV1}${AUTH}google_client_id/`);
   if (response.status < 300) {
     return response;
   } else {
     return false;
   }
  } catch {
    return false
  }
}


export const postVideo = async (accessToken, title, topic, description, file) => {
  try {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('topic', topic);
    formData.append('description', description);
    formData.append('video', file);

    const response = await axios.post(
      `${URL}${APIV1}${VIDEOS}${MAIN}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    
    if (response.status < 300) {
      return response;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}

export const deleteVideo = async (accessToken, videoId) => {
  const response = await axios.delete(`${URL}${APIV1}${VIDEOS}${MAIN}${videoId}/`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (response.status < 300) {
    return response;
  } else {
    return false;
  }
};


export const getProfileData = async (accessToken, username) => {
  try {
    if (accessToken) {
      const response = await axios.get(`${URL}${APIV1}${PROFILE}${MAIN}0/`, {
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
        `${URL}${APIV1}${PROFILE}${MAIN}?username=${username}`
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
      `${URL}${APIV1}${PROFILE}${MAIN}0/`,
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
            `${URL}${APIV1}${QUALS}skill/`,
            {
              skill_name: skill.skill_name,
              skill_level: skill.skill_level,
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
    try {
      if (
        error.response.data?.skill_name?.map(
          (val) => val === "skill with this skill name already exists."
        )
      ) {
        let name = "";
        error.response.data?.skill_name?.map((val) => (name = val));
        if (skillData) {
          let response = null;
          const skillResponses = await Promise.all(
            skillData.map(async (skill) => {
              if (name === "skill with this skill name already exists.") {
                response = await delUserQual(
                  accessToken,
                  "skill",
                  skill.skill_name,
                  "name"
                );
              }
              if (response.status === 204) {
                return await axios.post(
                  `${URL}${APIV1}${QUALS}skill/`,
                  {
                    skill_name: skill.skill_name,
                    skill_level: skill.skill_level,
                  },
                  {
                    headers: {
                      Authorization: `Bearer ${accessToken}`,
                    },
                  }
                );
              }
            })
          );
          if (skillResponses.every((response) => response.status < 300)) {
            return true;
          } else {
            return false;
          }
        }
      } else {
        return false;
      }
    } catch (error) {
      if (
        error.response.data?.skill_name?.map(
          (val) => val === "skill with this skill name already exists."
        )
      ) {
        return true;
      } else {
        return false;
      }
    }
  }
};

export const patchProfileDataEducation = async (accessToken, educationData) => {
  try {
    if (educationData) {
      const educationResponses = await Promise.all(
        educationData.map(async (education) => {
          return await axios.post(
            `${URL}${APIV1}${QUALS}education/`,
            {
              education_name: education.education_name,
              school_name: education.school_name,
              education_description: education.education_description,
              start_date: education.start_date,
              end_date: education.end_date,
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
    try {
      if (
        error.response.data?.education_name?.map(
          (val) => val === "education with this education name already exists."
        ) ||
        error.response.data?.education_description?.map(
          (val) =>
            val === "education with this education description already exists."
        )
      ) {
        let description = "";
        let name = "";
        error.response.data?.education_name?.map((val) => (name = val)) ||
          error.response.data?.education_description?.map(
            (val) => (description = val)
          );

        if (educationData) {
          let response = null;
          const educationResponses = await Promise.all(
            educationData.map(async (education) => {
              if (
                name === "education with this education name already exists."
              ) {
                response = await delUserQual(
                  accessToken,
                  "education",
                  education.education_description,
                  "description"
                );
              } else if (
                description ===
                "education with this education description already exists."
              ) {
                response = await delUserQual(
                  accessToken,
                  "education",
                  education.education_name
                );
              }
              if (response.status === 204) {
                return await axios.post(
                  `${URL}${APIV1}${QUALS}education/`,
                  {
                    education_name: education.education_name,
                    education_description: education.education_description,
                    school_name: education.school_name,
                    start_date: education.start_date,
                    end_date: education.end_date,
                  },
                  {
                    headers: {
                      Authorization: `Bearer ${accessToken}`,
                    },
                  }
                );
              }
            })
          );
          if (educationResponses.every((response) => response.status < 300)) {
            return true;
          } else {
            return false;
          }
        }
      } else {
        return false;
      }
    } catch (error) {
      if (
        error.response.data?.education_name?.map(
          (val) => val === "education with this education name already exists."
        ) ||
        error.response.data?.education_description?.map(
          (val) =>
            val === "education with this education description already exists."
        )
      ) {
        return true;
      } else {
        return false;
      }
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
            `${URL}${APIV1}${QUALS}experience/`,
            {
              experience_name: experience.experience_name,
              experience_description: experience.experience_description,
              start_date: experience.start_date,
              end_date: experience.end_date,
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
    try {
      if (
        error.response.data?.experience_name?.map(
          (val) =>
            val === "experience with this experience name already exists."
        ) ||
        error.response.data?.experience_description?.map(
          (val) =>
            val ===
            "experience with this experience description already exists."
        )
      ) {
        let description = "";
        let name = "";
        error.response.data?.experience_name?.map((val) => (name = val)) ||
          error.response.data?.experience_description?.map(
            (val) => (description = val)
          );
        if (experienceData) {
          let response = null;
          const experienceResponses = await Promise.all(
            experienceData.map(async (experience) => {
              if (
                name === "experience with this experience name already exists."
              ) {
                response = await delUserQual(
                  accessToken,
                  "experience",
                  experience.experience_name
                );
              } else if (
                description ===
                "experience with this experience description already exists."
              ) {
                response = await delUserQual(
                  accessToken,
                  "experience",
                  experience.experience_description,
                  "description"
                );
              }
              if (response.status === 204) {
                return await axios.post(
                  `${URL}${APIV1}${QUALS}experience/`,
                  {
                    experience_name: experience.experience_name,
                    experience_description: experience.experience_description,
                    start_date: experience.start_date,
                    end_date: experience.end_date,
                  },
                  {
                    headers: {
                      Authorization: `Bearer ${accessToken}`,
                    },
                  }
                );
              }
            })
          );
          if (experienceResponses.every((response) => response.status < 300)) {
            return true;
          } else {
            return false;
          }
        }
      } else {
        return false;
      }
    } catch (error) {
      if (
        error.response.data?.experience_name?.map(
          (val) =>
            val === "experience with this experience name already exists."
        ) ||
        error.response.data?.experience_description?.map(
          (val) =>
            val ===
            "experience with this experience description already exists."
        )
      ) {
        return true;
      } else {
        return false;
      }
    }
  }
};

export const getUserQual = async (username) => {
  try {
    if (username) {
      const response = await axios.get(
        `${URL}${APIV1}${QUALS}${MAIN}?username=${username}`
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

export const delUserQual = async (accessToken, type, name, by) => {
  try {
    if (!by) {
      by = "name";
    }
    if (accessToken) {
      const response = await axios.delete(
        `${URL}${APIV1}${QUALS}${type}0/?${type}_${by}=${name}`,
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
        `${URL}${APIV1}${USERS}data/?username=${username}`
      );
      if (response.status < 300) {
        return response;
      } else {
        return false;
      }
    } else if (accessToken) {
      const response = await axios.get(`${URL}${APIV1}${USERS}data/0/`, {
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
        `${URL}${APIV1}${VIDEOS}${MAIN}?username=${username}`
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
      const response = await axios.get(`${URL}${APIV1}${VIDEOS}${MAIN}`, {
        Authorization: "Bearer " + accessToken,
      });
      if (response.status < 300) {
        return await response.data.results;
      }
    } else {
      const response = await axios.get(`${URL}${APIV1}${VIDEOS}${MAIN}`);
      if (response.status < 300) {
        return await response.data.results;
      }
    }
  } catch (error) {
    return false;
  }
};

export const countLikes = async (videoId) => {
  try {
    const response = await axios.get(
      `${URL}${APIV1}${VIDEOS}${videoId}/likes/`,
    );
    const likeCount = response.data.like_count;
    if (response.status < 300) {
      return likeCount;
    }
  } catch (error) {
    return false;
  }
};

export const countComments = async (videoId) => {
  try {
    const response = await axios.get(
      `${URL}${APIV1}${VIDEOS}${videoId}/comments/`,
    );
    const commentCount = response.data.comment_count;
    if (response.status < 300) {
      return commentCount;
    }
  } catch (error) {
    return false;
  }
};

export const isLiked = async (videoId, accessToken) => {
  try {
    const response = await axios.get(
      `${URL}${APIV1}${VIDEOS}${videoId}/likes/0/`,
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
        `${URL}${APIV1}${VIDEOS}${videoId}/likes/`,
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
        `${URL}${APIV1}${VIDEOS}${videoId}/likes/0/`,
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
