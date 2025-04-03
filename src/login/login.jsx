import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [name, setName] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //export function Login({ setUserName }) {

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    //Basic validation
    if (!email || !password) {
      setErrorMessage('Please fill in both fields.');
      return;
    }

    if (!validateEmail(email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    //  try {
    //    const response = await fetch ('http://localhost:3000/login', {
    //      method: 'POST',
    //      headers: { 'Content-Type': 'application/json' },
    //      body: JSON.stringify({ email, password }),
    //    });

    //    if (!response.ok) {
    //     const errorData = await response.json();
    //     console.error('Error response:', errorData); // Log backend error
    //     setErrorMessage(errorData.message || 'Login failed');
    //     return;
    //    }

    //     const data = await response.json();

    //     //if (response.ok) {
    //       console.log('Login successful:', data);
    //       setIsLoggedIn(true);
    //       navigate('/allRecipes'); // Redirect to recipes page
    //     // } else {
    //     //   setErrorMessage(data.message || 'Login failed');
    //     // }
    //   } catch (error) {
    //     console.error('Error during login:', error);
    //     setErrorMessage('An error occurred. Please try again.');
    //   }

    //   if (response.ok) {
    //     const user = await response.json();
    //     console.log('Login successful:', user);

    //     // Redirect to allRecipes
    //     window.location.href = '/allRecipes';
    //   } else if (response.status === 401) {
    //     setErrorMessage('Invalid email or password.');
    //   } else {
    //     setErrorMessage('An error occurred. Please try again.');
    //   }
    // } catch (error) {
    //   console.error('Error during login:', error);
    //   setErrorMessage('Failed to connect to server. Please check your network connection');
    // }

    //works
    try {
      const userExists = await checkUserExists(email);
      if (!userExists) {
        setErrorMessage('No account found with this email. Please sign up first.');
        return;
      }

      //const users = JSON.parse(localStorage.getItem('users') || '[]');

      //const user = users.find(u => u.email === email);
      //if (user?.name) {
        //setUserName(user.name.split(' ')[0]);
      //} else {
        //throw new Error('User data incomplete');
      //}

      //works

      console.log('Attempting login with:', { email, password });
      setIsLoggedIn(true);

       //window.location.href = '/allRecipes';
     } catch (error) {
       setErrorMessage('An error occurred. Please try again.');
     }
  

    //setErrorMessage('');

    //console.log('Logging in with:', { email, password });

    //Redirect to allRecipes
    //window.location.href = '/allRecipes';
  };

  const handleCreateAccount = async (event) => {
    event.preventDefault();

    if (!name || !email || !password) {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    if (!validateEmail(email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    // try {
    //   const response = await fetch('http://localhost:3000/register', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ username: name, email, password }),
    //   });

    //   const data = await response.json();

    //   if (response.ok) {
    //     console.log('Account created successfully:', data);
    //     setIsLoggedIn(true);
    //     navigate('/allRecipes'); // Redirect to recipes page
    //   } else {
    //     setErrorMessage(data.message || 'Registration failed');
    //   }
    // } catch (error) {
    //   console.error('Error during registration:', error);
    //   setErrorMessage('An error occurred. Please try again.');
    // }

    //works
    try {
      registerUser(name, email, password);
      console.log('Account created successfully. Logging in...');

      //setUserName(name.split(' ')[0]);
      // const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
      // if (existingUsers.some(u => u.email === email)) {
      //   throw new Error('Email already registered.');
      // }

      // registerUser(name, email, password);

      //Store user data with name
      //const newUser = { name, email, password };
      //localStorage.setItem('users', JSON.stringify([...existingUsers, newUser]));

      // if (name?.trim()) {
      //   setUserName(name.split(' ')[0].trim());
      // }

      // console.log('Account created successfully. Logging in...');

      //works
      setIsLoggedIn(true);
      //navigate('/allRecipes');
      //window.location.href = '/allRecipes';
      //works
    } catch (error) {
      setErrorMessage('An error occurred while creating your account. Please try again.');
    }

    //setErrorMessage('');

    //console.log('Create account with:', { name, email, password });

    //console.log('Account created successfully. Logging in...');

    //window.location.href = '/allRecipes';
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setEmail('');
    setPassword('');
    setName('');
    setErrorMessage('')

    navigate('/');
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const checkUserExists = async (email) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    return users.some(user => user.email === email);
  };

  const registerUser = (name, email, password) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    users.push({ name, email, password });
    localStorage.setItem('users', JSON.stringify(users));
  };

  // if (isLoggedIn) {
  //   return (
  //     <main className="container-fluid bg-light text-center">
  //       <h1>Welcome Back!</h1>
  //       <button className="btn btn-primary" onClick={() => window.location.href = '/allRecipes'}>
  //         Go to All Recipes
  //       </button>
  //       <button className="btn btn-secondary" onClick={handleLogout}>
  //         Logout
  //       </button>
  //     </main>
  //   );
  // }

  return (
    <main className="container-fluid bg-light text-center">
        {isLoggedIn ? (
        <div>
          <h1>Welcome Back!</h1>
          <button className="btn btn-primary" onClick={() => navigate('/allRecipes')}>
            Go to All Recipes
          </button>
          <button className="btn btn-secondary" onClick={handleLogout}>
            Logout
          </button>
        </div>
        ) : (
        <div>
        <h1>Welcome to Simple Supper</h1>
        {isLogin ? (
        <form onSubmit={handleSubmit}>
          {/* Email input */}
          <div className="input-group mb-3">
            <span className="input-group-text">@</span>
            <input 
            className="form-control" 
            type="text" 
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)} />
          </div>
          {/* Password input */}
          <div className="input-group mb-3">
            <span className="input-group-text">🔒</span>
            <input 
            className="form-control" 
            type="password" 
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} />
          </div>
          {/* Error Message */}
          {errorMessage && (
            <div className="alert alert-danger" role="alert">
              {errorMessage}
            </div>
          )}
          {/* Login button */}
          <button type="submit" className="btn btn-primary">Login</button>
          {/* Create Account button */}
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setIsLogin(false)}
          >
            Create Account
          </button>
        </form>
        ) : ( 
          <form onSubmit={handleCreateAccount}>
            <div className="input-group mb-3">
              <span className="input-group-text">👤</span>
              <input
                className="form-control"
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text">@</span>
              <input 
                className="form-control" 
                type="text" 
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text">🔒</span>
              <input 
                className="form-control" 
                type="password" 
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {errorMessage && (
              <div className="alert alert-danger" role="alert">
                {errorMessage}
              </div>
            )}
            <button type="submit" className="btn btn-primary">Sign Up</button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setIsLogin(true)}
            >
              Back to Login
            </button>
          </form>
        )}
      </div>
        )}
    </main>
  );
}