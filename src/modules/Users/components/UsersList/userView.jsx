import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { axiosInstance, baseImgURL } from "../../../../utils/axios";
import avatar from "../../../../assets/images/abstract-user-flat-4.png";
import Loader from "../../../Shared/Loader/Loader";

const fieldLabel = (label) => (
  <label className="form-label text-uppercase small fw-semibold text-secondary mb-1">
    {label}
  </label>
);

const UserView = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const passedUser = location.state?.user || null;
  const passedId = location.state?.userId || passedUser?.id;
  const [user, setUser] = useState(passedUser);
  const [loading, setLoading] = useState(!passedUser && !!passedId);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!passedUser && passedId) {
      (async () => {
        try {
          setLoading(true);
          const res = await axiosInstance.get(`/users/${passedId}`);
          setUser(res.data);
        } catch {
          setError("Failed to load user details");
        } finally {
          setLoading(false);
        }
      })();
    } else if (!passedUser && !passedId) {
      // Nothing to show, close modal
      navigate(-1);
    }
  }, [passedUser, passedId, navigate]);

  const handleClose = () => navigate(-1);

  return (
    <div
      className="modal d-block"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content border-0 rounded-4 overflow-hidden">
          <div className="modal-header">
            <h5 className="modal-title fw-bold">User Details</h5>
            <button
              type="button"
              className="btn-close"
              onClick={handleClose}
            ></button>
          </div>
          <div className="modal-body">
            {loading && <Loader height={160} label="Loading user..." />}
            {!loading && error && (
              <div className="alert alert-danger mb-0 py-2">{error}</div>
            )}
            {!loading && user && (
              <div className="container-fluid">
                <div className="row g-4 mb-3 align-items-center">
                  <div className="col-12 col-md-auto text-center">
                    <div
                      className="rounded-circle border overflow-hidden mx-auto"
                      style={{ width: 120, height: 120 }}
                    >
                      <img
                        src={
                          user?.imagePath
                            ? `${baseImgURL}${user.imagePath}`
                            : avatar
                        }
                        alt="avatar"
                        width={120}
                        height={120}
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                  </div>
                  <div className="col text-center text-md-start">
                    <h3 className="mb-1">{user?.userName || "User"}</h3>
                    <p className="text-muted mb-2 small">{user?.email}</p>
                    <div className="small text-secondary d-flex flex-wrap gap-3">
                      {user?.phoneNumber && (
                        <span>
                          <i className="fa fa-phone me-1" /> {user.phoneNumber}
                        </span>
                      )}
                      {user?.group?.name && (
                        <span>
                          <i className="fa fa-shield-halved me-1" />{" "}
                          {user.group.name}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <hr />
                <div className="row g-3">
                  <div className="col-md-6">
                    {fieldLabel("Username")}
                    <div className="form-control bg-light">
                      {user?.userName || "-"}
                    </div>
                  </div>
                  <div className="col-md-6">
                    {fieldLabel("Email")}
                    <div className="form-control bg-light">
                      {user?.email || "-"}
                    </div>
                  </div>
                  <div className="col-md-6">
                    {fieldLabel("Country")}
                    <div className="form-control bg-light">
                      {user?.country || "-"}
                    </div>
                  </div>
                  <div className="col-md-6">
                    {fieldLabel("Phone")}
                    <div className="form-control bg-light">
                      {user?.phoneNumber || "-"}
                    </div>
                  </div>
                  <div className="col-md-6">
                    {fieldLabel("Role")}
                    <div className="form-control bg-light">
                      {user?.group?.name || "-"}
                    </div>
                  </div>
                  <div className="col-md-6">
                    {fieldLabel("Created")}
                    <div className="form-control bg-light">
                      {user?.creationDate
                        ? new Date(user.creationDate).toLocaleString()
                        : "-"}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={handleClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserView;
