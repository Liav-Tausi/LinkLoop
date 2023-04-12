import { Box } from "@mui/material";

const BlurBack = (props) => {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        zIndex: 9996,
        backdropFilter: "blur(2.4px)",
      }}
    >
      {props.children}
    </Box>
  );
};

export default BlurBack;
