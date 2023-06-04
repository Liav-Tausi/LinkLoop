
export const detectColorScheme = () => {
  const isDarkMode =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: light)").matches;
  return isDarkMode ? "light" : "dark";
};
