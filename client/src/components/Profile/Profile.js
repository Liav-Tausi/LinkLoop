import { useParams } from "react-router-dom";
import ProfileData from "./ProfileData/ProfileData";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App/AppStates/AppReducer";
import { getImpressions, postProfileImpression } from "../../utils/funcs/mainFuncs";

const Profile = () => {
    const { connectedUser, accessToken } = useContext(AppContext);
    const { username } = useParams();
    const [profileViews, setProfileViews] = useState(0);
    const urlParts = window.location.href.split("/");
    const lastPart = urlParts.slice(-1)[0];

  useEffect(() => {
    const ifPostProfileImpression = async () => {
      if (connectedUser?.username !== username) {
        await postProfileImpression(accessToken, username);
       
      }
       const views = await getImpressions(username, "username");
       setProfileViews(views.data.impression_count);
    };
    ifPostProfileImpression();
  }, [lastPart]);


  return <ProfileData username={username} profileViews={profileViews} />;
};

export default Profile;
