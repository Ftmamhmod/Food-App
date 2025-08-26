import logo from "./../../../../assets/images/4 3.png";
import notFound from "./../../../../assets/images/Group 48101676.png";

const NotFound = () => {
  return (
    <>
      <div className="container-fluid notFound py-4">
        <div className="text-center mb-4">
          <img
            src={logo}
            alt="Logo"
            className="img-fluid"
            style={{ maxWidth: "150px" }}
          />
        </div>
        <div className="row align-items-center">
          <div className="col-12 col-md-6 text-center text-md-start p-4">
            <h3 className="text-success">Oops.... </h3>
            <h3>Page not found </h3>
            <p className="text-muted">
              This Page doesn't exist or was removed! We suggest you back to
              home.
            </p>
            <button
              onClick={() => (window.location.href = "/")}
              className="btn btn-success text-white"
            >
              Back to Home
            </button>
          </div>
          <div className="col-12 col-md-6 text-center">
            <img
              src={notFound}
              alt="Not Found"
              className="img-fluid"
              style={{ maxWidth: "100%" }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
