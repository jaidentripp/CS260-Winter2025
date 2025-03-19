import React, { useState } from 'react';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [name, setName] = useState('');
  const [isLogin, setIsLogin] = useState(true);

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

    try {
      const userExists = await checkUserExists(email);
      if (!userExists) {
        setErrorMessage('No account found with this email. Please sign up first.');
        return;
      }

      console.log('Attempting login with:', { email, password });

      window.location.href = '/allRecipes';
    } catch (error) {
      setErrorMessage('An error occurred. Please try again.');
    }

    //setErrorMessage('');

    //console.log('Logging in with:', { email, password });

    //Redirect to allRecipes
    //window.location.href = '/allRecipes';
  };

  const handleCreateAccount = (event) => {
    event.preventDefault();

    if (!name || !email || !password) {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    if (!validateEmail(email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    try {
      registerUser(name, email, password);
      console.log('Account created successfully. Logging in...');

      window.location.href = '/allRecipes';
    } catch (error) {
      setErrorMessage('An error occurred while creating your account. Please try again.');
    }

    //setErrorMessage('');

    //console.log('Create account with:', { name, email, password });

    //console.log('Account created successfully. Logging in...');

    //window.location.href = '/allRecipes';
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const checkUserExists = async (email) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    return users.some(user => user.email === email);
  }

  const registerUser = (name, email, password) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    users.push({ name, email, password });
    localStorage.setItem('users', JSON.stringify(users));
  };

  return (
    <main className="container-fluid bg-light text-center">
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
    </main>
  );
}