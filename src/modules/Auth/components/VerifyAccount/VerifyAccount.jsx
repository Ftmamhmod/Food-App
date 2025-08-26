import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance, endpoints } from "../../../../utils/axios";
import { toastConfig } from "../../../../utils/toast-config";
import { toast } from "react-toastify";
import { useState } from "react";

const VerifyAccount = () => {
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.post(endpoints.users.login, data);
      localStorage.setItem("token", response.data.token);
      toast.success("Login successful!", toastConfig);
      navigate("/dashboard");
    } catch (error) {
      toast.error(`Login failed. ${error.response.data.message}`, toastConfig);
    }
  };
  if (localStorage.getItem("token")) {
    navigate("/dashboard");
  }
  const [showPassword, setShowPassword] = useState(false);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="title mt-4">
        <h4 className="fw-bold  ">Verify Account</h4>
        <p className="text-muted">Please Enter Your Otp or Check Your Inbox</p>
      </div>

      <div className="input-group mt-4">
        <span className="input-group-text text-muted" id="basic-addon1">
          <i className="fa fa-envelope"></i>
        </span>
        <input
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Invalid email format",
            },
          })}
          type="text"
          className="form-control"
          placeholder="Enter your E-mail"
          aria-label="Username"
          aria-describedby="basic-addon1"
        />
      </div>
      {errors.email && (
        <span className="text-danger">{errors.email.message}</span>
      )}
      <div className="input-group mt-3">
        <span className="input-group-text text-muted" id="basic-addon1">
          <i className="fa fa-lock"></i>
        </span>
        <input
          {...register("password", { required: "Password is required" })}
          type={showPassword ? "text" : "password"}
          className="form-control"
          placeholder="Password"
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

      <div className="mt-4 mb-4">
        <button type="submit" className="btn w-100 p-2 login-btn fw-bold">
          Login
        </button>
      </div>
    </form>
  );
};

export default VerifyAccount;
