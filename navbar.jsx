import { Link } from "react-router-dom";
import { FaHome, FaSignInAlt, FaUserPlus } from "react-icons/fa";
import "./styles.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src="https://img.icons8.com/?size=100&id=25717&format=png" alt="Logo" className="logo" />
        <h1>myapp</h1>
      </div>
      <div className="navbar-right">
        <Link to="/" className="button"><FaHome /> Home</Link>
        <Link to="/signup" className="button"><FaUserPlus /> Sign Up</Link>
        <Link to="/login" className="button"><FaSignInAlt /> Login</Link>
        <Link to="/admin-password" className="button"><FaHome/>Admin</Link>

      </div>
    </nav>
  );
};

export default Navbar;
