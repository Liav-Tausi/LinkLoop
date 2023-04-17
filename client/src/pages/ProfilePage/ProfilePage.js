import { AppContext, AppDispatchContext } from "../../App/AppStates/AppReducer";
import { useContext } from "react";
import Profile from "../../components/Profile/Profile";

const ProfilePage = () => {
  const { accessToken } = useContext(AppContext);
  const dispatch = useContext(AppDispatchContext);

  return <Profile />;
};

export default ProfilePage;
