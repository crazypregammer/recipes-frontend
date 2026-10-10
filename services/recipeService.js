import axios from "axios";

const API_URL = "http://localhost:5005/api/recipes";

const getToken = () => localStorage.getItem("authToken");
const authHeaders = () => ({
  headers: { Authorization: `Bearer ${getToken()}` }
});

export const likeRecipeService = (id) =>
  axios.post(`${API_URL}/${id}/like`, null, authHeaders());


// BUSCADOR
export const searchRecipesService = (params) =>
  axios.get(`${API_URL}/search`, { params });

// GET todas
export const getRecipesService = () =>
  axios.get(API_URL);

// GET una
export const getRecipeService = (id) =>
  axios.get(`${API_URL}/${id}`);

// Crear
export const createRecipeService = (recipeData) =>
  axios.post(API_URL, recipeData, authHeaders());

// Editar
export const editRecipeService = (id, recipeData) =>
  axios.put(`${API_URL}/${id}`, recipeData, authHeaders());

// Borrar
export const deleteRecipeService = (id) =>
  axios.delete(`${API_URL}/${id}`, authHeaders());
