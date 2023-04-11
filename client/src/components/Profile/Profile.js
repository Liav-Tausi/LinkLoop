import { useParams } from "react-router-dom";
import ProfileDataBar from "./ProfileDataBar/ProfileDataBar";
const Profile = () => {
    const { username } = useParams();

  return (
    <ProfileDataBar username={username}/>
   
  );
};

export default Profile;
