import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  editCommentService,
  deleteCommentService
} from "../services/commentService";

export default function Comment({ comment, onUpdated, onDeleted }) {
  const { user } = useContext(AuthContext);

  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(comment.text);
  const isAuthor = user && comment.author && user._id === comment.author._id;

  const handleSave = () => {
    if (!text.trim()) return;

    editCommentService(comment._id, text)
      .then((res) => {
        onUpdated && onUpdated(res.data.comment || res.data);
        setIsEditing(false);
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = () => {
    const answer = confirm("Delete this comment?");
    if (!answer) return;

    deleteCommentService(comment._id)
      .then(() => {
        onDeleted && onDeleted(comment._id);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="comment-card">
      <p className="comment-author">
        {comment.author?.username || "Unknown"}
      </p>

      {isEditing ? (
        <>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div className="comment-actions">
            <button className="btn-primary" onClick={handleSave}>
              Save
            </button>
            <button className="btn-secondary" onClick={() => {
              setText(comment.text);
              setIsEditing(false);
            }}>
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <p className="comment-text">{comment.text}</p>

          {isAuthor && (
            <div className="comment-actions">
              <button
                className="btn-primary"
                onClick={() => setIsEditing(true)}
              >
                Edit
              </button>
              <button
                className="btn-secondary"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
