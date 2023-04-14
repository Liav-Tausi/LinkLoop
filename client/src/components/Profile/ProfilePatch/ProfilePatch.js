import BlurBack from "../../../utils/Comps/BlurBack";
import PaperBack from "../../../utils/Comps/PaperBack";
import ProfilePatchField from "./ProfilePatchField";
import ProfilePatchTitle from "./ProfilePatchTitle";

const ProfilePatch = () => {

  return (
    <BlurBack>
      <PaperBack
        id="profilePatch"
        height={666}
        width={666}
        smallHeight={600}
        boxShadow={10}
      >
        <ProfilePatchTitle />
        <ProfilePatchField />
      </PaperBack>
    </BlurBack>
  );
};

export default ProfilePatch;
