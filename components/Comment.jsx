export default function Comment({ comment }) {
  return (
    <div className="comment">
      <p><strong>{comment.author}</strong></p>
      <p>{comment.text}</p>
    </div>
  );
}
