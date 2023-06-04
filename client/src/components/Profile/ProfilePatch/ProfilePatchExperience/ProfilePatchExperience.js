import { Box } from "@mui/material";
import SignFieldTemp from "../../../NavBar/Menu/Sign/SignFieldTemp";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import {
  AppContext,
  IsSmallScreenContext,
} from "../../../../App/AppStates/AppReducer";
import { useContext } from "react";

const ProfilePatchExperience = (props) => {
  const { themeMode } = useContext(AppContext);
  const isSmallScreen = useContext(IsSmallScreenContext);

  
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
                onClick={props.handleDeleteExperience}
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
              Experience Name
            </Box>
            <SignFieldTemp
              placeholder="Name"
              autocomplete={"text"}
              handleChange={props.handleExperienceNameChange}
              error={props.experienceError?.experienceNameError}
              sign={props.experienceData?.experience_name}
              padding="8px"
              paddingL="18px"
              multiline={false}
              maxRows={1}
            />
          </Box>
          <Box>
            <Box
              sx={{
                color: themeMode.textColor,
                ml: 2,
                my: 0.5,
                fontSize: 12,
              }}
            >
              Experience Description
            </Box>
            <SignFieldTemp
              placeholder="Description"
              autocomplete={"text"}
              handleChange={props.handleExperienceDescriptionChange}
              error={props.experienceError?.experienceDescriptionError}
              sign={props.experienceData?.experience_description}
              padding="12px"
              paddingL="18px"
              multiline={true}
              maxRows={isSmallScreen ? 2 : 4}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ minWidth: isSmallScreen ? "45%" : "49%" }}>
              <Box
                sx={{
                  color: themeMode.textColor,
                  ml: 2,
                  my: 0.5,
                  fontSize: 12,
                }}
              >
                Start Date
              </Box>
              <SignFieldTemp
                placeholder="Start Date"
                autocomplete={"date"}
                type={"date"}
                handleChange={props.handleExperienceStartDateChange}
                error={props.experienceError?.experienceStartDateError}
                sign={props.experienceData?.start_date}
                padding="8px"
                paddingL="18px"
                multiline={false}
                maxRows={1}
              />
            </Box>
            <Box sx={{ minWidth: isSmallScreen ? "45%" : "49%" }}>
              <Box
                sx={{
                  color: themeMode.textColor,
                  ml: 2,
                  my: 0.5,
                  fontSize: 12,
                }}
              >
                End Date
              </Box>
              <SignFieldTemp
                placeholder="End Date"
                autocomplete={"date"}
                type={"date"}
                handleChange={props.handleExperienceEndDateChange}
                error={props.experienceError?.experienceEndDateError}
                sign={props.experienceData?.end_date}
                padding="8px"
                paddingL="18px"
                multiline={false}
                maxRows={1}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePatchExperience;
