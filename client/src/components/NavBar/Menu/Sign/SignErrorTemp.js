import { ErrorOutlineRounded } from "@mui/icons-material";
import { Box } from "@mui/material";
import { useContext } from "react";
import { AppContext } from "../../../../App/AppStates/AppReducer";

const SignErrorTemp = (props) => {
  const { themeMode } = useContext(AppContext);
  return (
    <Box
      zIndex={9999}
      sx={{
        backgroundColor: themeMode.appTheme,
        position: "absolute",
        top: props.top,
        right: "110px",
        transform: "translateY(-50%)",
        color: themeMode.textColor,
        display: "flex",
        justifyContent: "center",
        fontSize: "12px",
        borderRadius: "20px",
        padding: "6px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
        "@media (max-width: 600px)": {
          top: props.mobileTop,
          right: "60px",
        },
      }}
    >
      <Box sx={{ mr: "5px" }}>{props.text}</Box>
      <ErrorOutlineRounded
        sx={{ fontSize: "16px", color: themeMode.textColor }}
      />
    </Box>
  );
};

export default SignErrorTemp;
