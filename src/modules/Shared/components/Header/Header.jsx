import { useLocation } from "react-router-dom";
import mainImg from "./../../../../assets/images/Group 48102127.png";
import homeImg from "./../../../../assets/images/eating vegan food-rafiki.png";
const Header = ({ title, pargraph }) => {
  const { pathname } = useLocation();
  return (
    <div className="container bg-success  rounded-4 text-white ps-5 pe-5 ">
      <div className="row justify-content-between align-items-center">
        <div className="col-md-8 ">
          <div className="card-body">
            <h2 className="fw-bold ">{title}</h2>
            <p className="lead mb-4">{pargraph}</p>
          </div>
        </div>
        <div className="col-md-4 text-end">
          <img
            className="w-fluid"
            src={pathname === "/dashboard" ? homeImg : mainImg}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
