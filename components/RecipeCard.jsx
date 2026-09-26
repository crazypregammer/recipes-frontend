export default function RecipeCard({ recipe }) {
    return(
        <div>
            <h2>{recipe.title}</h2>
            <img src={recipe.img} alt="" />
        </div>
    )
}