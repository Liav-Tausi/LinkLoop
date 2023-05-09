import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import Main from "./Main";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App/AppStates/AppReducer";
import { getFeedData } from "../../utils/funcs/mainFuncs";

const Home = () => {
  const { accessToken } = useContext(AppContext);
  const navigate = useNavigate();
  const [navTo, setNavTo] = useState("")

  useEffect(() => {
    const landingPage = async () => {
      const data = await getFeedData(accessToken, 1);
      setNavTo(data[0].video_id_name);
      navigate(`/${data[0].video_id_name}`);
    }
    landingPage()
  }, []);

  return (
    <>
      <NavBar navTo={navTo} />
      <Outlet />
    </>
  );
};

export default Home;
