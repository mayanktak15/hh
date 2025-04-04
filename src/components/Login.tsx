import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getIntendedUrl } from '../utils/auth';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Perform login logic here
      const loginSuccess = true; // Replace with actual login success condition
      if (loginSuccess) {
        handleLoginSuccess();
      }
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  const handleLoginSuccess = () => {
    const intendedUrl = getIntendedUrl();
    navigate(intendedUrl || '/dashboard');
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;