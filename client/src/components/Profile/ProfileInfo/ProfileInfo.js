import { Box } from "@mui/material";
import { useContext } from "react";
import { AppContext, IsSmallScreenContext } from "../../../App/AppStates/AppReducer";
import ProfileInfoTemp from "./ProfileInfoTemp";

const ProfileInfo = () => {
  const { themeMode, user} = useContext(AppContext);
  const isSmallScreen = useContext(IsSmallScreenContext);

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
          <ProfileInfoTemp headerOne={"About"} textOne={user?.about} border={false} />
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
            headerOne={"Stats"}
            headerTwo={""}
            borderOne={true}
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
          <ProfileInfoTemp headerOne={"Experience"} borderOne={true} />
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
            headerThree={"Education"}
            textThree={
              "lofwe fewfwefwefwe fwefwefwf we f fffffffffffff fwefwefw "
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