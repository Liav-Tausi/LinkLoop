import { Box, Typography } from "@mui/material";
import { useContext } from "react";
import {
  AppContext,
  IsSmallScreenContext,
} from "../../../App/AppStates/AppReducer";

const ProfileInfoTemp = (props) => {
  const { themeMode } = useContext(AppContext);
  const isSmallScreen = useContext(IsSmallScreenContext);

  const { name, description, start_date, end_date, school } = props.data;

  return (
    <Box
      alignItems="center"
      sx={{ borderBottom: start_date ? "solid 1px #000" : "none" }}
    >
      <Box>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          {name}
        </Typography>
        {school && (
          <Typography
            variant="subtitle1"
            sx={{ color: themeMode.secTextColor }}
          >
            {school}
          </Typography>
        )}
        <Typography variant="body1" sx={{ color: themeMode.secTextColor }}>
          {description}
        </Typography>
      </Box>
      <Box>
        {start_date && (
          <Typography
            variant="body2"
            sx={{ textAlign: "left", mt: isSmallScreen ? 3 : 5, mt: 1 }}
          >
            {start_date}&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;
            {end_date}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default ProfileInfoTemp;
