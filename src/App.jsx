import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from '../pages/Home'
import Navbar from '../components/Navbar'
import Recipes from '../pages/Recipes'
import Register from '../pages/Register'
import Login from '../pages/Login'
import RecipeDetail from '../pages/RecipeDetail'
import EditRecipe from '../pages/EditRecipe'
import CreateRecipe from '../pages/CreateRecipe'

export default function App() {
    return(
        <div>
            <Navbar />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/recipes' element={<Recipes />} />
                <Route path='/recipes/:recipeId' element={<RecipeDetail />} />
                <Route path='/recipes/:recipeId/edit' element={<EditRecipe />} />
                <Route path='/recipes/create' element={<CreateRecipe />} />
            </Routes>
        </div>
    )
}
