export const validateEmail = (email) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

export const validateFullName = (fullName) => {
  const re = /^[A-Za-z]+\s[A-Za-z]+$/;
  return re.test(fullName);
};

export const validatePassword = (password) => {
  return password.length < 8
}

export const validateConfirmPassword = (confirmPassword, password) => {
    return confirmPassword !== password
}
