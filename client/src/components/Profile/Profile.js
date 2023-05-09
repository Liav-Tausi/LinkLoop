import { useParams } from "react-router-dom";
import ProfileData from "./ProfileData/ProfileData";
import { useContext, useEffect } from "react";
import { AppContext } from "../../App/AppStates/AppReducer";
import { postProfileImpression } from "../../utils/funcs/mainFuncs";

const Profile = () => {
    const { connectedUser, accessToken } = useContext(AppContext);
    const { username } = useParams();
    const urlParts = window.location.href.split("/");
    const lastPart = urlParts.slice(-1)[0];

  useEffect(() => {
    const ifPostProfileImpression = async () => {
      if (connectedUser?.username !== username) {
        await postProfileImpression(accessToken, username);
      }
    };
    ifPostProfileImpression();
  }, [lastPart]);

  return <ProfileData username={username} />;
};

export default Profile;
