import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./App.css";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import AuthLayout from "./modules/Shared/components/AuthLayout/AuthLayout";
import ForgetPass from "./modules/Auth/components/ForgetPass/ForgetPass";
import ChangePass from "./modules/Auth/components/ChangePass/ChangePass";
import ResetPass from "./modules/Auth/components/ResetPass/ResetPass";
import VerifyAccount from "./modules/Auth/components/VerifyAccount/VerifyAccount";
import NotFound from "./modules/Shared/components/NotFound/NotFound";
import MasterLayout from "./modules/Shared/components/MasterLayout/MasterLayout";
import Dashboard from "./modules/Dashboard/components/Dashboard/Dashboard";
import ResipesData from "./modules/Recipes/components/ResipesData/ResipesData";
import CategoriesList from "./modules/Categories/components/CategoriesList/CategoriesList";
import CategoriesData from "./modules/Categories/components/CategoriesData/CategoriesData";
import FavList from "./modules/Favourites/components/FavList/FavList";
import UserList from "./modules/Users/components/UsersList/UserList";
import Login from "./modules/Auth/components/Login/Login";
import Register from "./modules/Auth/components/Register/Register";
import ResipesList from "./modules/Recipes/components/ResipesList/ResipesList";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import ProtectedRouted from "./modules/Shared/ProtectedRouted/ProtectedRouted";
import { Bounce, toast } from "react-toastify";

function App() {
  const [loginUser, setLoginUser] = useState(null);
  const handleLogin = () => {
    const encode = localStorage.getItem("token");

    if (encode) {
      const decode = jwtDecode(encode);

      setLoginUser(decode);
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    <Navigate to="/login" />;
    setLoginUser(null);
    toast.success("Logout successful!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });
  };

  useEffect(() => {
    if (localStorage.getItem("token")) handleLogin();
  }, []);

  const routes = createBrowserRouter([
    {
      path: "",
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        { path: "", element: <Login handleLogin={handleLogin} /> },
        { path: "login", element: <Login handleLogin={handleLogin} /> },
        { path: "register", element: <Register /> },
        { path: "forget-password", element: <ForgetPass /> },
        { path: "reset-password", element: <ResetPass /> },
        { path: "verify-account", element: <VerifyAccount /> },
      ],
    },
    {
      path: "dashboard",
      element: (
        <ProtectedRouted loginUser={loginUser}>
          <MasterLayout handleLogout={handleLogout} loginUser={loginUser} />
        </ProtectedRouted>
      ),
      errorElement: <NotFound />,
      children: [
        { path: "", element: <Dashboard loginUser={loginUser} /> },
        { path: "recipes", element: <ResipesList /> },
        { path: "recipe-data", element: <ResipesData /> },
        { path: "categories", element: <CategoriesList /> },
        { path: "categories-data", element: <CategoriesData /> },
        { path: "favourites", element: <FavList /> },
        {
          path: "change-password",
          element: <ChangePass handleLogout={handleLogout} />,
        },
        { path: "users", element: <UserList /> },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={routes}></RouterProvider>
    </>
  );
}

export default App;
