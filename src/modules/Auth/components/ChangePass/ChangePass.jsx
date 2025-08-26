import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { toastConfig } from "../../../../utils/toast-config";
import { toast } from "react-toastify";
import { axiosInstance, endpoints } from "../../../../utils/axios";

const ChangePass = ({ handleLogout }) => {
  const location = useLocation();
  const email = location.state?.email || "";
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm({
    defaultValues: { email: email || "" },
  });
  const handleClose = () => {
    navigate(-1);
  };

  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.put(
        endpoints.users.changePassword,
        data
      );
      toast.success(response.data.message, toastConfig);
      handleLogout();
      navigate("/login");
    } catch (error) {
      toast.error(
        `Reset password failed. ${error.response.data.message}`,
        toastConfig
      );
    }
  };
  return (
    <div
      className="modal d-block"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title fw-bold">Change Your Password</h5>
            <button
              type="button"
              className="btn-close"
              onClick={handleClose}
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit(onSubmit)}>
              <p className="text-muted">Enter your details below</p>
              <div className="input-group mt-2"></div>
              <div className="input-group mt-2">
                <span className="input-group-text text-muted" id="basic-addon1">
                  <i className="fa fa-lock"></i>
                </span>
                <input
                  {...register("oldPassword", {
                    required: "Old Password is required",
                  })}
                  type={showPassword ? "text" : "password"}
                  minLength={{
                    value: 8,
                    message: "Password must be at least 8 characters",
                  }}
                  className="form-control"
                  placeholder="Old Password"
                  aria-label="Password"
                  aria-describedby="basic-addon1"
                />
                <span
                  className="input-group-text"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <i
                    className={`fa ${
                      showPassword ? "fa-eye" : "fa-eye-slash"
                    } cursor-pointer`}
                  ></i>
                </span>
              </div>
              {errors.password && (
                <span className="text-danger">{errors.password.message}</span>
              )}
              <div className="input-group mt-2">
                <span className="input-group-text text-muted" id="basic-addon1">
                  <i className="fa fa-lock"></i>
                </span>
                <input
                  {...register("newPassword", {
                    required: "Password is required",
                  })}
                  type={showPassword ? "text" : "password"}
                  minLength={{
                    value: 8,
                    message: "Password must be at least 8 characters",
                  }}
                  className="form-control"
                  placeholder="New Password"
                  aria-label="Password"
                  aria-describedby="basic-addon1"
                />
                <span
                  className="input-group-text"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <i
                    className={`fa ${
                      showPassword ? "fa-eye" : "fa-eye-slash"
                    } cursor-pointer`}
                  ></i>
                </span>
              </div>
              {errors.password && (
                <span className="text-danger">{errors.password.message}</span>
              )}

              <div className="input-group mt-2">
                <span className="input-group-text text-muted" id="basic-addon1">
                  <i className="fa fa-lock"></i>
                </span>
                <input
                  {...register("confirmNewPassword", {
                    required: "Confirm Password is required",
                    validate: "Passwords do not match",
                  })}
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="Confirm New Password"
                  aria-label="Password"
                  aria-describedby="basic-addon1"
                />
                <span
                  className="input-group-text"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <i
                    className={`fa ${
                      showPassword ? "fa-eye" : "fa-eye-slash"
                    } cursor-pointer`}
                  ></i>
                </span>
              </div>
              {errors.confirmPassword && (
                <span className="text-danger">
                  {errors.confirmPassword.message}
                </span>
              )}
              <div className="mt-3 mb-4">
                <button
                  type="submit"
                  className="btn w-100 p-2 login-btn fw-bold"
                  disabled={isSubmitting}
                  onClick={handleSubmit(onSubmit)}
                >
                  {isSubmitting ? "Submitting..." : "Change Password"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePass;
