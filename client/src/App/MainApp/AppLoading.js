import { Box } from "@mui/material";
import { ReactComponent as AppLogo } from "../../assets/imgs/AppLogo.svg";
import { useContext } from "react";
import { AppContext } from "../AppStates/AppReducer";

const AppLoading = () => {
  const { themeMode } = useContext(AppContext);
  return (
    <>
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "95%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: themeMode.body,
          zIndex: 9999,
          color: themeMode.textColor,
          flexDirection: "column",
        }}
      >
        <Box sx={{ width: "75px" }}>
          <AppLogo />
        </Box>

        <Box sx={{ my: "10px", fontSize: "0.8em" }}>LinkLoop</Box>
      </Box>
    </>
  );
};

export default AppLoading;
