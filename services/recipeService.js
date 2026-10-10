import axios from "axios";
import { API_URL } from "../config/config";

const getToken = () => localStorage.getItem("authToken");
const authHeaders = () => ({
  headers: { Authorization: `Bearer ${getToken()}` }
});

export const likeRecipeService = (id) =>
  axios.post(`${API_URL}/recipes/${id}/like`, null, authHeaders());


// BUSCADOR
export const searchRecipesService = (params) =>
  axios.get(`${API_URL}/recipes/search`, { params });

// GET todas
export const getRecipesService = () =>
  axios.get(`${API_URL}/recipes`);

// GET una
export const getRecipeService = (id) =>
  axios.get(`${API_URL}/recipes/${id}`);

// Crear
export const createRecipeService = (recipeData) =>
  axios.post(`${API_URL}/recipes`, recipeData, authHeaders());

// Editar
export const editRecipeService = (id, recipeData) =>
  axios.put(`${API_URL}/recipes/${id}`, recipeData, authHeaders());

// Borrar
export const deleteRecipeService = (id) =>
  axios.delete(`${API_URL}/recipes/${id}`, authHeaders());
