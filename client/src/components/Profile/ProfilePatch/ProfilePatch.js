import BlurBack from "../../../utils/Comps/BlurBack";
import PaperBack from "../../../utils/Comps/PaperBack";
import ProfilePatchField from "./ProfilePatchField";
import { APP_ACTIONS, AppDispatchContext } from "../../../App/AppStates/AppReducer";
import { useContext } from "react";
import ProfileVideoAndPatchAndPicTitle from "../ProfileVideoAndPatchAndPicTitle";

const ProfilePatch = () => {
  const dispatch = useContext(AppDispatchContext)
  
  return (
    <BlurBack>
      <PaperBack
        id="profilePatch"
        height={666}
        width={666}
        smallHeight={600}
        smallWidth={425}
        verySmallWidth={370}
        boxShadow={10}
      >
        <ProfileVideoAndPatchAndPicTitle
          text={"Edit Personal Info:"}
          func={() => dispatch({ type: APP_ACTIONS.PROFILE_PATCH })}
        />
        <ProfilePatchField />
      </PaperBack>
    </BlurBack>
  );
};

export default ProfilePatch;
