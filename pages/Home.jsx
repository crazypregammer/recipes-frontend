import Carousel from "../components/Carousel";

export default function Home() {
  const images = [
    "https://images.unsplash.com/photo-1499636136210-6f4ee915583e",
    "https://images.unsplash.com/photo-1521302080391-cb1c5c0c6b0d",
    "https://images.unsplash.com/photo-1505253716362-afaea1f6a6f2"
  ];

  return (
    <div>
      <Carousel images={images} />

      <h1>Bienvenida a RecipeHub 🌿</h1>
      <p style={{ textAlign: "center" }}>
        Recetas naturales, frescas y hechas con cariño.
      </p>
    </div>
  );
}
