import { useParams } from "react-router-dom";
import ProfileData from "./ProfileData/ProfileData";
const Profile = () => {
    const { username } = useParams();

  return (
    <ProfileData username={username}/>
   
  );
};

export default Profile;
