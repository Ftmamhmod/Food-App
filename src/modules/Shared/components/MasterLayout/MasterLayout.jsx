import Navbar from "./../Navbar/Navbar";
import { Outlet } from "react-router-dom";
import LeftBar from "../LeftBar/LeftBar";

const MasterLayout = ({ handleLogout, loginUser }) => {
  return (
    <>
      <div className="d-flex  ">
        <div>
          <LeftBar handleLogout={handleLogout} />
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
