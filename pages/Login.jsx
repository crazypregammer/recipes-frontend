import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { loginService } from "../services/authService";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { logInUser } = useContext(AuthContext);   // ← ESTO FALTABA

  const handleLogin = (e) => {
    e.preventDefault();

    loginService({ username, password })
      .then((response) => {
        const token = response.data.authToken;

        logInUser(token);   // ← ahora sí funciona

        navigate("/recipes");
      })
      .catch((error) => {
        console.log(error);
        alert(error.response?.data?.message || "Error logging in");
      });
  };

  return (
    <div>
      <h1>Login</h1>

      <form onSubmit={handleLogin}>
        <label>Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div>
          <button type="submit">Login</button>
          <button type="button" onClick={() => navigate(-1)}>Back</button>
        </div>
      </form>
    </div>
  );
}
