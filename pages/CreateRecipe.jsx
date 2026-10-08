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
  const [uploading, setUploading] = useState(false);

  // ⭐ SUBIR IMAGEN A CLOUDINARY
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("imageUrl", file);

    setUploading(true);

    try {
      const res = await fetch("http://localhost:5005/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setImg(data.imageUrl); // ← URL de Cloudinary
    } catch (err) {
      console.log(err);
      alert("Error uploading image");
    }

    setUploading(false);
  };

  // ⭐ ENVIAR FORMULARIO
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
    <div className="create-container">
      <h1 className="title">Create Recipe</h1>

      <form className="form" onSubmit={handleSubmit}>

        <label>Title</label>
        <input
          type="text"
          value={title}
          placeholder="Chocolate Cake..."
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Image</label>
        <input type="file" name="imageUrl" onChange={handleImageUpload} />
        {uploading && <p>Uploading image...</p>}
        {img && <img src={img} alt="preview" width="150" />}

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

        <label>Steps (separate with periods)</label>
        <textarea
          value={steps}
          placeholder="Mix ingredients. Bake for 20 minutes..."
          onChange={(e) => setSteps(e.target.value)}
        />

        <div className="buttons">
          <button type="submit" className="btn-primary">Create</button>
          <button type="button" className="btn-secondary" onClick={() => navigate(-1)}>Back</button>
        </div>

      </form>
    </div>
  );
}



