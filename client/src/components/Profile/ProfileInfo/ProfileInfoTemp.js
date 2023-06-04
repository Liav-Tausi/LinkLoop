import { Box, Typography, Rating } from "@mui/material";
import { useContext } from "react";
import {
  AppContext,
  IsSmallScreenContext,
} from "../../../App/AppStates/AppReducer";

const ProfileInfoTemp = (props) => {
  const { themeMode } = useContext(AppContext);
  const isSmallScreen = useContext(IsSmallScreenContext);

  const {
    name,
    description,
    start_date,
    end_date,
    school,
    skill_level,
    about,
  } = props.data;

  return (
    <Box
      alignItems="center"
      sx={{
        borderBottom: start_date ? "solid 1px #000" : "none",
        display: skill_level ? "flex" : "block",
      }}
    >
      <Box
        sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}
      >
        <Typography
          variant={skill_level ? "h7" : "h6"}
          sx={{
            fontWeight: about ? "thin" : "bold",
            display: skill_level ? "flex" : "block",
          }}
        >
          {name}
        </Typography>
        {skill_level && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Rating
              readOnly
              name="size-large"
              value={skill_level}
              sx={{
                "&.MuiRating-root": {
                  color: themeMode.appTheme,
                },
              }}
              size="medium"
            />
          </Box>
        )}
      </Box>
      <Box>
        {school && (
          <Typography
            variant="subtitle1"
            sx={{ color: themeMode.secTextColor }}
          >
            {school}
          </Typography>
        )}
        {description && (
          <Typography
            variant="body1"
            sx={{ color: themeMode.secTextColor, whiteSpace: "pre-wrap" }}
          >
            {description}
          </Typography>
        )}
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
