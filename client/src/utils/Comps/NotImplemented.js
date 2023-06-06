import {
  APP_ACTIONS,
  AppContext,
  AppDispatchContext,
} from "../../App/AppStates/AppReducer";
import ProfileVideoAndPatchAndPicTitle from "../../components/Profile/ProfileVideoAndPatchAndPicTitle";
import underConstruction from "../../assets/imgs/underConstruction.svg";
import BlurBack from "./BlurBack";
import PaperBack from "./PaperBack";
import { useContext } from "react";
import { Box } from "@mui/material";

const NotImplemented = (props) => {
  const dispatch = useContext(AppDispatchContext);
  const { themeMode } = useContext(AppContext);

  return (
    <BlurBack>
      <PaperBack
        id="notImplemented"
        height={325}
        width={420}
        smallHeight={325}
        smallWidth={425}
        verySmallWidth={350}
        verySmallHeight={props.google ? 100 : 275}
        boxShadow={10}
      >
        <ProfileVideoAndPatchAndPicTitle
          text={"Coming Soon"}
          func={() => dispatch({ type: APP_ACTIONS.NOT_IMPLEMENTED })}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
            color: themeMode.textColor,
          }}
        >
          This feature is coming soon.
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <img src={underConstruction} alt="Under Construction"></img>
        </Box>
      </PaperBack>
    </BlurBack>
  );
};

export default NotImplemented;
