import Navbar from "./../Navbar/Navbar";

import { Outlet } from "react-router-dom";
import SideBar from "../Sidebar/Sidebar";
const MasterLayout = ({ handleLogout, loginUser }) => {
  return (
    <>
      <div className="d-flex  ">
        <div>
          <SideBar handleLogout={handleLogout} />
        </div>
        <div className="w-100 p-3 ">
          <div className="mb-3">
            <Navbar loginUser={loginUser} />
          </div>

          <Outlet />
        </div>
      </div>
    </>
  );
};

export default MasterLayout;
