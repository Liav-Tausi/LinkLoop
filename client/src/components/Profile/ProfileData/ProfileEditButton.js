import { Box } from "@mui/material";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { AppContext } from "../../../App/AppStates/AppReducer";
import { useContext } from "react";

const ProfileEditButton = (props) => {
  const { themeMode, } = useContext(AppContext);

  return (
    <Box
      onClick={props.func}
      sx={{
        display: "flex",
        justifyContent: "center",
        borderRadius: "50%",
        px: props.sizeX,
        py: props.sizeY,
        backgroundColor: props.background,
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
        sx={{ color: themeMode.textColor, transform: props.scale }}
      />
    </Box>
  );
};

export default ProfileEditButton;
