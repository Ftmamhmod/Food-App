import { Navigate } from "react-router-dom";

const ProtectedRouted = ({ children, loginUser }) => {
  if (localStorage.getItem("token") || loginUser) {
    return children;
  }
  return <Navigate to="/" replace />;
};

export default ProtectedRouted;
