import { Box } from "@mui/material";
import { AppContext } from "../../../App/AppStates/AppReducer";
import { useContext } from "react";

const ProfileMainText = (props) => {
  const { themeMode } = useContext(AppContext);

  return (
    <Box sx={{ display: "flex", ml: 2, mt: 5.5 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignSelf: "flex-start",
        }}
      >
        {props.profileData.user ? (
          <>
            <Box
              sx={{ fontSize: "20px", mb: 1.5, color: themeMode.textColor }}
            >{`${props.profileData?.user?.first_name} ${props.profileData?.user?.last_name}`}</Box>
            <Box
              sx={{ color: themeMode.textColor, mb: 0.8 }}
            >{`${props.profileData.headline}`}</Box>
            <Box
              sx={{ fontSize: "12px", color: themeMode.secTextColor }}
            >{`${props.profileData.location}`}</Box>
          </>
        ) : (
          <>
            <Box sx={{ fontSize: "20px", mb: 1.5, color: themeMode.textColor }}>
              full name
            </Box>
            <Box sx={{ color: themeMode.textColor, mb: 0.8 }}>headline</Box>
            <Box sx={{ fontSize: "12px", color: themeMode.secTextColor }}>
              location
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
}

export default ProfileMainText;