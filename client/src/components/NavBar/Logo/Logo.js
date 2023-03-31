import { Box } from "@mui/material";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../../App/AppStates/AppReducer";
import AppLogo from "../../../assets/imgs/AppLogo2.png";

const Logo = () => {
    const { themeMode} = useContext(AppContext);

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Link to="/feed">
        <Box
          sx={{
            "@media (max-width: 600px)": {
              paddingLeft: "14px",
            },
          }}
        >
          <img
            style={{ width: "37px", padding: "7px" }}
            src={AppLogo}
            alt="linkLoop logo, dancer with a suit-case"
          />
        </Box>
      </Link>
      <Box
        sx={{
          color: themeMode.textColor,
          fontSize: "1em",
          display: { xs: "none", sm: "flex" },
          alignItems: "center",
          mx: "3px",
        }}
      >
        LinkLoop
      </Box>
    </Box>
  );
};

export default Logo;
