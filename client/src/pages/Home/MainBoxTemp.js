import { Box, Grid, Button } from "@mui/material";
import { useContext } from "react";
import {
  AppContext,
  IsSmallScreenContext,
} from "../../App/AppStates/AppReducer";
import AppLogo from "../../assets/imgs/AppLogo.svg";

const MainBoxTemp = (props) => {
  const isSmallScreen = useContext(IsSmallScreenContext);
  const { themeMode } = useContext(AppContext);
  return (
    <Box
      sx={{
        border: "3px solid" + themeMode.navInputColor,
        backgroundColor: props.backgroundColor,
        height: 350,
        borderRadius: 10,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <h1
            style={{
              color: themeMode.textColor,
              display: "flex",
              justifyContent: "center",
            }}
          >
            {props.title}
          </h1>
          <Box
            sx={{
              mx: 1,
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
              color: themeMode.textColor,
            }}
          >
            {props.text}
          </Box>
        </Grid>
        {props.showAppLogo && (
          <Grid item xs={12} sm={12}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                "&:hover": {
                  cursor: "pointer",
                  transform: "scale(1.10)",
                },
                "&:active": {
                  transform: "scale(1.03)",
                },
              }}
            >
              <img
                src={AppLogo}
                alt={"linkloop logo"}
                style={{ height: "20%", width: "20%" }}
              ></img>
            </Box>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default MainBoxTemp;
