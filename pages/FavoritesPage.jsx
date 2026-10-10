import { getUserService } from "../services/userService";

export default function FavoritesPage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUserService(authUser._id).then(res => setUser(res.data));
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h1>My Favorites</h1>
      <div className="recipe-grid">
        {user.favorites.map(recipe => (
          <RecipeCard key={recipe._id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}
