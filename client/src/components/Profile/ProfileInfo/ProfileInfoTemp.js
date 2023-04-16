import { Box, Grid } from "@mui/material";
import { useContext } from "react";
import { AppContext } from "../../../App/AppStates/AppReducer";

const ProfileInfoTemp = (props) => {
  const { themeMode } = useContext(AppContext);
  return (
    <Grid container spacing={2} sx={{ color: themeMode.textColor }}>
      {props.headerOne && (
        <Grid item xs={12}>
          <Box
            sx={{
              borderBottom:
                props.borderOne && "solid 1px" + themeMode.textColor,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: 2,
            }}
          >
            <Box>{props.headerOne}</Box>
            <Box>{props.textOne}</Box>
          </Box>
        </Grid>
      )}
      {props.headerTwo && (
        <Grid item xs={12}>
          <Box
            sx={{
              borderBottom:
                props.borderTwo && "solid 1px" + themeMode.textColor,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: 2,
            }}
          >
            <Box>{props.headerTwo}</Box>
            <Box>{props.textTwo}</Box>
          </Box>
        </Grid>
      )}
      {props.headerThree && (
        <Grid item xs={12}>
          <Box
            sx={{
              borderBottom:
                props.borderThree && "solid 1px" + themeMode.textColor,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: 2,
            }}
          >
            <Box>{props.headerThree}</Box>
            <Box>{props.textThree}</Box>
          </Box>
        </Grid>
      )}
    </Grid>
  );
}

export default ProfileInfoTemp;