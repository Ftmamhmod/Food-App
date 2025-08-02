import axios from "axios";
import { useForm } from "react-hook-form";
import { Bounce, toast } from "react-toastify";

const ResetPass = () => {
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
      console.log(response);
      toast.success("Login successful!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    } catch (error) {
      toast.error(`Login failed. ${error.response.data.message}`, {
        position: "top-right",
        autoClose: 5000,
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
      <div className="input-group mt-4">
        <span className="input-group-text text-muted" id="basic-addon1">
          <i className="fa fa-key"></i>
        </span>
        <input
          {...register("otp", { required: "OTP is required" })}
          type="text"
          className="form-control"
          placeholder="Enter OTP"
          aria-label="OTP"
          aria-describedby="basic-addon1"
        />
      </div>
      {errors.otp && <span className="text-danger">{errors.otp.message}</span>}
      <div className="input-group mt-4">
        <span className="input-group-text text-muted" id="basic-addon1">
          <i className="fa fa-lock"></i>
        </span>
        <input
          {...register("password", { required: "Password is required" })}
          type="password"
          className="form-control"
          placeholder="New Password"
          aria-label="Password"
          aria-describedby="basic-addon1"
        />
      </div>
      {errors.password && (
        <span className="text-danger">{errors.password.message}</span>
      )}

      <div className="input-group mt-4">
        <span className="input-group-text text-muted" id="basic-addon1">
          <i className="fa fa-lock"></i>
        </span>
        <input
          {...register("password", { required: "Password is required" })}
          type="password"
          className="form-control"
          placeholder="Confirm New Password"
          aria-label="Password"
          aria-describedby="basic-addon1"
        />
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

export default ResetPass;
