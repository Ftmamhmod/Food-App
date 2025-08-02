import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";

const ForgetPass = () => {
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "https://upskilling-egypt.com:3006/api/v1/Users/Reset/Request",
        data
      );
      console.log(response);
      toast.success("Reset link sent!", {
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
      navigate("/reset-pass");
    } catch (error) {
      toast.error(`Reset link failed. ${error.response.data.message}`, {
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
        <h4 className="fw-bold  ">Forgot Your Password?</h4>
        <p className="text-muted">
          No worries! Please enter your email and we will send a password reset
          link
        </p>
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
      <div className="mt-4 mb-4">
        <button type="submit" className="btn w-100 p-2 login-btn fw-bold">
          Submit
        </button>
      </div>
    </form>
  );
};

export default ForgetPass;
