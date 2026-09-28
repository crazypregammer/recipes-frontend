import axios from "axios";

const API_URL = "http://localhost:5005/api/recipes";

// Obtener token
const getToken = () => {
  return localStorage.getItem("authToken");
};

// Configurar headers
const authHeaders = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`
  }
});

export const addCommentService = (id, text) => {
  return axios.post(
    `${API_URL}/${id}/comments`,
    { text },
    authHeaders()
  );
};


// GET todas las recetas
export const getRecipesService = () => {
  return axios.get(API_URL);
};

// GET una receta por ID
export const getRecipeService = (id) => {
  return axios.get(`${API_URL}/${id}`);
};

// POST crear receta
export const createRecipeService = (recipeData) => {
  return axios.post(API_URL, recipeData, authHeaders());
};

// PUT editar receta
export const editRecipeService = (id, recipeData) => {
  return axios.put(`${API_URL}/${id}`, recipeData, authHeaders());
};

// DELETE borrar receta
export const deleteRecipeService = (id) => {
  return axios.delete(`${API_URL}/${id}`, authHeaders());
};
