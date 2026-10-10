import { Route, Routes } from 'react-router-dom'
import './App.css'
import Footer from '../components/Footer'
import Home from '../pages/Home'
import Navbar from '../components/Navbar'
import Recipes from '../pages/Recipes'
import Register from '../pages/Register'
import Login from '../pages/Login'
import RecipeDetailS from '../pages/RecipeDetails'
import EditRecipe from '../pages/EditRecipe'
import CreateRecipe from '../pages/CreateRecipe'
import FavoritesPage from '../pages/FavoritesPage'

export default function App() {
    return(
        <div className='page'>
            <Navbar />
            <main className='content'>
                <Routes>
                    <Route path='/favorites' element={<FavoritesPage />} />
                    <Route path='/' element={<Home />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/recipes' element={<Recipes />} />
                    <Route path='/recipes/:recipeId' element={<RecipeDetailS />} />
                    <Route path='/recipes/:recipeId/edit' element={<EditRecipe />} />
                    <Route path='/recipes/create' element={<CreateRecipe />} />
                </Routes>
            </main>
            <Footer />
        </div>
    )
}
