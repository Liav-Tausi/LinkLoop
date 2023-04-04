import { Box } from "@mui/material";
import { ReactComponent as AppLogo } from "../../assets/imgs/AppLogo.svg";

const AppLoading = ({ colors }) => {
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
          backgroundColor: colors.body,
          zIndex: 9999,
          color: colors.textColor,
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
