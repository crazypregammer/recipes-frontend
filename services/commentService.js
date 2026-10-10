import axios from "axios";
import { API_URL } from "../config/config";

const getToken = () => localStorage.getItem("authToken");

// Obtener comentarios de una receta
export const getCommentsByRecipe = (recipeId) => {
  return axios.get(`${API_URL}/comments/recipe/${recipeId}`);
};

// Crear comentario
export const addCommentService = (recipeId, text) => {
  return axios.post(
    `${API_URL}/comments/recipe/${recipeId}`,
    { text },
    {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );
};

// Editar comentario
export const editCommentService = (commentId, text) => {
  return axios.put(
    `${API_URL}/comments/${commentId}`,
    { text },
    {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );
};

// Borrar comentario
export const deleteCommentService = (commentId) => {
  return axios.delete(`${API_URL}/comments/${commentId}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });
};
