import axios from "axios";

export const detectColorScheme = () => {
  const isDarkMode =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: light)").matches;
  return isDarkMode ? "light" : "dark";
};

export const isLoggedIn = async (accessToken) => {
  const access = accessToken;
  if (await access) {
    return access;
  } else {
    const refresh = localStorage.getItem("refresh");
    if (refresh) {
      return await handleRefreshTokenResponse(refresh);
    } else {
      return false;
    }
  }
};

export const handleRefreshTokenResponse = async (refreshToken) => {
  try {
    const tokenResponse = await axios.post(
      "http://127.0.0.1:8000/api/v1/auth/token/refresh/",
      {
        refresh: refreshToken,
      }
    );
    if (tokenResponse.status === 200) {
      return tokenResponse.data.access;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

export const handleAccessTokenResponse = async (user) => {
  try {
    const tokenResponse = await axios.post(
      "http://127.0.0.1:8000/api/v1/auth/token/",
      {
        username: user[0],
        password: user[1],
      }
    );
    if (tokenResponse.status === 200) {
      return tokenResponse;
    } else {
      return false;
    }
  } catch {
    return false;
  }
};

export const signUpUser = async (user) => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/api/v1/users/signup/",
      {
        username: user[0].value,
        first_name: user[1].value.split(" ")[0],
        last_name: user[1].value.split(" ")[1],
        email: user[0].value,
        password: user[2].value,
        confirm_password: user[4].value,
        is_staff: false,
      }
    );
    if (response.status === 201) {
      const username = user[0].value;
      const password = user[2].value;
      const accessTokenResponse = await handleAccessTokenResponse([
        username,
        password,
      ]);
      if (accessTokenResponse.status === 200) {
        localStorage.setItem("refresh", accessTokenResponse.data.refresh);
        return accessTokenResponse.data.access;
      }
    } else {
      throw new Error(response);
    }
  } catch (error) {
    if (error.response) {
      const errorArray = Object.values(error.response.data);
      return errorArray;
    } else {
      return error;
    }
  }
};

export const signInUser = async (user) => {
  const username = user[0].value;
  const password = user[1].value;
  const accessTokenResponse = await handleAccessTokenResponse([
    username,
    password,
  ]);
  if (accessTokenResponse.status === 200) {
    localStorage.setItem("refresh", accessTokenResponse.data.refresh);
    return accessTokenResponse.data.access;
  } else {
    return false;
  }
};

export const logOut = async (refreshToken) => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/api/v1/auth/token/blacklist/",
      {
        refresh: refreshToken,
      }
    );
    if (response.status === 200) {
      localStorage.removeItem("refresh");
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

export const getFeedData = async (accessToken) => {
  if (await accessToken) {
    const response = await axios.get(
      "http://127.0.0.1:8000/api/v1/videos/main/",
      {
        Authorization: "Bearer " + accessToken,
      }
    );
    if (response.status === 200) {
      return await response.data.results;
    }
  } else {
    const response = await axios.get(
      "http://127.0.0.1:8000/api/v1/videos/main/"
    );
    if (response.status === 200) {
      return await response.data.results;
    }
  }
  return false;
};
