import Sidebar from "./../Sidebar/Sidebar";
import Navbar from "./../Navbar/Navbar";
import Header from "./../Header/Header";
import { Outlet } from "react-router-dom";
const MasterLayout = () => {
  return (
    <>
      <div className="d-flex">
        <div className="w-25">
          <Sidebar />
        </div>
        <div className="w-100">
          <Navbar />
          <Header />
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default MasterLayout;
