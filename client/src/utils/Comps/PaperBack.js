import { Paper } from "@mui/material"
import { AppContext, Ref } from "../../App/AppStates/AppReducer";
import { useContext } from "react";


const PaperBack = (props) => {
    const { themeMode, } = useContext(AppContext);
    const ref = useContext(Ref);

  return (
    <Paper
      ref={ref}
      id={props.id}
      sx={{
        mt: 1,
        zIndex: 9996,
        borderRadius: "25px",
        backgroundColor: themeMode.sign,
        position: "fixed",
        left: "50%",
        top: "47%",
        height: props.height,
        width: props.width,
        transform: "translate(-50%, -50%)",
        boxShadow: props.boxShadow,
        "@media (max-width: 600px)": {
          height: props.smallHeight,
          width: 280,
        },
        "@media (max-width: 428px)": {
          height: 650,
          width: 330,
        },
      }}
    >
      {props.children}
    </Paper>
  );
}

export default PaperBack;