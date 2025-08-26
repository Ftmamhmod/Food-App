import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { toastConfig } from "../../../../utils/toast-config";
import { axiosInstance, endpoints } from "../../../../utils/axios";

const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.post(endpoints.users.register, data);
      toast.success("Register successful!", response.data.message, toastConfig);
      navigate("/verify-account");
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
        <div className="input-group mt-2">
          <span className="input-group-text text-muted" id="basic-addon1">
            <i className="fa fa-envelope"></i>
          </span>
          <input
            {...register("userName", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email format",
              },
            })}
            type="text"
            className="form-control"
            placeholder="User Name"
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
            {...register("email", { required: "Password is required" })}
            type="email"
            className="form-control"
            placeholder="Enter your E-mail"
            aria-label="Password"
            aria-describedby="basic-addon1"
          />
        </div>
        {errors.password && (
          <span className="text-danger">{errors.password.message}</span>
        )}
      </div>
      <div className="d-flex ">
        <div className="input-group mt-4">
          <span className="input-group-text text-muted" id="basic-addon1">
            <i className="fa fa-envelope"></i>
          </span>
          <input
            {...register("country", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email format",
              },
            })}
            type="text"
            className="form-control"
            placeholder="Country"
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
            {...register("PhoneNumber", { required: "Password is required" })}
            type="number"
            className="form-control"
            placeholder="Phone Number"
            aria-label="Password"
            aria-describedby="basic-addon1"
          />
        </div>
        {errors.password && (
          <span className="text-danger">{errors.password.message}</span>
        )}
      </div>
      <div className="d-flex ">
        <div className="input-group mt-4">
          <span className="input-group-text text-muted" id="basic-addon1">
            <i className="fa fa-envelope"></i>
          </span>
          <input
            {...register("Password", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email format",
              },
            })}
            type="password"
            className="form-control"
            placeholder="Password"
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
            {...register("confirmPassword", {
              required: "Password is required",
            })}
            type="password"
            className="form-control"
            placeholder="Confirm Password "
            aria-label="Password"
            aria-describedby="basic-addon1"
          />
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
