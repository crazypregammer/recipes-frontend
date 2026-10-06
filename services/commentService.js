import axios from "axios";

const API_URL = "http://localhost:5005/api/comments";

const getToken = () => localStorage.getItem("authToken");

// Obtener comentarios de una receta
export const getCommentsByRecipe = (recipeId) => {
  return axios.get(`${API_URL}/recipe/${recipeId}`);
};

// Crear comentario
export const addCommentService = (recipeId, text) => {
  return axios.post(
    `${API_URL}/recipe/${recipeId}`,
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
    `${API_URL}/${commentId}`,
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
  return axios.delete(`${API_URL}/${commentId}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });
};
