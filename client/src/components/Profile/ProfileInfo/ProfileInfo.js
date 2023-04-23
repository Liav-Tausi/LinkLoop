import { Box } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import {
  AppContext,
  IsSmallScreenContext,
} from "../../../App/AppStates/AppReducer";
import ProfileInfoTemp from "./ProfileInfoTemp";
import { getProfileData, getUserQual } from "../../../utils/funcs/mainFuncs";

const ProfileInfo = () => {
  const { themeMode, connectedUser, accessToken, message } =
    useContext(AppContext);
  const isSmallScreen = useContext(IsSmallScreenContext);
  const [allData, setAllData] = useState({
    profile: {},
    experience: [],
    education: [],
    skill: [],
  });

  useEffect(() => {
    const getAllProfileData = async () => {
      const profile = await getProfileData(
        accessToken,
        connectedUser?.username
      );
      const experience = await getUserQual(accessToken, "experience");
      const education = await getUserQual(accessToken, "education");
      const skill = await getUserQual(accessToken, "skill");
      if (profile && experience && education && skill) {
        setAllData((data) => ({ ...data, profile: profile }));
        setAllData((data) => ({ ...data, experience: experience }));
        setAllData((data) => ({ ...data, education: education }));
        setAllData((data) => ({ ...data, skill: skill }));
      } else {
      }
    };
    getAllProfileData();
  }, [message]);

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
            display: "flex",
            justifyContent: "center",
            p: 2,
          }}
        >
          <ProfileInfoTemp
            headerOne={"Experience"}
            headerTwo={""}
            borderOne={true}
          />
        </Box>
        <Box
          sx={{
            width: "100%",
            borderRadius: "17px",
            backgroundColor: themeMode.profileBack,
            display: "flex",
            justifyContent: "center",
            p: 2,
          }}
        >
          <ProfileInfoTemp
            headerOne={"About"}
            textOne={allData?.profile?.data?.about}
            border={false}
          />
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
            display: "flex",
            justifyContent: "center",
            p: 2,
          }}
        >
          <ProfileInfoTemp headerOne={"Education"} borderOne={true} />
        </Box>
        <Box
          sx={{
            width: "100%",
            borderRadius: "17px",
            backgroundColor: themeMode.profileBack,
            display: "flex",
            justifyContent: "center",
            p: 2,
          }}
        >
          <ProfileInfoTemp
            headerOne={"Skills"}
            textOne={
              "lofwe fewfwefwefwe fwefwefwf we f fffffffffffff fwefwefw lofwe fewfwefwefwe fwefwefwf we f fffffffffffff fwefwefw lofwe fewfwefwefwe fwefwefwf we f fffffffffffff fwefwefw"
            }
            borderOne={true}
            borderThree={true}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default ProfileInfo;
