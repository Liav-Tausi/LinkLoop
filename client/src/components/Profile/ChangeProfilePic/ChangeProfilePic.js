import BlurBack from "../../../utils/Comps/BlurBack";
import PaperBack from "../../../utils/Comps/PaperBack";
import {APP_ACTIONS, AppDispatchContext } from "../../../App/AppStates/AppReducer";
import ProfileVideoAndPatchAndPicTitle from "../ProfileVideoAndPatchAndPicTitle";
import { useContext } from "react";
import ChangeProfilePicField from "./ChangeProfilePicField";



const ChangeProfilePic = () => {
  const dispatch = useContext(AppDispatchContext)
  return (
    <BlurBack>
      <PaperBack
        id="changeProfilePic"
        height={600}
        width={500}
        smallHeight={600}
        smallWidth={425}
        verySmallWidth={370}
        boxShadow={10}
      >
        <ProfileVideoAndPatchAndPicTitle
          text={"Change Profile Pic: "}
          func={() => dispatch({ type: APP_ACTIONS.CHANGE_PROFILE_PIC })}
        />
        <ChangeProfilePicField/>
      </PaperBack>
    </BlurBack>
  );
};

export default ChangeProfilePic;
