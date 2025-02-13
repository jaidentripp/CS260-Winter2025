import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { AllRecipes } from './allRecipes/allRecipes';
import { RecipesForYou } from './recipesForYou/recipesForYou';
import { About } from './about/about';

export default function App() {
  return (
    <BrowserRouter>
        <div className="body bg-dark text-light">
            <header id = "header" className="container-fluid">
                <nav id = "nav-bar" className= "navbar fixed-top">
                <div className="navbar-brand" href="#">Simple Supper<sup>&reg;</sup></div>
                    <menu className="navbar-nav">
                        <li className="nav-item">
                            <NavLink className="nav-link active" to="index">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link active" to="recipesForYou">Recipes for You</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link active" to="allRecipes">All Recipes</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link active" to="about">About</NavLink>
                        </li>
                    </menu>
                </nav>
            </header>

            <Routes>
                <Route path='/' element={<Login />} exact />
                <Route path='/allRecipes' element={<AllRecipes />} />
                <Route path='/recipesForYou' element={<RecipesForYou />} />
                <Route path='/about' element={<About />} />
                <Route path='*' element={<NotFound />} />
            </Routes>

            <footer className="bg-dark text-white-50">
                <div className="container-fluid">
                    <span className="text-reset">Jaiden Tripp</span>
                    <NavLink className="text-reset" href="https://github.com/jaidentripp/CS260StartupProject">GitHub</NavLink>
                </div>
            </footer>
        </div>
    </BrowserRouter>
  )
}

function NotFound() {
    return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
  }
