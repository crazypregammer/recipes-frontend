import axios from "axios";
import { API_URL } from "../config/config";

export const registerService = (userData) =>
  axios.post(`${API_URL}/auth/register`, userData);

export const loginService = (userData) =>
  axios.post(`${API_URL}/auth/login`, userData);

export const verifyService = () => {
  const storedToken = localStorage.getItem("authToken");
  if (!storedToken) return Promise.reject("No token");

  return axios.get(`${API_URL}/auth/verify`, {
    headers: { Authorization: `Bearer ${storedToken}` }
  });
};
