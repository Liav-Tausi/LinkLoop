import { Box } from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { AppContext } from "../../../App/AppStates/AppReducer";
import { useContext, useEffect } from "react";

const AddVideo = (props) => {
  const { themeMode } = useContext(AppContext);

  useEffect(() => {
    console.log("ProfileAddVideo refresh");
  }, []);

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
      <AddRoundedIcon
        sx={{ color: themeMode.textColor, transform: props.scale }}
      />
    </Box>
  );
};

export default AddVideo;
