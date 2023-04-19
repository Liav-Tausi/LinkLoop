

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

export const validateExperienceStartDate = (
  experienceStartDate,
  experienceEndDate
) => {
  console.log(experienceStartDate, experienceEndDate);
  if (!experienceStartDate || !experienceEndDate) return false; 
  const startDate = new Date(experienceStartDate);
  const endDate = new Date(experienceEndDate);
  return startDate <= endDate;
};

export const validateExperienceEndDate = (
  experienceEndDate,
  experienceStartDate
) => {
  if (!experienceStartDate || !experienceEndDate) return false; 
  const startDate = new Date(experienceStartDate);
  const endDate = new Date(experienceEndDate);
  return endDate >= startDate;
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
