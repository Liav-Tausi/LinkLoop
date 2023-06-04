import { useContext, useState } from "react";
import { AppContext } from "../../App/AppStates/AppReducer";
import { Box } from "@mui/material";


const ToolTip = (props) => {
  const { themeMode } = useContext(AppContext);
  const [showLabel, setShowLabel] = useState(false);

  const handleMouseOver = () => {
    setShowLabel(true);
  };

  const handleMouseOut = () => {
    setShowLabel(false);
  };

  return (
    <>
      <Box
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        style={{
          position: "relative",
        }}
      >
        {props.children}
        <Box
          sx={{
            p: 1.2,
            backgroundColor: themeMode.profileBack,
            color: themeMode.textColor,
            fontSize: "11px",
            borderRadius: "10px",
            position: "absolute",
            bottom: -39,
            left: props.where,
            transform: "translateX(-50%)",
            opacity: showLabel ? 1 : 0,
            transition: "opacity 0.3s ease-out",
            whiteSpace: "nowrap",
          }}
        >
          {props.label}
        </Box>
      </Box>
    </>
  );
};

export default ToolTip;
