import { NavLink, useNavigate } from "react-router-dom";
import './Navbar.css';

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Add your logout logic here (e.g., clear auth tokens)
    alert("Logged out successfully!");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo" onClick={() => navigate("/")}>
          {/* You can replace this with your logo */}
          <span>MyApp</span>
        </div>
        <ul className="navbar-menu">
          <li>
            <NavLink to="/home" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/profile" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
              Profile
            </NavLink>
          </li>
          <li>
            <button onClick={handleLogout} className="nav-link logout-btn">
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
