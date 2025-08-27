import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { toastConfig } from "../../../../utils/toast-config";
import { axiosInstance, endpoints } from "../../../../utils/axios";

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();
  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.post(endpoints.users.register, data);
      toast.success("Register successful!", response.data.message, toastConfig);
      navigate("/verify-account", { state: { email: data.email } });
    } catch (error) {
      toast.error(
        `Register failed. ${error.response.data.message}`,
        toastConfig
      );
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="title mt-4">
        <h4 className="fw-bold  ">Register</h4>
        <p className="text-muted">Welcome Back! Please enter your details</p>
      </div>
      <div className="d-flex ">
        <div className="input-group mt-4">
          <span className="input-group-text text-muted" id="basic-addon1">
            <i className="fa fa-envelope"></i>
          </span>
          <input
            {...register("userName", {
              required: "User name is required",
            })}
            type="text"
            className="form-control"
            placeholder="User Name"
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
        </div>
        {errors.userName && (
          <span className="text-danger">{errors.userName.message}</span>
        )}
        <div className="input-group mt-4">
          <span className="input-group-text text-muted" id="basic-addon1">
            <i className="fa fa-lock"></i>
          </span>
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email format",
              },
            })}
            type="email"
            className="form-control"
            placeholder="Enter your E-mail"
            aria-label="Email"
            aria-describedby="basic-addon1"
          />
        </div>
        {errors.email && (
          <span className="text-danger">{errors.email.message}</span>
        )}
      </div>
      <div className="d-flex ">
        <div className="input-group mt-4">
          <span className="input-group-text text-muted" id="basic-addon1">
            <i className="fa fa-envelope"></i>
          </span>
          <input
            {...register("country", {
              required: "Country is required",
            })}
            type="text"
            className="form-control"
            placeholder="Country"
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
        </div>
        {errors.country && (
          <span className="text-danger">{errors.country.message}</span>
        )}
        <div className="input-group mt-4">
          <span className="input-group-text text-muted" id="basic-addon1">
            <i className="fa fa-lock"></i>
          </span>
          <input
            {...register("phoneNumber", {
              required: "Phone Number is required",
            })}
            type="number"
            className="form-control"
            placeholder="Phone Number"
            aria-label="number"
            aria-describedby="basic-addon1"
          />
        </div>
        {errors.PhoneNumber && (
          <span className="text-danger">{errors.PhoneNumber.message}</span>
        )}
      </div>
      <div className="d-flex ">
        <div className="input-group mt-4">
          <span className="input-group-text text-muted" id="password-addon">
            <i className="fa fa-lock"></i>
          </span>
          <input
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
            type={showPassword ? "text" : "password"}
            className="form-control"
            placeholder="Password"
            aria-label="Password"
            aria-describedby="password-addon password-eye"
          />
          <span
            className="input-group-text cursor-pointer"
            id="password-eye"
            style={{ cursor: "pointer" }}
            onClick={() => setShowPassword((p) => !p)}
          >
            <i className={`fa ${showPassword ? "fa-eye" : "fa-eye-slash"}`}></i>
          </span>
        </div>
        {errors.email && (
          <span className="text-danger">{errors.email.message}</span>
        )}
        <div className="input-group mt-4">
          <span className="input-group-text text-muted" id="confirm-addon">
            <i className="fa fa-lock"></i>
          </span>
          <input
            {...register("confirmPassword", {
              required: "Confirm password is required",
              validate: (value) =>
                value === watch("password") || "Passwords do not match",
            })}
            type={showConfirm ? "text" : "password"}
            className="form-control"
            placeholder="Confirm Password"
            aria-label="Confirm Password"
            aria-describedby="confirm-addon confirm-eye"
          />
          <span
            className="input-group-text cursor-pointer"
            id="confirm-eye"
            style={{ cursor: "pointer" }}
            onClick={() => setShowConfirm((p) => !p)}
          >
            <i className={`fa ${showConfirm ? "fa-eye" : "fa-eye-slash"}`}></i>
          </span>
        </div>
        {errors.password && (
          <span className="text-danger">{errors.password.message}</span>
        )}
      </div>
      <div className="mt-4 mb-4">
        <button type="submit" className="btn w-100 p-2 login-btn fw-bold">
          Register
        </button>
      </div>
    </form>
  );
};

export default Register;
