import { APP_ACTIONS, AppDispatchContext } from "../../../App/AppStates/AppReducer";
import PaperBack from "../../../utils/Comps/PaperBack";
import BlurBack from "../../../utils/Comps/BlurBack";
import { useContext } from "react";
import ProfileVideoANDPatchTitle from "../ProfileVideoANDPatchTitle";
import ProfileAddVideoField from "./ProfileAddVideoField";

const ProfileAddVideo = () => {
  const dispatch = useContext(AppDispatchContext);

  return (
    <BlurBack>
      <PaperBack
        id="addVideo"
        height={600}
        width={555}
        smallHeight={600}
        smallWidth={425}
        verySmallWidth={370}
        boxShadow={10}
      >
        <ProfileVideoANDPatchTitle
          text={"Add a New Video: "}
          func={() => dispatch({ type: APP_ACTIONS.ADD_VIDEO })}
        />
        <ProfileAddVideoField />
      </PaperBack>
    </BlurBack>
  );
};

export default ProfileAddVideo;
