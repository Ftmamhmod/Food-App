const Sidebar = ({ handleLogout }) => {
  return (
    <div>
      Sidebar
      <button className="btn btn-danger" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
