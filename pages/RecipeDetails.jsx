import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { getRecipeService, deleteRecipeService } from "../services/recipeService";
import Comment from "../components/Comment";

export default function RecipeDetails() {
  const { recipeId } = useParams();
  const navigate = useNavigate();
  const { isLoggedIn, user } = useContext(AuthContext);

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    addCommentService(recipeId, newComment)
      .then((res) => {
        setRecipe(res.data); // actualiza la receta con el nuevo comentario
        setNewComment("");
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getRecipeService(recipeId)
      .then((res) => {
        setRecipe(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [recipeId]);

  const handleDelete = () => {
    const answer = confirm("Are you sure you want to delete this recipe?");
    if (!answer) return;

    deleteRecipeService(recipeId)
      .then(() => navigate("/recipes"))
      .catch((err) => console.log(err));
  };

  if (loading) return <p>Loading...</p>;
  if (!recipe) return <p>Recipe not found</p>;

  return (
    <div className="recipe-details">

      <h2>{recipe.title}</h2>
      {/* Imagen */}
      <img
        src={recipe.img}
        alt={recipe.title}
        className="recipe-image"
      />

      {/* Título */}

      {/* Categoría y tiempo */}
      <div className="recipe-meta">
        <p><strong>Category:</strong> {recipe.category}</p>
        <p><strong>Time:</strong> {recipe.time}</p>
      </div>

      {/* Autor */}
      {recipe.creator && (
        <p>
          <strong>Creator:</strong>{" "}
          {recipe.creator.username || recipe.creator.email || "Unknown"}
        </p>
      )}

      {/* Fecha */}

      {/* Ingredientes */}
      <h3>Ingredients</h3>
      <ul className="ingredients-list">
        {recipe.ingredients.map((ing, index) => (
          <li key={index}>{ing}</li>
        ))}
      </ul>

      {/* Pasos */}
      <h3>Steps</h3>
      <ol className="steps-list">
        {recipe.steps.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>

      {/* Acciones (solo si está logueado y es el creador) */}
      {isLoggedIn && user && user._id === recipe.creator?._id && (
        <div className="actions">
          <Link to={`/recipes/${recipeId}/edit`}>
            <button>Edit</button>
          </Link>
          <div className="add-comment">
    <textarea
      value={newComment}
      onChange={(e) => setNewComment(e.target.value)}
      placeholder="Write a comment..."
    />

    <button onClick={handleAddComment}>Add Comment</button>
  </div>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}

      <hr />

      {/* Comentarios */}
      <h2>Comments</h2>

      {recipe.comments?.length === 0 && <p>No comments yet.</p>}

      <div className="comments-container">
        {recipe.comments?.map((comment) => (
          <Comment key={comment._id} comment={comment} />
        ))}
      </div>

    </div>
  );
}
