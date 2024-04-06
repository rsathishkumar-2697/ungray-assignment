import React, { useState } from 'react';
import './Auth.css'

const Auth = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username === 'trial' && password === 'assignment123') {
        localStorage.setItem('isLoggedIn', true);
      onLogin();
    } else {
      alert('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className='container'>
      <h1>Login Page</h1>
      <input className='input'
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input className='input'
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="button" onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Auth;
