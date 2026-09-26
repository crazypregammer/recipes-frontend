import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function CreateRecipe() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [img, setImg] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const storedToken = localStorage.getItem("authToken");

    axios.post(
      "http://localhost:5005/api/recipes",
      {
        title,
        img,
        ingredients: ingredients.split(",").map((i) => i.trim()),
        steps: steps.split(".").map((s) => s.trim()).filter((s) => s !== "")
      },
      {
        headers: {
          Authorization: `Bearer ${storedToken}`
        }
      }
    )
    .then((response) => {
      console.log("Recipe created:", response.data);
      navigate("/recipes");
    })
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
