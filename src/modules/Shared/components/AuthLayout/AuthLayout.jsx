import { Outlet } from "react-router-dom";
import logo from "./../../../../assets/images/4 3.png";
const AuthLayout = () => {
  return (
    <>
      <div className="auth-container">
        <div className="container-fluid ">
          <div className="row vh-100 justify-content-center align-items-center  ">
            <div className="col-md-8 col-lg-5 rounded-3 bg-white p-5">
              <div className="logo-container text-center ">
                <img className="w-50" src={logo} alt="Logo" />
              </div>
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthLayout;
