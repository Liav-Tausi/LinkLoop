import { Paper } from "@mui/material";
import { AppContext, Ref } from "../../App/AppStates/AppReducer";
import { useContext } from "react";

const PaperBack = (props) => {
  const { themeMode, signUpOpen } = useContext(AppContext);
  const ref = useContext(Ref);

  return (
    <Paper
      ref={ref}
      id={props.id}
      sx={{
        mt: 2.2,
        py: 1,
        zIndex: 9996,
        borderRadius: "25px",
        backgroundColor: themeMode.sign,
        position: "fixed",
        left: "50%",
        top: "47%",
        height: props.height,
        width: props.width,
        transform: "translate(-50%, -50%)",
        "@media (max-width: 600px)": {
          height: props.smallHeight,
          width: props.smallWidth,
        },
        "@media (max-width: 428px)": {
          height: props.verySmallHeight ? props.verySmallHeight : 650,
          width: props.verySmallWidth,
        },
        boxShadow: signUpOpen
          ? "0px 4px 11px rgba(0, 0, 0, 0.3)"
          : "0px 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      {props.children}
    </Paper>
  );
};

export default PaperBack;
