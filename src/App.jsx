import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
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

function App() {
  const routes = createBrowserRouter([
    {
      path: "",
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        { path: "", element: <Login /> },
        { path: "Login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "forget-pass", element: <ForgetPass /> },
        { path: "change-pass", element: <ChangePass /> },
        { path: "reset-pass", element: <ResetPass /> },
        { path: "verify-account", element: <VerifyAccount /> },
      ],
    },
    {
      path: "dashboard",
      element: <MasterLayout />,
      errorElement: <NotFound />,
      children: [
        { path: "", element: <Dashboard /> },
        { path: "recipe", element: <ResipesList /> },
        { path: "recipe-data", element: <ResipesData /> },
        { path: "categories", element: <CategoriesList /> },
        { path: "categories-data", element: <CategoriesData /> },
        { path: "favourites", element: <FavList /> },
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
