import { useContext } from "react";
import { AppContext } from "../../../../App/AppStates/AppReducer";

const ProfileInfoExperience = (props) => {
  const { themeMode } = useContext(AppContext);
  return (
    <Box>
      <Box>{experience_name}</Box>
      <Box>{experience_description}</Box>
      <Box>{experience_name}</Box>
    </Box>
  );
};

export default ProfileInfoExperience;
