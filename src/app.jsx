import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { AllRecipes } from './allRecipes/allRecipes';
import { RecipesForYou } from './recipesForYou/recipesForYou';
import { About } from './about/about';
import { AuthState } from './login/authState';
import { useState } from 'react';

export default function App() {
    // const [userName, setUserName] = useState('');
    // const currentAuthState = userName ? AuthState.Authenticated : AuthState.Unauthenticated;
    // const [authState, setAuthState] = React.useState(currentAuthState);

    const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');
  const currentAuthState = userName ? AuthState.Authenticated : AuthState.Unauthenticated;
  const [authState, setAuthState] = React.useState(currentAuthState);

  return (
    <BrowserRouter>
        <div className='body bg-dark text-light'>
        <header className='container-fluid'>
          <nav id = "nav-bar" className= "navbar fixed-top">
            <div className='navbar-brand'>
              Simple Supper<sup>&reg;</sup>
            </div>
            <menu className='navbar-nav'>
              <li className='nav-item'>
                <NavLink className='nav-link' to=''>
                  Login
                </NavLink>
              </li>
              {authState === AuthState.Authenticated && (
                <li className='nav-item'>
                  <NavLink className='nav-link' to='recipesForYou'>
                    Recipes For You
                  </NavLink>
                </li>
              )}
              {authState === AuthState.Authenticated && (
                <li className='nav-item'>
                  <NavLink className='nav-link' to='allRecipes'>
                    All Recipes
                  </NavLink>
                </li>
              )}
              <li className='nav-item'>
                <NavLink className='nav-link' to='about'>
                  About
                </NavLink>
              </li>
            </menu>
          </nav>
        </header>

            
            <Routes>
                <Route
                    path='/'
                    element={
                    <Login
                        userName={userName}
                        authState={authState}
                        onAuthChange={(userName, authState) => {
                        setAuthState(authState);
                        setUserName(userName);
                        }}
                    />
                    }
                    exact
                />
                <Route path='/' element={<Login />} exact />
                <Route path='/allRecipes' element={<AllRecipes />} />
                <Route path='/recipesForYou' element={<RecipesForYou />} />
                <Route path='/about' element={<About />} />
                <Route path='*' element={<NotFound />} />
            </Routes>
            
            <footer className="footer-custom">
                <div className="container-fluid">
                    <span className="text-reset">Jaiden Tripp</span>
                    <a className="text-reset" href="https://github.com/jaidentripp/CS260-Winter2025">GitHub</a>
                </div>
            </footer>
        </div>
    </BrowserRouter>
  )
}

function NotFound() {
    return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
  }


//   <div className="body bg-dark text-light">
//             <header id = "header" className="container-fluid">
//                 <nav id = "nav-bar" className= "navbar fixed-top">
//                 <div className="navbar-brand">Simple Supper<sup>&reg;</sup></div>
//                 {/* Display user's name */}
//                 {userName && <span className="text-light">Welcome {userName}!</span>} 
//                     <menu className="navbar-nav">
//                         <li className="nav-item">
//                             <NavLink className="nav-link active" to="/">Home</NavLink>
//                         </li>
//                         <li className="nav-item">
//                             <NavLink className="nav-link active" to="recipesForYou">Recipes for You</NavLink>
//                         </li>
//                         <li className="nav-item">
//                             <NavLink className="nav-link active" to="allRecipes">All Recipes</NavLink>
//                         </li>
//                         <li className="nav-item">
//                             <NavLink className="nav-link active" to="about">About</NavLink>
//                         </li>
//                     </menu>
//                 </nav>
//             </header> 