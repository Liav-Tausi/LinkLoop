import { Box, Rating } from "@mui/material";
import SignFieldTemp from "../../../NavBar/Menu/Sign/SignFieldTemp";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import {
  AppContext,
  IsSmallScreenContext,
} from "../../../../App/AppStates/AppReducer";
import { useContext } from "react";

const ProfilePatchSkill = (props) => {
  const { themeMode } = useContext(AppContext);

  return (
    <Box
      sx={{
        backgroundColor: themeMode.signUpBubbles,
        borderRadius: "26px",
        py: 2,
        px: 2,
        mx: 2,
      }}
    >
      <Box
        sx={{
          position: "relative",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Box>
            <Box sx={{ display: "flex", justifyContent: "end" }}>
              <Box
                onClick={props.handleDeleteSkill}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  borderRadius: "50%",
                  px: 0.7,
                  py: 0.7,
                  "&:hover": {
                    backgroundColor: themeMode.navInputColor,
                    cursor: "pointer",
                  },
                  "&:active": {
                    transform: "scale(0.98)",
                  },
                }}
              >
                <CloseRoundedIcon
                  sx={{ transform: "scale(1.2)", color: themeMode.textColor }}
                />
              </Box>
            </Box>
            <Box
              sx={{
                color: themeMode.textColor,
                ml: 2,
                my: 0.5,
                fontSize: 12,
              }}
            >
              Skill Name
            </Box>
            <SignFieldTemp
              placeholder="Name"
              autocomplete={"text"}
              handleChange={props.handleSkillNameChange}
              error={props.skillError?.skillNameError}
              sign={props.skillData?.skill_name}
              padding="8px"
              paddingL="18px"
              multiline={false}
              maxRows={1}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "start",
                color: themeMode.textColor,
                ml: 2,
                my: 0.5,
                fontSize: 12,
              }}
            >
              Skill level
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Rating
                name="size-large"
                value={Number(props.skillData?.skill_level)}
                onChange={props.handleSkillLevelChange}
                sx={{
                  "&.MuiRating-root": {
                    color: themeMode.appTheme,
                  },
                }}
                size="medium"
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePatchSkill;
