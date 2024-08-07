import React, { useState } from 'react';
import './App.css';
import Authenticate from './components/Authenticate';
import SignUpForm from './components/SignUpForm';

export default function App() {
  const [token, setToken] = useState(null);
  return (
    <>
    <h1>Authentication App</h1>
    <SignUpForm setToken={setToken}/>
      <Authenticate token={token} />
    </>
  );
}