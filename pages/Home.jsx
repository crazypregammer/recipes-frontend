import { Link } from "react-router-dom";
import Carousel from "../components/Carousel";

export default function Home() {
  const images = [
    "https://images.unsplash.com/photo-1499636136210-6f4ee915583e",
    "https://upload.wikimedia.org/wikipedia/commons/2/28/Tortilla_de_patatas_en_un_plato.jpg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=original",
    "https://upload.wikimedia.org/wikipedia/commons/c/c0/Gazpacho_Cazuela_Barro.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original"
  ];

  return (
    <div className="home">
      <h1>Welcome to RecipeHub 🌿</h1>
      <Carousel images={images} />
      <p>
        Natural, fresh and homemade recipes.
      </p>
      <Link to="/recipes">See recipes</Link>
    </div>
  );
}
