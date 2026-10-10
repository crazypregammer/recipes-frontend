import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import RecipeCard from "../components/RecipeCard";
import { AuthContext } from "../context/AuthContext";
import { deleteRecipeService, getRecipesService } from "../services/recipeService";
import SearchBar from "../components/SearchBar";

export default function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const { isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    getRecipesService()
      .then((res) => setRecipes(res.data))
      .catch((error) => console.log(error));
  }, []);

  const handleDelete = (id) => {
    const answer = confirm("Are you sure you want to delete this recipe?");
    if (answer) {
      deleteRecipeService(id)
        .then(() => {
          setRecipes((prev) => prev.filter((r) => r._id !== id));
        })
        .catch(() => alert("Error deleting recipe"));
    }
  };

  return (
    <div className="recipes-page">
      <h1 className="recipes-title">Recipes</h1>
    <SearchBar setRecipes={setRecipes} />
      <div className="recipes-grid">
        {recipes.map((recipe) => (
          <div key={recipe._id} className="recipe-card-wrapper">

            <Link to={`/recipes/${recipe._id}`} className="recipe-link">
              <RecipeCard recipe={recipe} />
            </Link>

            {isLoggedIn && (
              <div className="card-actions">
                <Link to={`/recipes/${recipe._id}/edit`}>
                  <button className="btn-primary">Edit</button>
                </Link>

                <button className="btn-secondary" onClick={() => handleDelete(recipe._id)}>
                  Delete
                </button>
              </div>
            )}

          </div>
        ))}
      </div>
    </div>
  );
}
