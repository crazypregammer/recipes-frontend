import { useState } from "react";
import { searchRecipesService } from "../services/recipeService";

export default function SearchBar({ setRecipes }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");

  const handleSearch = (q, c) => {
    searchRecipesService({ query: q, category: c })
      .then(res => setRecipes(res.data))
      .catch(err => console.log(err));
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search by title or ingredient"
        value={query}
        onChange={(e) => {
          const value = e.target.value;
          setQuery(value);
          handleSearch(value, category);   // ⭐ búsqueda automática
        }}
      />

      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => {
          const value = e.target.value;
          setCategory(value);
          handleSearch(query, value);      // ⭐ búsqueda automática
        }}
      />
    </div>
  );
}
