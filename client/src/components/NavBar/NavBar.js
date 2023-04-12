import { AppBar, Box, Toolbar } from "@mui/material";
import { useContext, useEffect } from "react";
import Menu from "./Menu/Menu";
import Logo from "./Logo/Logo";
import { AppContext, IsSmallScreenContext } from "../../App/AppStates/AppReducer";
import AppMessage from "../../App/MainApp/AppMessage/AppMessage";
import SearchBar from "./SearchBar/SearchBar";
import ProfilePic from "./ProfilePic/ProfilePic";

const NavBar = () => {
  const { themeMode, message } = useContext(AppContext);
  const isSmallScreen = useContext(IsSmallScreenContext)

  useEffect(() => {
    console.log("nav refresh");
  }, []);

  return (
    <>
      <AppBar
        id="app"
        position="sticky"
        sx={{
          top: -1,
          backgroundColor: themeMode.navColor,
          borderBottom: "2px solid " + themeMode.navInputColor,
          left: 0,
          right: 0,
        }}
      >
        <Toolbar
          variant={"dense"}
          sx={{
            justifyContent: "space-between",
            "@media (max-width: 850px)": {
              px: 3,
            },
            "@media (max-width: 600px)": {
              px: 2,
            },
            "@media (max-width: 500px)": {
              px: 0,
            },
          }}
        >
          <Logo />
          <SearchBar />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: isSmallScreen ? 0 : 1.8,
            }}
          >
            <ProfilePic />
            <Menu />
          </Box>
        </Toolbar>
      </AppBar>
      {message && <AppMessage />}
    </>
  );
};

export default NavBar;
