export const validateEmail = (email) => {
  const re = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
  return re.test(email);
};

export const validateHeadline = (headline) => {
  return (
    headline.length >= 3 && headline.length <= 64 && !/^\s+$/.test(headline)
  );
};

export const validateVideoTitle = (title) => {
  return title.length >= 3 && title.length <= 30 && !/^\s+$/.test(title);
};

export const validateQualName = (qualName) => {
  return (
    qualName.length >= 3 && qualName.length <= 32 && !/^\s+$/.test(qualName)
  );
};

export const validateLevel = (qualLevel) => {
  return qualLevel > 5 || qualLevel < 1;
};

export const validateVideoDescription = (videoDescription) => {
  return (
    videoDescription.length >= 3 &&
    videoDescription.length <= 150 &&
    !/^\s+$/.test(videoDescription)
  );
};

export const validateQualDescription = (qualDescription) => {
  return (
    qualDescription.length >= 3 &&
    qualDescription.length <= 300 &&
    !/^\s+$/.test(qualDescription)
  );
};

export const validateStartDate = (qualStartDate, qualEndDate) => {
  if (!qualStartDate || !qualEndDate) return false;
  const startDate = new Date(qualStartDate);
  const endDate = new Date(qualEndDate);
  return startDate <= endDate;
};

export const validateEndDate = (qualEndDate, qualStartDate) => {
  if (!qualEndDate || !qualStartDate) return false;
  const startDate = new Date(qualStartDate);
  const endDate = new Date(qualEndDate);
  return endDate >= startDate;
};

export const validateAbout = (about) => {
  return about.length >= 3 && about.length <= 500 && !/^\s+$/.test(about);
};

export const validateComment = (comment) => {
  return comment.length <= 500 && !/^\s+$/.test(comment);
};

export const validateFullName = (fullName) => {
  const re = /^[A-Za-z]+\s[A-Za-z]+$/;
  return re.test(fullName);
};

export const validatePassword = (password) => {
  return !/^\S+$/.test(password) || password.length < 8;
};

export const validateConfirmPassword = (confirmPassword, password) => {
  return confirmPassword !== password;
};
