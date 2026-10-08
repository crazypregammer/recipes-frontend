import axios from "axios";

const API_URL = "http://localhost:5005/api/auth";

// Registrar usuario
export const registerService = async (userData) => {
  return axios.post(`${API_URL}/register`, userData);
};

// Login usuario
export const loginService = async (userData) => {
  return axios.post(`${API_URL}/login`, userData);
};

// Verificar token
export const verifyService = () => {
  const storedToken = localStorage.getItem("authToken");

  if (!storedToken) {
    // ⬅ evita llamar al backend sin token
    return Promise.reject("No token");
  }

  return axios.get("http://localhost:5005/api/auth/verify", {
    headers: {
      Authorization: `Bearer ${storedToken}`
    }
  });
};

