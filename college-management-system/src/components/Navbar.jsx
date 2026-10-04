import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaBell, FaSignOutAlt } from "react-icons/fa";

const Navbar = () => {

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="navbar">

      <div>
        <span className="breadcrumb">CampusOne / Workspace</span>
        <h3>College Management System</h3>
      </div>

      <div className="navbar-right">

        <button className="notification-btn" aria-label="Notifications"><FaBell /><i /></button>

        <div className="profile">
          <div className="avatar">
            {user?.name?.charAt(0) || "U"}
          </div>

          <div>
            <strong>{user?.name || "User"}</strong>
            <small>{user?.role || "Student"}</small>
          </div>
        </div>

        <button
          className="logout-btn"
          onClick={() => { logout(); navigate("/login"); }}
        >
          <FaSignOutAlt /> Logout
        </button>

      </div>

    </header>
  );
};

export default Navbar;
