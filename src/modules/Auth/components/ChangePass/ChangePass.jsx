import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { toastConfig } from "../../../../utils/toast-config";
import { toast } from "react-toastify";
import { axiosInstance, endpoints } from "../../../../utils/axios";

const ChangePass = () => {
  const location = useLocation();
  const email = location.state?.email || "";
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    watch,
  } = useForm({
    defaultValues: { email: email || "" },
  });
  const password = watch("password");
  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.post(
        endpoints.users.changePassword,
        data
      );
      toast.success(response.data.message, toastConfig);
      navigate("/login");
    } catch (error) {
      toast.error(
        `Reset password failed. ${error.response.data.message}`,
        toastConfig
      );
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="title mt-4">
        <h4 className="fw-bold  "> Reset Password</h4>
        <p className="text-muted">Please Enter Your OTP or Check Your Inbox</p>
      </div>
      <div className="input-group mt-2">
        <span className="input-group-text text-muted" id="basic-addon1">
          <i className="fa fa-lock"></i>
        </span>
        <input
          {...register("oldPassword", { required: "Old Password is required" })}
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
          {...register("newPassword", { required: "Password is required" })}
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
            validate: (value) => value === password || "Passwords do not match",
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
        <span className="text-danger">{errors.confirmPassword.message}</span>
      )}

      <div className="mt-3 mb-4">
        <button
          type="submit"
          className="btn w-100 p-2 login-btn fw-bold"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Reset Password"}
        </button>
      </div>
    </form>
  );
};

export default ChangePass;
