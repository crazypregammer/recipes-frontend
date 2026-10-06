import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { getRecipeService, deleteRecipeService } from "../services/recipeService";
import { getCommentsByRecipe, addCommentService } from "../services/commentService";
import Comment from "../components/Comment";

export default function RecipeDetails() {
  const { recipeId } = useParams();
  const navigate = useNavigate();
  const { isLoggedIn, user } = useContext(AuthContext);

  const [recipe, setRecipe] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    getRecipeService(recipeId)
      .then((res) => {
        setRecipe(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));

    getCommentsByRecipe(recipeId)
      .then((res) => setComments(res.data))
      .catch((err) => console.log(err));
  }, [recipeId]);

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    addCommentService(recipeId, newComment)
      .then((res) => {
        setComments([...comments, res.data]);
        setNewComment("");
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = () => {
    const answer = confirm("Are you sure?");
    if (!answer) return;

    deleteRecipeService(recipeId)
      .then(() => navigate("/recipes"))
      .catch((err) => console.log(err));
  };

  if (loading) return <p>Loading...</p>;
  if (!recipe) return <p>Recipe not found</p>;

  return (
    <div className="details-container">

      <h2 className="details-title">{recipe.title}</h2>

      <img src={recipe.img} alt={recipe.title} className="details-image" />

      <div className="details-meta">
        <p><strong>Category:</strong> {recipe.category}</p>
        <p><strong>Time:</strong> {recipe.time}</p>
      </div>

      {recipe.creator && (
        <p className="details-creator">
          <strong>Creator:</strong> {recipe.creator.username}
        </p>
      )}

      <div className="section">
        <h3>Ingredients</h3>
        <ul className="ingredients-list">
          {recipe.ingredients.map((ing, i) => <li key={i}>{ing}</li>)}
        </ul>
      </div>

      <div className="section">
        <h3>Steps</h3>
        <ol className="steps-list">
          {recipe.steps.map((step, i) => <li key={i}>{step}</li>)}
        </ol>
      </div>

      {isLoggedIn && user && user._id === recipe.creator?._id && (
        <div className="actions">
          <Link to={`/recipes/${recipeId}/edit`}>
            <button className="btn-primary">Edit</button>
          </Link>

          <button className="btn-secondary" onClick={handleDelete}>Delete</button>
        </div>
      )}

      <hr className="divider" />

      <h2 className="comments-title">Comments</h2>

      {comments.length === 0 && <p>No comments yet.</p>}

      <div className="comments-container">
  {comments.map((comment) => (
    <Comment
      key={comment._id}
      comment={comment}
      onUpdated={(updated) =>
        setComments((prev) =>
          prev.map((c) => (c._id === updated._id ? updated : c))
        )
      }
      onDeleted={(id) =>
        setComments((prev) => prev.filter((c) => c._id !== id))
      }
    />
  ))}
</div>


      {isLoggedIn && (
        <div className="add-comment">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
          />
          <button className="btn-primary" onClick={handleAddComment}>Add Comment</button>
        </div>
      )}

    </div>
  );
}
