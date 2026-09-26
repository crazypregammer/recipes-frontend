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
export const verifyService = async () => {
  const storedToken = localStorage.getItem("authToken");

  return axios.get(`${API_URL}/verify`, {
    headers: {
      Authorization: `Bearer ${storedToken}`,
    },
  });
};
