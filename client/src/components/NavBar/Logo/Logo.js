import { Box } from "@mui/material";
import { useContext } from "react";
import { Link } from "react-router-dom";
import {
  AppContext,
  IsSmallScreenContext,
} from "../../../App/AppStates/AppReducer";
import { ReactComponent as AppLogoWhite } from "../../../assets/imgs/linkLoopAppLogoWhite.svg";
import { ReactComponent as AppLogoBlack } from "../../../assets/imgs/linkLoopAppLogoBlack.svg";
import { ReactComponent as AppLogo } from "../../../assets/imgs/AppLogo.svg";

const Logo = (props) => {
  const { themeMode } = useContext(AppContext);
  const isSmallScreen = useContext(IsSmallScreenContext);

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Box
        sx={{
          "@media (max-width: 600px)": {
            paddingLeft: "14px",
          },
        }}
      >
        <Link to={`/${props.navTo}`}>
          {isSmallScreen ? (
            <AppLogo style={{ marginTop: 3, width: "42px", py: "0.12em" }} />
          ) : themeMode.theme === "light" ? (
            <AppLogoBlack style={{ width: "200px" }} />
          ) : (
            <AppLogoWhite style={{ width: "200px" }} />
          )}
        </Link>
      </Box>
    </Box>
  );
};

export default Logo;
