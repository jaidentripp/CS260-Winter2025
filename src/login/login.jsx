import React, { useState } from 'react';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (event) => {
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

    setErrorMessage('');

    console.log('Logging in with:', { email, password });

    //Redirect to allRecipes
    window.location.href = '/allRecipes';
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <main className="container-fluid bg-light text-center">
      <div>
        <h1>Welcome to Simple Supper</h1>
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
            <div> className="alert alert-danger" role="alert"
              {errorMessage}
            </div>
          )}
          <button type="submit" className="btn btn-primary">Login</button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => console.log('Redirecting to account creation...')}
          >
            Create Account
          </button>
        </form>
      </div>
    </main>
  );
}