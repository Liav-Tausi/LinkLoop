import { Box, Button } from "@mui/material"
import { useContext } from "react";
import { AppContext } from "../../../../App/AppStates/AppReducer";

const SignSubmit = () => {
    const { themeMode } = useContext(AppContext);
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Button
        type={"submit"}
        disableRipple={true}
        variant="text"
        sx={{
          width: "6em",
          color: themeMode.textColor,
          fontWeight: 600,
          borderRadius: "40px",
          "&:hover": {
            backgroundColor: themeMode.signUpField,
            boxShadow: "none",
          },
          "&:active": {
            transform: "scale(0.98)",
          },
          boxShadow: "none",
        }}
      >
        <Box>Submit</Box>
      </Button>
    </Box>
  );
}

export default SignSubmit;