const Navbar = ({ loginUser }) => {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary rounded-4">
        <div className="container-fluid">
          <div className="col-12 col-md-8 mb-2 mb-lg-0 ">
            <form className="w-100 p-1" role="search">
              <input
                className="form-control rounded-5"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
            </form>
          </div>
          <div className="col-12 col-md-4 col-lg-2">
            <div className="d-flex align-items-center justify-content-center justify-content-md-end">
              {loginUser?.profilePic ? (
                <img
                  src={loginUser.profilePic}
                  alt="user avatar"
                  className="rounded-circle me-2"
                  style={{ width: "40px", height: "40px", objectFit: "cover" }}
                />
              ) : (
                <i
                  className="fas fa-user-circle me-2"
                  style={{ fontSize: "30px" }}
                ></i>
              )}
              <ul className="navbar-nav">
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {loginUser ? loginUser?.userName : "User"}
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <a className="dropdown-item" href="#">
                        Action
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Another action
                      </a>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Something else here
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
