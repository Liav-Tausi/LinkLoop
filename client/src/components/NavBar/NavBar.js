import {
  AppBar,
  TextField,
  Toolbar,
  Box,
  Autocomplete,
  Button,
} from "@mui/material";
import { useContext, useEffect } from "react";
import Menu from "./Menu/Menu";
import Logo from "./Logo/Logo";
import Search from "./Search";
import { AppContext } from "../../App/AppStates/AppReducer";

const NavBar = () => {
  const { themeMode } = useContext(AppContext);

  useEffect(() => {
    console.log("nav refresh");
  }, []);

  return (
    <AppBar
      id="app"
      position="static"
      sx={{
        backgroundColor: themeMode.navColor,
        borderBottom: "2px solid " + themeMode.navInputColor,
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
        <Search />
        <Menu />
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
