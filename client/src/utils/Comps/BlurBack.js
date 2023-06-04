import { Box } from "@mui/material";
import { AppContext } from "../../App/AppStates/AppReducer";
import { useContext } from "react";


const BlurBack = (props) => {
  const {signInOpen} = useContext(AppContext)

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        zIndex: 9996,
        backdropFilter: signInOpen ? "blur(1px)" : "blur(2.4px)",
      }}
    >
      {props.children}
    </Box>
  );
};

export default BlurBack;
