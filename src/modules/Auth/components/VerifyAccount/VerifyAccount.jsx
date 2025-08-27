import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { axiosInstance, endpoints } from "../../../../utils/axios";
import { toastConfig } from "../../../../utils/toast-config";
import { toast } from "react-toastify";
import { useEffect } from "react";

const VerifyAccount = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const passedEmail = location.state?.email || "";
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({
    defaultValues: { email: passedEmail, code: "" },
  });

  useEffect(() => {
    if (!passedEmail) {
      navigate("/register");
    }
  });
  const onSubmit = async (data) => {
    data.email = passedEmail;
    try {
      const response = await axiosInstance.put(endpoints.users.verify, data);
      toast.success("Registration successful!", toastConfig);
      navigate("/dashboard");
      return "token", response.data.token;
    } catch (error) {
      toast.error(
        `Registration failed. ${error.response.data.message}`,
        toastConfig
      );
    }
  };
  if (localStorage.getItem("token")) {
    navigate("/dashboard");
  }
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
          {...register("email")}
          type="email"
          className="form-control"
          aria-label="Email"
          aria-describedby="basic-addon1"
          value={watch("email")}
          disabled
          readOnly
        />
      </div>
      {!passedEmail && (
        <span className="text-danger small">
          No email provided. Go back to Register.
        </span>
      )}
      <div className="input-group mt-3">
        <span className="input-group-text text-muted" id="basic-addon1">
          <i className="fa fa-lock"></i>
        </span>
        <input
          {...register("code", { required: "OTP is required" })}
          type="text"
          className="form-control"
          placeholder="OTP"
          aria-label="OTP"
          aria-describedby="basic-addon1"
        />
      </div>
      {errors.code && (
        <span className="text-danger">{errors.code.message}</span>
      )}

      <div className="mt-4 mb-4">
        <button type="submit" className="btn w-100 p-2 login-btn fw-bold">
          Verify
        </button>
      </div>
    </form>
  );
};

export default VerifyAccount;
