import { Box, Stack } from "@mui/material";
import {
  AppContext,
  IsSmallScreenContext,
} from "../../../App/AppStates/AppReducer";
import { useContext } from "react";

const ProfileMainText = () => {
  const { themeMode, user } = useContext(AppContext);
  const isSmallScreen = useContext(IsSmallScreenContext);

  return (
    <Box sx={{ display: "flex", mt: isSmallScreen ? 2 : 5.5 }}>
      {user?.user ? (
        <Stack>
          <Box
            sx={{
              whiteSpace: "nowrap",
              fontSize: "23px",
              mb: 1.5,
              color: themeMode.textColor,
            }}
          >{`${user.user.first_name} ${user.user.last_name}`}</Box>
          <Box
            sx={{ whiteSpace: "nowrap", color: themeMode.textColor, mb: 0.8 }}
          >{`${user.headline}`}</Box>
          <Box
            sx={{
              whiteSpace: "nowrap",
              fontSize: "12px",
              color: themeMode.secTextColor,
            }}
          >{`${user.location}`}</Box>
        </Stack>
      ) : user ? (
        <Stack>
          <Box
            sx={{
              fontSize: "23px",
              mb: 1.5,
              color: themeMode.textColor,
            }}
          >{`${user.user?.first_name} ${user.user?.last_name}`}</Box>
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
          gap: 2,
        }}
      >
      </Box>
    </Box>
  );
};

export default ProfileMainText;
