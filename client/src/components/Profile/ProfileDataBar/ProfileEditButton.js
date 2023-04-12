import { Box } from "@mui/material";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import {
  APP_ACTIONS,
  AppContext,
  AppDispatchContext,
} from "../../../App/AppStates/AppReducer";
import { useContext } from "react";

const ProfileEditButton = () => {
  const { themeMode } = useContext(AppContext);
  const dispatch = useContext(AppDispatchContext);

  return (
    <Box
      onClick={() =>
        dispatch({
          type: APP_ACTIONS.PROFILE_PATCH,
        })
      }
      sx={{
        borderRadius: "50%",
        px: 1.3,
        py: 1,
        "&:hover": {
          backgroundColor: themeMode.navInputColor,
          cursor: "pointer",
        },
        "&:active": {
          transform: "scale(0.98)",
        },
      }}
    >
      <EditRoundedIcon
        sx={{ color: themeMode.textColor, transform: "scale(1.1)" }}
      />
    </Box>
  );
};

export default ProfileEditButton;
