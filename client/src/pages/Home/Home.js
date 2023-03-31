import { Outlet } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";

const Home = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

export default Home;
