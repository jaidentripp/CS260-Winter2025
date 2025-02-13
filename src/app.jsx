import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
  return (
    <div className="body bg-dark text-light">
        <header id = "header" className="container-fluid">
            <nav id = "nav-bar" className= "navbar fixed-top">
            <a className="navbar-brand" href="#">Simple Supper<sup>&reg;</sup></a>
                <menu className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link active" href="index.html">Home</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link active" href="recipesForYou.html">Recipes for You</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link active" href="allRecipes.html">All Recipes</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link active" href="about.html">About</a>
                    </li>
                </menu>
            </nav>
        </header>

        <main className="container-fluid bg-light text-center">App components go here</main>

        <footer className="bg-dark text-white-50">
            <div className="container-fluid">
                <span className="text-reset">Jaiden Tripp</span>
                <a className="text-reset" href="https://github.com/jaidentripp/CS260StartupProject">GitHub</a>
            </div>
        </footer>
    </div>
  )
}
