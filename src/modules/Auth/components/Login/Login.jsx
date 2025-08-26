import axios from "axios";
import { useState } from "react";

import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import { toastConfig } from "../../../../utils/toast-config";

const Login = ({ handleLogin }) => {
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "https://upskilling-egypt.com:3006/api/v1/Users/Login",
        data
      );
      localStorage.setItem("token", response.data.token);
      toast.success("Login successful!", toastConfig);
      navigate("/dashboard");
      handleLogin();
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
        <h4 className="fw-bold  ">Log In</h4>
        <p className="text-muted">Welcome Back! Please enter your details</p>
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
      <div className="links d-flex justify-content-between mt-1 ">
        <Link to="/register" className="text-decoration-none text-black">
          Register Now?
        </Link>
        <Link
          to="/forget-password"
          className="text-decoration-none text-success"
        >
          Forget Password?
        </Link>
      </div>
      <div className="mt-4 mb-4">
        <button type="submit" className="btn w-100 p-2 login-btn fw-bold">
          Login
        </button>
      </div>
    </form>
  );
};

export default Login;
