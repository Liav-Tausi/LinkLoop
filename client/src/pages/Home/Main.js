import { Box, Container, Grid } from "@mui/material";
import { useContext } from "react";
import {
  AppContext,
  IsSmallScreenContext,
} from "../../App/AppStates/AppReducer";
import MainBoxTemp from "./MainBoxTemp";

const Main = () => {
  const isSmallScreen = useContext(IsSmallScreenContext);
  const { themeMode } = useContext(AppContext);
  return (
    <Container sx={{ mt: 10}}>
      <Grid container spacing={isSmallScreen ? 3 : 7} justifyContent="center">
        <Grid item xs={12} sm={6}>
          <MainBoxTemp
            backgroundColor={themeMode.navColor}
            title={"Link to the Loop"}
            text={"watch videos of amazing talents and connect with them!"}
            showAppLogo={true}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <MainBoxTemp
            backgroundColor={themeMode.navColor}
            title={"About LinkLoop"}
            text={
              "a platform for connecting people who are offering their talents or collections with those who are in need of them. Users can upload short videos showcasing their skills or collections, and create a profile for themselves."
            }
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Main;
