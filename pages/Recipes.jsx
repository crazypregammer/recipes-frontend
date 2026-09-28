import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import RecipeCard from "../components/RecipeCard";
import { AuthContext } from "../context/AuthContext";
import { deleteRecipeService, getRecipesService } from "../services/recipeService";

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
    <div className="recipes-container">
      {recipes.map((recipe) => (
        <div key={recipe._id} className="recipe-item">

          <Link to={`/recipes/${recipe._id}`}>
            <RecipeCard recipe={recipe} />
          </Link>

          {isLoggedIn && (
            <div className="actions">
              <Link to={`/recipes/${recipe._id}/edit`}>
                <button>Edit</button>
              </Link>

              <button onClick={() => handleDelete(recipe._id)}>
                Delete
              </button>
            </div>
          )}

        </div>
      ))}
    </div>
  );
}
