import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Comment from "../components/Comment";
import {
  getRecipeService,
  deleteRecipeService
} from "../services/recipeService";

export default function RecipeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRecipeService(id)
      .then((res) => {
        setRecipe(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleDelete = () => {
    deleteRecipeService(id)
      .then(() => navigate("/recipes"))
      .catch((err) => console.log(err));
  };

  if (loading) return <p>Loading...</p>;
  if (!recipe) return <p>Recipe not found</p>;

  return (
    <div className="recipe-details">

      <h1>{recipe.title}</h1>
      <p>{recipe.description}</p>

      <h3>Ingredients</h3>
      <ul>
        {recipe.ingredients?.map((ing, index) => (
          <li key={index}>{ing}</li>
        ))}
      </ul>

      <h3>Instructions</h3>
      <p>{recipe.instructions}</p>

      {isLoggedIn && (
        <div className="actions">
          <Link to={`/recipes/${id}/edit`}>
            <button>Edit</button>
          </Link>

          <button onClick={handleDelete}>Delete</button>
        </div>
      )}

      <hr />

      <h2>Comments</h2>

      {recipe.comments?.length === 0 && <p>No comments yet.</p>}

      {recipe.comments?.map((comment) => (
        <Comment key={comment._id} comment={comment} />
      ))}

    </div>
  );
}
