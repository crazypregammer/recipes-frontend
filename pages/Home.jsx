import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to RecipeHub</h1>
      <p className="home-subtitle">Create, share and explore delicious recipes</p>

      <div className="home-buttons">
        <Link to="/recipes">
          <button className="btn-primary">View Recipes</button>
        </Link>

        <Link to="/register">
          <button className="btn-secondary">Join Now</button>
        </Link>
      </div>
    </div>
  );
}
