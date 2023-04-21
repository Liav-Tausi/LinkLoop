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
  experienceData
) => {
  try {
    if (accessToken) {
      const response1 = await axios.patch(
        `${URL}/api/v1/profile/main/0/`,
        {
          first_name: elements[0].value.split(" ")[0],
          last_name: elements[0].value.split(" ")[1],
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
        if (
          response1.status < 300 &&
          experienceResponses.every((response) => response.status < 300)
        ) {
          return [response1, ...experienceResponses];
        } else {
          return false;
        }
      } else {
        return false;
      }
    }
  } catch (error) {
    if (
      error.response.data.results ===
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

export const getUserExperience = async (accessToken) => {
  try {
    if (accessToken) {
      const response = await axios.get(`${URL}/api/v1/quals/experience/`, {
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

export const delUserExperience = async (accessToken, experienceName) => {
  try {
    if (accessToken) {
      const response = await axios.delete(
        `${URL}/api/v1/quals/experience/0/?experience_name=${experienceName}`,
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
