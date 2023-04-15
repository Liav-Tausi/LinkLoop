import { Box, Stack } from "@mui/material";
import {
  AppContext,
  IsSmallScreenContext,
} from "../../../App/AppStates/AppReducer";
import { useContext } from "react";

const ProfileMainText = (props) => {
  const { themeMode, user } = useContext(AppContext);
  const isSmallScreen = useContext(IsSmallScreenContext);

  return (
    <Box sx={{ display: "flex", mt: isSmallScreen ? 2 : 5.5 }}>
      {props.profileData?.user ? (
        <Stack>
          <Box
            sx={{
              whiteSpace: "nowrap",
              fontSize: "23px",
              mb: 1.5,
              color: themeMode.textColor,
            }}
          >{`${props.profileData.user.first_name} ${props.profileData.user.last_name}`}</Box>
          <Box
            sx={{ whiteSpace: "nowrap", color: themeMode.textColor, mb: 0.8 }}
          >{`${props.profileData.headline}`}</Box>
          <Box
            sx={{
              whiteSpace: "nowrap",
              fontSize: "12px",
              color: themeMode.secTextColor,
            }}
          >{`${props.profileData.location}`}</Box>
        </Stack>
      ) : user ? (
        <Stack>
          <Box
            sx={{
              fontSize: "23px",
              mb: 1.5,
              color: themeMode.textColor,
            }}
          >{`${user.first_name} ${user.last_name}`}</Box>
          <Box sx={{ color: themeMode.textColor, mb: 0.8 }}>headline</Box>
          <Box
            sx={{
              fontSize: "12px",
              color: themeMode.secTextColor,
            }}
          >
            location
          </Box>
        </Stack>
      ) : (
        <Stack>
          <Box
            sx={{
              fontSize: "23px",
              mb: 1.5,
              color: themeMode.textColor,
            }}
          >
            full name
          </Box>
          <Box sx={{ color: themeMode.textColor, mb: 0.8 }}>headline</Box>
          <Box sx={{ fontSize: "12px", color: themeMode.secTextColor }}>
            location
          </Box>
        </Stack>
      )}
      <Box
        sx={{
          py: 2,
          mx: isSmallScreen ? 1 : 7,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          color: themeMode.textColor,
          border: "solid 1px white",
          gap: 2,
        }}
      >
        <Box sx={{ color: themeMode.textColor, fontSize: 15 }}>About:</Box>
        <Box sx={{ fontSize: 12, width: 700 }}>{props.profileData?.about}</Box>
      </Box>
    </Box>
  );
};

export default ProfileMainText;
