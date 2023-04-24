import { useContext } from "react";
import {
  AppContext,
  IsSmallScreenContext,
} from "../../../../../App/AppStates/AppReducer";
import SignTitle from "../SignTitle";
import { Box } from "@mui/material";
import BlurBack from "../../../../../utils/Comps/BlurBack";
import PaperBack from "../../../../../utils/Comps/PaperBack";

const SignTemp = (props) => {
  const { themeMode, signUpOpen } = useContext(AppContext);
  const isSmallScreen = useContext(IsSmallScreenContext);

  return (
    <BlurBack>
      <PaperBack
        id={props.SignId}
        height={666}
        width={440}
        smallHeight={450}
        verySmallWidth={360}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <SignTitle />
          {props.children}
        </Box>
        <Box
          sx={{
            pt: 2,
            display: "flex",
            justifyContent: "center",
            color: themeMode.textColor,
            fontSize: isSmallScreen ? "13px" : "16px",
          }}
        >
          {props.goToText}
          <Box
            onClick={props.func}
            sx={{
              ml: 1,
              color: themeMode.appTheme,
              "&:hover": { cursor: "pointer" },
            }}
          >
            {props.goToName}
          </Box>
        </Box>
      </PaperBack>
    </BlurBack>
  );
};

export default SignTemp;
