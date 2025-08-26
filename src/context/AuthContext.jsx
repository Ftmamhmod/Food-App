import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [loginUser, setLoginUser] = useState(null);
  const handleLogin = () => {
    const encode = localStorage.getItem("token");

    if (encode) {
      const decode = jwtDecode(encode);

      setLoginUser(decode);
    }
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      handleLogin();
    }
  }, []);
  return (
    <AuthContext.Provider value={{ loginUser, setLoginUser, handleLogin }}>
      {children}
    </AuthContext.Provider>
  );
};
