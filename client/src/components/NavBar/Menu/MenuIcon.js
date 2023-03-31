
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { Box } from "@mui/material";
import { useContext  } from "react";
import { AppContext, AppDispatchContext, APP_ACTIONS } from "../../../App/AppStates/AppReducer";

const MenuIcon = () => {
    const { themeMode } = useContext(AppContext);
    const dispatch = useContext(AppDispatchContext);

  return (
    <Box
      onClick={() => {
        dispatch({
          type: APP_ACTIONS.MENU_OPEN_CLOSE,
        });
      }}
      sx={{
        display: "flex",
        justifyContent: "center",
        py: "4px",
        px: "5px",
        borderRadius: "50%",
        backgroundColor: themeMode.navInputColor,
        "&:hover": {
          backgroundColor: themeMode.navInputColorHover,
          cursor: "pointer",
        },
        "&:active": {
          transform: "scale(0.97)",
        },
        "@media (max-width: 600px)": {
          py: "4px",
          px: "5px",
        },
      }}
    >
      <MenuRoundedIcon
        id={"hamburgerMenu"}
        sx={{
          color: themeMode.textColor,
          fontSize: "22px",
        }}
      />
    </Box>
  );
}

export default MenuIcon;