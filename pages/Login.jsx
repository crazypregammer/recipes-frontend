import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { loginService } from "../services/authService";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { logInUser } = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();

    loginService({ username, password })
      .then((response) => {
        const token = response.data.authToken;
        logInUser(token);
        navigate("/recipes");
      })
      .catch((error) => {
        console.log(error);
        alert(error.response?.data?.message || "Error logging in");
      });
  };

  return (
    <div className="auth-container">
      <h1 className="auth-title">Login</h1>

      <form className="auth-form" onSubmit={handleLogin}>
        <label>Username</label>
        <input
          type="text"
          value={username}
          placeholder="Your username..."
          onChange={(e) => setUsername(e.target.value)}
        />

        <label>Password</label>
        <input
          type="password"
          value={password}
          placeholder="••••••••"
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="auth-buttons">
          <button type="submit" className="btn-primary">Login</button>
          <button type="button" className="btn-secondary" onClick={() => navigate(-1)}>Back</button>
        </div>
      </form>
    </div>
  );
}
