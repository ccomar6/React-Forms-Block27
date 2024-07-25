import React, { useState } from 'react';

export default function SignUpForm({ setToken }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [validationMessage, setValidationMessage] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();

    // Form validation
    if (username.length < 8) {
        setValidationMessage('Username must be at least 8 characters long.');
        return;
      } else {
        setValidationMessage('');
      }

    try {
        const response = await fetch('https://fsa-jwt-practice.herokuapp.com/signup', {
            method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      setToken(result.token);
      console.log('Success:', result);
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <>
      <h2>Sign Up</h2>
      {error && <p className="error">{error}</p>}
      {validationMessage && <p className="error">{validationMessage}</p>}     
       <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type='text'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type='submit'>Submit</button>
      </form>
    </>
  );
}
