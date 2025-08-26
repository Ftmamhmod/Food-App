import { useLocation } from "react-router-dom";
import mainImg from "./../../../../assets/images/Group 48102127.png";
import homeImg from "./../../../../assets/images/eating vegan food-rafiki.png";
const Header = ({ title, pargraph }) => {
  const { pathname } = useLocation();
  return (
    <div className="container-fluid bg-main rounded-4 text-white px-4 py-3">
      <div className="row justify-content-between align-items-center">
        <div className="col-md-8 col-sm-12 text-center text-md-start">
          <div className="card-body">
            <h2 className="fw-bold">{title}</h2>
            <p className="lead mb-4">{pargraph}</p>
          </div>
        </div>
        <div className="col-md-4 col-sm-12 text-center">
          <img
            loading="lazy"
            className="img-fluid"
            style={{ maxWidth: "100%", height: "auto" }}
            src={pathname === "/dashboard" ? homeImg : mainImg}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
