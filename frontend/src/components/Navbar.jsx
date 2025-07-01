import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext";
import "../styles/Navbar.css";

export default function Navbar() {
  const { logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        {/* Brand / logo */}
        <Link to="/user/home" className="brand">Dashboard</Link>

        {/* Center links */}
        <div className="nav-list">
          <Link to="/properties"     className="nav-item">Search</Link>
          <Link to="/properties/new" className="nav-item">Add Property</Link>
        </div>

        {/* Logout */}
        <button onClick={logout} className="btn-logout">Logout</button>
      </div>
    </nav>
  );
}
