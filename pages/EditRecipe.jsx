import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getRecipeService, editRecipeService } from "../services/recipeService";


export default function EditRecipe() {
  const { recipeId } = useParams();
  const navigate = useNavigate();

  const [img, setImg] = useState("");
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const [category, setCategory] = useState("");
  const [time, setTime] = useState("");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRecipeService(recipeId)
      .then((res) => {
        const recipe = res.data;

        setImg(recipe.img);
        setTitle(recipe.title);
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
      ingredients: ingredients.split(",").map((i) => i.trim()).filter((i) => i !== ""),
      steps: steps.split(".").map((s) => s.trim()).filter((s) => s !== "")
    };

    editRecipeService(recipeId, updatedRecipe)
      .then(() => navigate(`/recipes`))
      .catch((err) => console.log(err));
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="edit-container">
      <h1 className="title">Edit Recipe</h1>

      <form className="form" onSubmit={handleSubmit}>

        <label>Image URL</label>
        <input
          type="text"
          value={img}
          placeholder="https://example.com/image.jpg"
          onChange={(e) => setImg(e.target.value)}
        />

        <label>Title</label>
        <input
          type="text"
          value={title}
          placeholder="Chocolate Cake..."
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Category</label>
        <input
          type="text"
          value={category}
          placeholder="Dessert, Italian..."
          onChange={(e) => setCategory(e.target.value)}
        />

        <label>Time</label>
        <input
          type="text"
          value={time}
          placeholder="30 min"
          onChange={(e) => setTime(e.target.value)}
        />

        <label>Ingredients (comma separated)</label>
        <input
          type="text"
          value={ingredients}
          placeholder="Flour, Eggs, Sugar..."
          onChange={(e) => setIngredients(e.target.value)}
        />

        <label>Steps (separated by periods)</label>
        <textarea
          value={steps}
          placeholder="Mix ingredients. Bake for 20 minutes..."
          onChange={(e) => setSteps(e.target.value)}
        />

        <div className="buttons">
          <button type="submit" className="btn-primary">Save Changes</button>
          <button type="button" className="btn-secondary" onClick={() => navigate(-1)}>Back</button>
        </div>

      </form>
    </div>
  );
}
