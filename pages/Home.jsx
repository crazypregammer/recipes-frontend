import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="home-container">

      <section className="hero">
        <h1 className="hero-title">Master Your Recipes</h1>
        <p className="hero-subtitle">
          Strong flavors. Bold dishes. Real cooking.
        </p>

        <Link to="/recipes" className="hero-button">
          View Recipes
        </Link>
      </section>

      <section className="features">
        <div className="feature-card">
          <h3>🔥 Powerful Flavors</h3>
          <p>Recipes with character, intensity and attitude.</p>
        </div>

        <div className="feature-card">
          <h3>🔪 Pro-Level Tools</h3>
          <p>Sharpen your skills and cook like a chef.</p>
        </div>

        <div className="feature-card">
          <h3>💪 Build Your Collection</h3>
          <p>Save, edit and manage your own recipes.</p>
        </div>
      </section>

    </div>
  );
}
