import { useNavigate } from "react-router-dom";

const SecHeader = () => {
  const navigate = useNavigate();
  return (
    <div className="container bg-light-green  rounded-4  pt-4 pb-4 ps-5 pe-5">
      <div className="row justify-content-between align-items-center">
        <div className="col-md-8 ">
          <div className="card-body">
            <h2 className="fw-bold ">
              Fill the <span className="text-success">Recipes</span> !
            </h2>
            <p className="lead mb-4">
              you can now fill the meals easily using the table and form ,
              <br />
              click here and sill it with the table !
            </p>
          </div>
        </div>
        <div className="col-md-3  text-end">
          <button
            onClick={() => navigate("/dashboard/recipes")}
            className=" btn w-100 login-btn  login-btn  "
          >
            All Recipes -{">"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SecHeader;
