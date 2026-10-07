import { useState } from "react";


export default function Carousel({ images }) {
  const [index, setIndex] = useState(0);

  const next = () => {
    setIndex((index + 1) % images.length);
  };

  const prev = () => {
    setIndex((index - 1 + images.length) % images.length);
  };

  return (
    <div className="carousel">
      <img src={images[index]} alt="slide" className="carousel-img" />

      <button className="carousel-btn left" onClick={prev}>❮</button>
      <button className="carousel-btn right" onClick={next}>❯</button>

      <div className="dots">
        {images.map((_, i) => (
          <span
            key={i}
            className={`dot ${i === index ? "active-dot" : ""}`}
            onClick={() => setIndex(i)}
          ></span>
        ))}
      </div>
    </div>
  );
}
