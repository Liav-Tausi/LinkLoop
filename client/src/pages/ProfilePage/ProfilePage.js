import { useParams } from "react-router-dom";
import Profile from "../../components/Profile/Profile";
import { AppContext, AppDispatchContext } from "../../App/AppStates/AppReducer";
import { useContext } from "react";

const ProfilePage = () => {

  const { accessToken } = useContext(AppContext);
  const dispatch = useContext(AppDispatchContext);

  return <Profile/>;
};

export default ProfilePage;
