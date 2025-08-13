import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";

const ResetPass = () => {
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
      const response = await axios.post(
        "https://upskilling-egypt.com:3006/api/v1/Users/Reset",
        data
      );
      toast.success(response.data.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
      navigate("/login");
    } catch (error) {
      toast.error(`Reset password failed. ${error.response.data.message}`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="title mt-4">
        <h4 className="fw-bold  "> Reset Password</h4>
        <p className="text-muted">Please Enter Your OTP or Check Your Inbox</p>
      </div>

      <div className="input-group mt-4">
        <span className="input-group-text text-muted" id="basic-addon1">
          <i className="fa fa-envelope"></i>
        </span>
        <input
          disabled
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Invalid email format",
            },
          })}
          type="text"
          className="form-control"
          placeholder={email || "Enter your E-mail"}
          aria-label="Username"
          defaultValue={email || ""}
          aria-describedby="basic-addon1"
        />
      </div>
      {errors.email && (
        <span className="text-danger">{errors.email.message}</span>
      )}
      <div className="input-group mt-2">
        <span className="input-group-text text-muted" id="basic-addon1">
          <i className="fa fa-key"></i>
        </span>
        <input
          {...register("seed", { required: "OTP is required" })}
          type="text"
          className="form-control"
          maxLength="4"
          placeholder=" OTP"
          aria-label="OTP"
          aria-describedby="basic-addon1"
        />
      </div>
      {errors.otp && <span className="text-danger">{errors.otp.message}</span>}
      <div className="input-group mt-2">
        <span className="input-group-text text-muted" id="basic-addon1">
          <i className="fa fa-lock"></i>
        </span>
        <input
          {...register("password", { required: "Password is required" })}
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
              showPassword ? "fa-eye-slash" : "fa-eye"
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
          {...register("confirmPassword", {
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
              showPassword ? "fa-eye-slash" : "fa-eye"
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

export default ResetPass;
