import { Box } from "@mui/material";
import { useContext } from "react";
import { AppContext } from "../../../../../App/AppStates/AppReducer";

const SignField = (props) => {
  const { themeMode } = useContext(AppContext);
  return (
    <Box
      sx={{
        width: 325,
        mt: 2,
        p: 1,
        pb: 2,
        borderRadius: "25px",
        backgroundColor: themeMode.signUpBubbles,
        "@media (max-width: 600px)": {
          width: 288,
          pt: 0,
          pb: 1.5,
        },
      }}
    >
      {props.children}
    </Box>
  );
};

export default SignField;
