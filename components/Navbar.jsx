import { useContext } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logOutUser();
    navigate("/");
  };

  return (
    <nav className="navbar">

      {/* Logo */}
      <Link to="/" className="navbar-logo">
        <img src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Recipe_Unlimited_logo.png?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=original" alt="Logo" />
      </Link>

      {/* Links */}
      <ul className="navbar-links">
        {!isLoggedIn ? (
          <>
            <li>
              <NavLink to="/login" className="nav-item">
                Login
              </NavLink>
            </li>
            <li>
              <NavLink to="/register" className="nav-item">
                Register
              </NavLink>
            </li>
          </>
        ) : (
          <>
            <li>
                <Link to="/recipes">Recipes</Link>
            </li>
            <li>
                <Link to={`/recipes/create`}>Create a recipe</Link>
            </li>
            <li>
              <Link className="logout-btn" onClick={handleLogout}>
                Logout
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
