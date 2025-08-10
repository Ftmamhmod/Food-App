import Navbar from "./../Navbar/Navbar";
import Header from "./../Header/Header";
import { Outlet } from "react-router-dom";
import SideBar from "../Sidebar/Sidebar";
const MasterLayout = ({ handleLogout, loginUser }) => {
  return (
    <>
      <div className="d-flex vh-100">
        <div>
          <SideBar handleLogout={handleLogout} />
        </div>
        <div className="w-100 ">
          <Navbar loginUser={loginUser} />
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default MasterLayout;
