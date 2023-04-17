export const validateEmail = (email) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

export const validateHeadline = (headline) => {
  return headline.length >= 3 && headline.length <= 64;
};

export const validateExperienceName = (experienceName) => {
  return experienceName.length >= 3 && experienceName.length <= 32;
};

export const validateExperienceDescription = (experienceDescription) => {
  return (
    experienceDescription.length >= 3 && experienceDescription.length <= 300
  );
};

export const validateExperienceStartDate = (experienceStartDate) => {
  return experienceStartDate.length >= 3 && experienceStartDate.length <= 500;
};

export const validateExperienceEndDate = (experienceEndDate) => {
  return experienceEndDate.length >= 3 && experienceEndDate.length <= 500;
};

export const validateAbout = (headline) => {
  return headline.length >= 3 && headline.length <= 500;
};

export const validateFullName = (fullName) => {
  const re = /^[A-Za-z]+\s[A-Za-z]+$/;
  return re.test(fullName);
};

export const validatePassword = (password) => {
  return password.length < 8;
};

export const validateConfirmPassword = (confirmPassword, password) => {
  return confirmPassword !== password;
};
