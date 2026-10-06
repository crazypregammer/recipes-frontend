import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getRecipeService, editRecipeService } from "../services/recipeService";

export default function EditRecipe() {
  const { recipeId } = useParams();
  const navigate = useNavigate();

  const [img, setImg] = useState("");
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState(""); // string
  const [steps, setSteps] = useState(""); // string
  const [category, setCategory] = useState("");
  const [time, setTime] = useState("");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRecipeService(recipeId)
      .then((res) => {
        const recipe = res.data;

        setImg(recipe.img);
        setTitle(recipe.title);

        // Convertir arrays → string
        setIngredients(recipe.ingredients.join(", "));
        setSteps(recipe.steps.join(". "));

        setCategory(recipe.category);
        setTime(recipe.time);

        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [recipeId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedRecipe = {
      img,
      title,
      category,
      time,

      // Convertir string → array
      ingredients: ingredients
        .split(",")
        .map((i) => i.trim())
        .filter((i) => i !== ""),

      steps: steps
        .split(".")
        .map((s) => s.trim())
        .filter((s) => s !== "")
    };

    editRecipeService(recipeId, updatedRecipe)
      .then(() => navigate("/recipes"))
      .catch((err) => console.log(err));
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="edit-recipe">
      <h1>Edit Recipe</h1>

      <form onSubmit={handleSubmit}>

        <label>Image URL</label>
        <input
          type="text"
          value={img}
          onChange={(e) => setImg(e.target.value)}
        />

        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
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

        <label>Steps (separated by periods)</label>
        <textarea
          value={steps}
          onChange={(e) => setSteps(e.target.value)}
        />

        <button type="submit">Save Changes</button>
        <button type="button" onClick={() => navigate(-1)}>Back</button>

      </form>
    </div>
  );
}
