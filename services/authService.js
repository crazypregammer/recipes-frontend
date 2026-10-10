import axios from "axios";

const API_URL = "http://localhost:5005/api/auth";

export const registerService = (userData) =>
  axios.post(`${API_URL}/register`, userData);

export const loginService = (userData) =>
  axios.post(`${API_URL}/login`, userData);

export const verifyService = () => {
  const storedToken = localStorage.getItem("authToken");
  if (!storedToken) return Promise.reject("No token");

  return axios.get(`${API_URL}/verify`, {
    headers: { Authorization: `Bearer ${storedToken}` }
  });
};
