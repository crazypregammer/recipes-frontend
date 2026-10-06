export default function Comment({ comment }) {
  return (
    <div className="comment">
      <p><strong>{comment.author.username}</strong></p>
      <p>{comment.text}</p>
      <small>{new Date(comment.createdAt).toLocaleString()}</small>
    </div>
  );
}
