import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import avatar from "../../../assets/images/abstract-user-flat-4.png";
import { axiosInstance, baseImgURL, endpoints } from "../../../utils/axios";
import Loader from "../../Shared/Loader/Loader";
import { toast } from "react-toastify";
import { toastConfig } from "../../../utils/toast-config";
import { AuthContext } from "../../../context/AuthContext";

const ProfileData = () => {
  const { handleLogin } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
    watch,
  } = useForm({
    defaultValues: {
      userName: "",
      email: "",
      phoneNumber: "",
      userGroup: "",
      country: "",
      profileImage: "",
      confirmPassword: "",
    },
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [saving, setSaving] = useState(false);

  const getCurrentUser = async () => {
    try {
      const response = await axiosInstance.get(endpoints.users.current);
      setUser(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching current user:", error);
      throw error;
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  const handleEditToggle = () => setIsEditing((p) => !p);

  const onSubmit = async (data) => {
    try {
      setSaving(true);
      const formData = new FormData();
      formData.append("userName", data.userName);
      formData.append("phoneNumber", data.phoneNumber || "");
      formData.append("email", data.email || "");
      formData.append("country", data.country || "");
      formData.append("confirmPassword", data.confirmPassword);
      formData.append("profileImage", data.profileImage[0]);
      await axiosInstance.put(endpoints.users.updateProfile, formData);
      toast.success("Profile updated successfully", toastConfig);
      handleLogin();
      const updatedUser = await getCurrentUser();
      reset({
        userName: updatedUser.userName || "",
        email: updatedUser.email || "",
        phoneNumber: updatedUser.phoneNumber || "",
        userGroup: updatedUser.group?.name || "",
        country: updatedUser.country || "",
        profileImage: updatedUser.imagePath || "",
        confirmPassword: "",
      });
      setImagePreview(null);
      setIsEditing(false);
    } catch (error) {
      toast.error(error.message, toastConfig);
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    if (user) {
      reset({
        userName: user.userName || "",
        email: user.email || "",
        phoneNumber: user.phoneNumber || "",
        userGroup: user.group?.name || "",
        country: user.country || "",
        profileImage: user.imagePath || "",
        confirmPassword: "",
      });
    }
  }, [user, reset]);

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-8">
          <div className="card shadow-sm border-0 rounded-4 overflow-hidden">
            <div className="card-body p-4">
              <div className="d-flex flex-column flex-md-row align-items-center gap-4 mb-4">
                <div className="position-relative text-center">
                  <div
                    className="rounded-circle border overflow-hidden mx-auto"
                    style={{ width: 120, height: 120 }}
                  >
                    <img
                      src={
                        imagePreview
                          ? imagePreview
                          : user?.imagePath
                          ? `${baseImgURL}${user?.imagePath}`
                          : avatar
                      }
                      alt="avatar"
                      width={120}
                      height={120}
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  {isEditing && (
                    <div className="mt-2">
                      <label className="btn btn-sm btn-outline-secondary rounded-5 mb-0">
                        <i className="fa fa-camera me-1" /> Change Photo
                        <input
                          type="file"
                          accept="image/*"
                          hidden
                          {...register("profileImage")}
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const url = URL.createObjectURL(file);
                              setImagePreview(url);
                            }
                          }}
                        />
                      </label>
                      {imagePreview && (
                        <button
                          type="button"
                          className="btn btn-sm btn-link text-danger"
                          onClick={() => {
                            setImagePreview(null);
                          }}
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  )}
                  {user?.group?.name && (
                    <span className="badge bg-warning text-dark position-absolute top-0 start-100 translate-middle rounded-pill">
                      {user?.group?.name}
                    </span>
                  )}
                </div>
                <div className="flex-grow-1 text-center text-md-start">
                  <h3 className="mb-1">{user?.userName || "User"}</h3>
                  <p className="text-muted mb-2">{user?.email || "No email"}</p>
                  <div className="small text-secondary">
                    {user?.phoneNumber && (
                      <span className="me-3">
                        <i className="fa fa-phone me-1"></i>
                        {user?.phoneNumber}
                      </span>
                    )}
                    {user?.userGroup && (
                      <span>
                        <i className="fa fa-shield-halved me-1"></i>
                        {user?.userGroup}
                      </span>
                    )}
                  </div>
                </div>
                <div>
                  {!isEditing && (
                    <button
                      onClick={handleEditToggle}
                      className="btn btn-outline-success rounded-5 px-4"
                    >
                      <i className="fa fa-edit me-2" /> Edit
                    </button>
                  )}
                </div>
              </div>

              <hr />

              {!isEditing && (
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label text-uppercase small fw-semibold text-secondary">
                      Username
                    </label>
                    <div className="form-control bg-light">
                      {watch("userName") || "-"}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label text-uppercase small fw-semibold text-secondary">
                      Email
                    </label>
                    <div className="form-control bg-light">
                      {watch("email") || "-"}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label text-uppercase small fw-semibold text-secondary">
                      Country
                    </label>
                    <div className="form-control bg-light">
                      {watch("country") || "-"}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label text-uppercase small fw-semibold text-secondary">
                      Phone
                    </label>
                    <div className="form-control bg-light">
                      {watch("phoneNumber") || "-"}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label text-uppercase small fw-semibold text-secondary">
                      Role
                    </label>
                    <div className="form-control bg-light">
                      {watch("userGroup") || "-"}
                    </div>
                  </div>
                </div>
              )}

              {isEditing && (
                <form className="row g-3" onSubmit={handleSubmit(onSubmit)}>
                  <div className="col-md-6">
                    <label className="form-label">Username</label>
                    <input
                      {...register("userName", {
                        required: "Username is required",
                      })}
                      className={`form-control ${
                        errors.userName ? "is-invalid" : ""
                      }`}
                    />
                    {errors.userName && (
                      <div className="invalid-feedback">
                        {errors.userName.message}
                      </div>
                    )}
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Email</label>
                    <input
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value:
                            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                          message: "Invalid email format",
                        },
                      })}
                      type="email"
                      className={`form-control ${
                        errors.email ? "is-invalid" : ""
                      }`}
                    />
                    {errors.email && (
                      <div className="invalid-feedback">
                        {errors.email.message}
                      </div>
                    )}
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Country</label>
                    <input
                      {...register("country", {
                        required: "Country is required",
                      })}
                      className={`form-control ${
                        errors.country ? "is-invalid" : ""
                      }`}
                    />
                    {errors.country && (
                      <div className="invalid-feedback">
                        {errors.country.message}
                      </div>
                    )}
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Phone</label>
                    <input
                      {...register("phoneNumber", {
                        required: "Phone number is required",
                        minLength: { value: 6, message: "Too short" },
                      })}
                      className={`form-control ${
                        errors.phoneNumber ? "is-invalid" : ""
                      }`}
                    />
                    {errors.phoneNumber && (
                      <div className="invalid-feedback">
                        {errors.phoneNumber.message}
                      </div>
                    )}
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Role</label>
                    <input
                      {...register("userGroup")}
                      className="form-control"
                      disabled
                      readOnly
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Password </label>
                    <input
                      type="password"
                      placeholder="Enter password"
                      {...register("confirmPassword", {
                        minLength: {
                          value: 8,
                          message: "Password must be at least 8 characters",
                        },
                      })}
                      className={`form-control ${
                        errors.confirmPassword ? "is-invalid" : ""
                      }`}
                      autoComplete="new-password"
                    />
                    {errors.confirmPassword && (
                      <div className="invalid-feedback">
                        {errors.confirmPassword.message}
                      </div>
                    )}
                  </div>
                  <div className="col-12 d-flex gap-2 justify-content-end mt-3">
                    <button
                      type="button"
                      onClick={handleEditToggle}
                      className="btn btn-light border"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-success d-flex align-items-center gap-2"
                      disabled={saving || !isDirty}
                    >
                      {saving && (
                        <span
                          className="spinner-border spinner-border-sm"
                          role="status"
                        />
                      )}
                      <span>
                        {saving
                          ? "Saving..."
                          : isDirty
                          ? "Save Changes"
                          : "No Changes"}
                      </span>
                    </button>
                  </div>
                </form>
              )}
              {saving && !isEditing && (
                <Loader height={120} label="Updating..." />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileData;
