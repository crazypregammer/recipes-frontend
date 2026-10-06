import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerService } from "../services/authService";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    if (password !== verifyPassword) {
      return alert("Passwords do not match");
    }

    registerService({ username, email, password })
      .then(() => navigate("/login"))
      .catch((error) => {
        console.log(error);
        alert(error.response?.data?.message || "Error registering");
      });
  };

  return (
    <div className="auth-container">
      <h1 className="auth-title">Register</h1>

      <form className="auth-form" onSubmit={handleRegister}>
        <label>Username</label>
        <input
          type="text"
          value={username}
          placeholder="Your username..."
          onChange={(e) => setUsername(e.target.value)}
        />

        <label>Email</label>
        <input
          type="email"
          value={email}
          placeholder="you@example.com"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password</label>
        <input
          type="password"
          value={password}
          placeholder="••••••••"
          onChange={(e) => setPassword(e.target.value)}
        />

        <label>Verify password</label>
        <input
          type="password"
          value={verifyPassword}
          placeholder="••••••••"
          onChange={(e) => setVerifyPassword(e.target.value)}
        />

        <div className="auth-buttons">
          <button type="submit" className="btn-primary">Register</button>
          <button type="button" className="btn-secondary" onClick={() => navigate(-1)}>Back</button>
        </div>
      </form>
    </div>
  );
}
