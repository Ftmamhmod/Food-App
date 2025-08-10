const Header = ({ title, pargraph, img }) => {
  return (
    <div className="container bg-success  rounded-4 text-white ps-5 pe-5 ">
      <div className="row justify-content-between align-items-center">
        <div className="col-md-6 ">
          <div className="card-body">
            <h2 className="fw-bold ">{title}</h2>
            <p className="lead mb-4">{pargraph}</p>
          </div>
        </div>
        <div className="col-md-4 ">
          <img className="w-100" src={img} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Header;
