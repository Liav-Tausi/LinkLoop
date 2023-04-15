import axios from "axios";

export const getProfileData = async (accessToken, username) => {
  try {
    if (accessToken) {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/v1/profile/main/0/`,
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
    } else if (username) {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/v1/profile/main/?username=${username}`
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

export const patchProfileData = async (accessToken, elements) => {
  try {
    console.log(elements[6].value);
    if (accessToken) {
      const response = await axios.patch(
        `http://127.0.0.1:8000/api/v1/profile/main/0/`,
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
        `http://127.0.0.1:8000/api/v1/users/data/?username=${username}`
      );
      if (response.status < 300) {
        return response;
      } else {
        return false;
      }
    } else if (accessToken) {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/v1/users/data/0/",
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

export const getVideosOfUser = async (username) => {
  try {
    if (username) {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/v1/videos/main/?username=${username}`
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
      const response = await axios.get(
        "http://127.0.0.1:8000/api/v1/videos/main/",
        {
          Authorization: "Bearer " + accessToken,
        }
      );
      if (response.status < 300) {
        return await response.data.results;
      }
    } else {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/v1/videos/main/"
      );
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
      `http://127.0.0.1:8000/api/v1/videos/${videoId}/likes/0/`,
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
        `http://127.0.0.1:8000/api/v1/videos/${videoId}/likes/`,
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
        `http://127.0.0.1:8000/api/v1/videos/${videoId}/likes/0/`,
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
