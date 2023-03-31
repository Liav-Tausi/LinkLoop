import { Box } from "@mui/material"
import AppLogo from "../../assets/imgs/AppLogo2.png";

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
        <img
          style={{ width: "65px", display: "block" }}
          src={AppLogo}
          alt="linkLoop logo, dancer with a suit-case"
        />
        <Box sx={{ my: "10px", fontSize: "0.8em" }}>LinkLoop</Box>
      </Box>
    </>
  );
};


export default AppLoading