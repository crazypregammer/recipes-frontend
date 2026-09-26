import axios from "axios"
import { useState, useEffect, useContext } from "react"
import { Link, useNavigate, useParams } from "react-router-dom";
import RecipeCard from "../components/RecipeCard";
import { AuthContext } from "../context/AuthContext";

export default function Recipes() {
    const [recipes, setRecipes] = useState([]);
    const { isLoggedIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const { recipeId } = useParams();
    useEffect(() => {
        axios.get("http://localhost:5005/api/recipes")
        .then((res) => {
            setRecipes(res.data);
        })
        .catch((error) => {
            console.log(error);
        });
    }, []);
    const handleDelete = (e) => {
        e.preventDefault();
        axios.delete(`http://localhots:5005/api/recipes/${recipeId}`)
        .then(())
    }
    return (
        <div className="recipes-container">
        {recipes.map((recipe) => (
            <div key={recipe._id} className="recipe-item">
            
            <Link to={`/recipes/${recipe._id}`}>
                <RecipeCard recipe={recipe} />
            </Link>

            {isLoggedIn && (
                <div className="actions">
                    <button onClick={() => navigate(`/recipes/${recipe._id}/edit`)}>Edit</button>
                    <button onClick={handleDelete}>Delete</button>
                </div>
            )}

            </div>
        ))}
        </div>
    );
}
