import { Box } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import {
  AppContext,
  IsSmallScreenContext,
} from "../../../App/AppStates/AppReducer";
import ProfileInfoTemp from "./ProfileInfoTemp";
import CircularProgress from "@mui/material/CircularProgress";
import { getProfileData, getUserQual } from "../../../utils/funcs/mainFuncs";
import { useParams } from "react-router-dom";
import ContentPasteOffIcon from "@mui/icons-material/ContentPasteOff";

const ProfileInfo = () => {
  const { themeMode, message } = useContext(AppContext);
  const isSmallScreen = useContext(IsSmallScreenContext);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const [allData, setAllData] = useState({
    profile: {},
    experience: [],
    education: [],
    skill: [],
  });

  
  useEffect(() => {
    setLoading(true);
    const getAllProfileData = async () => {
      const profile = await getProfileData(null, params.username);
      const allQualData = await getUserQual(params.username);
      if (allQualData) {
        setAllData((data) => ({
          ...data,
          profile: profile.data.results[0],
          experience: allQualData.data.experience,
          education: allQualData.data.education,
          skill: allQualData.data.skills,
        }));
        setLoading(false);
      } else {
        setLoading(false);
        return false;
      }
    };
    getAllProfileData();
  }, [params.username, message]);

  const orderByEndDate = (a, b) => {
    if (!a.end_date) {
      return 1;
    } else if (!b.end_date) {
      return -1;
    } else {
      return a.end_date > b.end_date ? -1 : 1;
    }
  };

  const experienceDataSorted = allData.experience.sort(orderByEndDate);
  const educationDataSorted = allData.education.sort(orderByEndDate);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: isSmallScreen ? 5 : 3,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: isSmallScreen ? 3 : 5,
          "@media (max-width: 900px)": {
            flexWrap: "wrap",
          },
        }}
      >
        <Box
          sx={{
            width: "100%",
            borderRadius: "17px",
            backgroundColor: themeMode.profileBack,
            color: themeMode.textColor,
            display: "flex",
            flexDirection: "column",
            p: 2,
            gap: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "start",
              mb: 2,
            }}
          >
            <Box sx={{ fontSize: 18 }}>About</Box>
          </Box>
          {loading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CircularProgress
                thickness={2}
                size="2rem"
                sx={{ color: themeMode.appTheme }}
              />
            </Box>
          ) : allData?.profile?.about ? (
            <ProfileInfoTemp
              data={{ name: allData?.profile?.about, about: true }}
            />
          ) : (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItem: "center",
              }}
            >
              <ContentPasteOffIcon sx={{ color: themeMode.appTheme }} />
            </Box>
          )}
        </Box>
        <Box
          sx={{
            width: "100%",
            borderRadius: "17px",
            backgroundColor: themeMode.profileBack,
            color: themeMode.textColor,
            display: "flex",
            flexDirection: "column",
            p: 2,
            gap: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "start",
              mb: 2,
            }}
          >
            <Box sx={{ fontSize: 18 }}>Experience</Box>
          </Box>
          {loading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CircularProgress
                thickness={2}
                size="2rem"
                sx={{ color: themeMode.appTheme }}
              />
            </Box>
          ) : allData.experience && allData.experience.length > 0 ? (
            experienceDataSorted.map((data, index) => (
              <ProfileInfoTemp
                key={index}
                data={{
                  name: data.experience_name,
                  description: data.experience_description,
                  school: null,
                  start_date: data.start_date,
                  end_date: data.end_date,
                }}
              />
            ))
          ) : (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItem: "center",
              }}
            >
              <ContentPasteOffIcon sx={{ color: themeMode.appTheme }} />
            </Box>
          )}
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: isSmallScreen ? 3 : 5,
          "@media (max-width: 900px)": {
            flexWrap: "wrap",
          },
        }}
      >
        <Box
          sx={{
            width: "100%",
            borderRadius: "17px",
            backgroundColor: themeMode.profileBack,
            color: themeMode.textColor,
            display: "flex",
            flexDirection: "column",
            p: 2,
            gap: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "start",
              mb: 2,
            }}
          >
            <Box sx={{ fontSize: 18 }}>Education</Box>
          </Box>
          {loading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CircularProgress
                thickness={2}
                size="2rem"
                sx={{ color: themeMode.appTheme }}
              />
            </Box>
          ) : allData.education && allData.education.length > 0 ? (
            educationDataSorted.map((data, index) => (
              <ProfileInfoTemp
                key={index}
                data={{
                  name: data.education_name,
                  description: data.education_description,
                  school: data.school_name,
                  start_date: data.start_date,
                  end_date: data.end_date,
                }}
              />
            ))
          ) : (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ContentPasteOffIcon sx={{ color: themeMode.appTheme }} />
            </Box>
          )}
        </Box>
        <Box
          sx={{
            width: "100%",
            borderRadius: "17px",
            backgroundColor: themeMode.profileBack,
            color: themeMode.textColor,
            display: "flex",
            flexDirection: "column",
            p: 2,
            gap: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "start",
              mb: 2,
            }}
          >
            <Box sx={{ fontSize: 18 }}>Skills</Box>
          </Box>
          {loading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CircularProgress
                thickness={2}
                size="2rem"
                sx={{ color: themeMode.appTheme }}
              />
            </Box>
          ) : allData.skill && allData.skill.length > 0 ? (
            allData.skill.map((data, index) => (
              <ProfileInfoTemp
                key={index}
                data={{
                  name: data.skill_name,
                  skill_level: data.skill_level,
                }}
              />
            ))
          ) : (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ContentPasteOffIcon sx={{ color: themeMode.appTheme }} />
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ProfileInfo;
