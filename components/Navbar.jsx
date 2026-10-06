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
      <Link to="/">Home</Link>

      {/* Links */}
      <ul className="navbar-links">

        {/* 🔹 Usuario NO logueado */}
        {!isLoggedIn && (
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
        )}

        {/* 🔹 Usuario logueado */}
        {isLoggedIn && (
          <>
            <li>
              <NavLink to="/recipes" className="nav-item">
                Recipes
              </NavLink>
            </li>

            <li>
              <NavLink to="/recipes/create" className="nav-item">
                Create Recipe
              </NavLink>
            </li>

            {/* Opcional: mostrar el nombre del usuario */}
            <li className="welcome">
              Hi, {user?.username || user?.name}
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
