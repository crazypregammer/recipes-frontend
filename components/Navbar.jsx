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
        RecipeHub
      </Link>

      {/* Links */}
      <ul className="navbar-links">

        {!isLoggedIn && (
          <>
            <li>
              <NavLink to="/login">
                Login
              </NavLink>
            </li>

            <li>
              <NavLink to="/register" className="nav-item">
                Register
              </NavLink>
            </li>
          </>
        )}

        {isLoggedIn && (
          <>
            <li>
              <NavLink
  to="/recipes"
  end
  className={({isActive}) => isActive ? "active" : "normal"}
>
  Recipes
</NavLink>

            </li>

            <li>
              <NavLink to="/recipes/create" className="nav-item">
                Create Recipe
              </NavLink>
            </li>

            <li className="welcome">
              Hi, {user?.username}
            </li>

            <li>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </>
        )}

      </ul>
    </nav>
  );
}
