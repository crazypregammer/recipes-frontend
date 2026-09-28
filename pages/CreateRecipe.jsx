import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createRecipeService } from "../services/recipeService";

export default function CreateRecipe() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [img, setImg] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const [category, setCategory] = useState("");
  const [time, setTime] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const recipeData = {
      title,
      img,
      category,
      time,
      ingredients: ingredients.split(",").map((i) => i.trim()),
      steps: steps.split(".").map((s) => s.trim()).filter((s) => s !== "")
    };

    createRecipeService(recipeData)
      .then(() => navigate("/recipes"))
      .catch((error) => {
        console.log(error);
        alert(error.response?.data?.message || "Error creating recipe");
      });
  };

  return (
    <div>
      <h1>Create Recipe</h1>

      <form onSubmit={handleSubmit}>

        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Image URL</label>
        <input
          type="text"
          value={img}
          onChange={(e) => setImg(e.target.value)}
        />

        <label>Category</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <label>Time</label>
        <input
          type="text"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />

        <label>Ingredients (separated by commas)</label>
        <input
          type="text"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
        />

        <label>Steps (separate each step with a period)</label>
        <textarea
          value={steps}
          onChange={(e) => setSteps(e.target.value)}
        />

        <div>
          <button type="submit">Create</button>
          <button type="button" onClick={() => navigate(-1)}>Back</button>
        </div>

      </form>
    </div>
  );
}
