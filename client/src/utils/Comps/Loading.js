import BlurBack from "./BlurBack";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material";
import { useContext } from "react";
import { AppContext } from "../../App/AppStates/AppReducer";
import AppLogo from "../../assets/imgs/AppLogo.svg";

const Loading = () => {
  const { themeMode } = useContext(AppContext);

  return (
    <BlurBack>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <Box position="relative" display="inline-flex">
          <CircularProgress
            thickness={2}
            size="6.5rem"
            sx={{ color: themeMode.appTheme }}
          />
          <Box
            top={0}
            left={0}
            bottom={0}
            right={0}
            position="absolute"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <img
              src={AppLogo}
              alt="linkLoop logo"
              style={{
                width: 60,
              }}
            />
          </Box>
        </Box>
      </Box>
    </BlurBack>
  );
};

export default Loading;
