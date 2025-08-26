import { Sidebar as ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import logo from "./../../../../assets/images/3.png";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Sidebar = ({ handleLogout }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const handleToggle = () => {
    setIsCollapsed(!isCollapsed);
  };
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (windowWidth < 768) {
      setIsCollapsed(true);
    }
  }, [windowWidth]);

  return (
    <div className="sidebar-container fixed h-100">
      <ProSidebar collapsed={isCollapsed}>
        <Menu>
          <img
            className="w-100 pt-4"
            onClick={handleToggle}
            src={logo}
            alt="logo"
          />
          <div className="pt-5">
            <MenuItem
              icon={<i className="fa fa-home"></i>}
              component={<Link to={"/dashboard"} />}
            >
              {" "}
              Home{" "}
            </MenuItem>
            <MenuItem
              icon={<i className="fa fa-users"></i>}
              component={<Link to={"/dashboard/users"} />}
            >
              {" "}
              Users{" "}
            </MenuItem>
            <MenuItem
              icon={<i className="fa fa-utensils"></i>}
              component={<Link to={"/dashboard/recipes"} />}
            >
              Recipes
            </MenuItem>
            <MenuItem
              icon={<i className="fa fa-list"></i>}
              component={<Link to={"/dashboard/categories"} />}
            >
              Categories
            </MenuItem>
            <MenuItem
              icon={<i className="fa fa-key"></i>}
              component={<Link to={"/change-password"} />}
            >
              Change Password
            </MenuItem>
            <MenuItem
              icon={<i className="fa fa-sign-out-alt"></i>}
              onClick={handleLogout}
            >
              Log out
            </MenuItem>
          </div>
        </Menu>
      </ProSidebar>
    </div>
  );
};
export default Sidebar;
