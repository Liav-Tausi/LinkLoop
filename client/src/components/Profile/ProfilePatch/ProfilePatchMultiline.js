import { Box } from "@mui/material";
import SignFieldTemp from "../../NavBar/Menu/Sign/SignFieldTemp";
import { useContext } from "react";
import {
  AppContext,
  IsSmallScreenContext,
} from "../../../App/AppStates/AppReducer";

const ProfilePatchMultiline = (props) => {
  const { themeMode } = useContext(AppContext);
  const isSmallScreen = useContext(IsSmallScreenContext);
  return (
    <Box
      sx={{
        backgroundColor: themeMode.signUpBubbles,
        borderRadius: "26px",
        py: 2,
        px: 2,
        mx: 2,
      }}
    >
      <Box sx={{ position: "relative" }}>
        <Box
          sx={{
            color: themeMode.textColor,
            ml: 2,
            my: 0.5,
            fontSize: 12,
          }}
        >
          {props.text}
        </Box>
        {props.children}
        <SignFieldTemp
          placeholder={"About"}
          autocomplete={"text"}
          handleChange={props.handleAboutChange}
          error={props.errors}
          sign={props.patchData}
          padding="12px"
          paddingL="18px"
          multiline={true}
          maxRows={isSmallScreen ? 2 : 4}
        />
      </Box>
    </Box>
  );
};

export default ProfilePatchMultiline;
