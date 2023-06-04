import { Box, Container, Button } from "@mui/material";
import AppLogo from "../../assets/imgs/AppLogo.svg";
import { useContext } from "react";
import { AppContext, IsSmallScreenContext } from "../../App/AppStates/AppReducer";
import { Link } from "react-router-dom";

const NotFound = () => {
  const {themeMode} = useContext(AppContext)
  const isSmallScreen = useContext(IsSmallScreenContext);
  
  return (
    <Container sx={{ mt: 10 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: isSmallScreen ? "column" : "row",
          gap: isSmallScreen ? 5 : 0,
          minHeight: "70vh",
        }}
      >
        <Link to={"/"}>
          <img
            src={AppLogo}
            alt="linkloop logo"
            style={{ width: "100%", height: "100%", transform: isSmallScreen? "scale(1)": "scale(1.5)" }}
          ></img>
        </Link>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: isSmallScreen ? 3 : 5,
          }}
        >
          <Box sx={{ textAlign: "center", color: themeMode.textColor }}>
            The page you're looking for is breakdancing in a different location.
          </Box>
          <Link to={"/"}>
            <Button
              type={"button"}
              disableRipple={true}
              variant="text"
              sx={{
                p: 1.3,
                color: themeMode.textColor,
                backgroundColor: isSmallScreen ? themeMode.appTheme : "none",
                fontWeight: 600,
                borderRadius: "40px",
                "&:hover": {
                  backgroundColor: isSmallScreen
                    ? themeMode.appThemeHover
                    : themeMode.appTheme,
                  boxShadow: "none",
                },
                "&:active": {
                  transform: "scale(0.98)",
                },
                boxShadow: "none",
              }}
            >
              Dance Your Way Back
            </Button>
          </Link>
        </Box>
      </Box>
    </Container>
  );
};

export default NotFound;
