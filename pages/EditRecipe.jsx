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
  const [uploading, setUploading] = useState(false);

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

  // ⭐ SUBIR NUEVA IMAGEN
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
      setImg(data.imageUrl);
    } catch (err) {
      console.log(err);
      alert("Error uploading image");
    }

    setUploading(false);
  };

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

        <label>Title</label>
        <input
          type="text"
          value={title}
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
          onChange={(e) => setCategory(e.target.value)}
        />

        <label>Time</label>
        <input
          type="text"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />

        <label>Ingredients</label>
        <input
          type="text"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
        />

        <label>Steps</label>
        <textarea
          value={steps}
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
