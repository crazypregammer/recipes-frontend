import axios from "axios";

const API_URL = "http://localhost:5005/api/users";

export const getUserService = (userId) =>
  axios.get(`${API_URL}/${userId}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` }
  });

  const getToken = () => localStorage.getItem("authToken");

export const addFavoriteService = (userId, recipeId) =>
  axios.post(`${API_URL}/${userId}/favorites/${recipeId}`, null, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });

export const removeFavoriteService = (userId, recipeId) =>
  axios.delete(`${API_URL}/${userId}/favorites/${recipeId}`, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
