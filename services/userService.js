import axios from "axios";
import { API_URL } from "../config/config";

export const getUserService = (userId) =>
  axios.get(`${API_URL}/api/users/${userId}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` }
  });

  const getToken = () => localStorage.getItem("authToken");

export const addFavoriteService = (userId, recipeId) =>
  axios.post(`${API_URL}/api/users/${userId}/favorites/${recipeId}`, null, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });

export const removeFavoriteService = (userId, recipeId) =>
  axios.delete(`${API_URL}/api/users/${userId}/favorites/${recipeId}`, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
