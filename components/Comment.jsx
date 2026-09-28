export default function Comment({ comment }) {
  return (
    <div className="comment">
      <p><strong>{comment.author?.username || "Unknown"}</strong></p>
      <p>{comment.text}</p>
    </div>
  );
}
