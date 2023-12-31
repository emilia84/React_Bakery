import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/loginHandle'; // Make sure this path is correct

const NotAdmin = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent the form from causing a page reload
    try {
      const response = await login(username, password);
      if (response.success) {
        console.log('Login successful!');
        setIsLoggedIn(true);
        navigate('/admin'); // Redirect to the admin page
      } else {
        console.log('Login failed:', response.message);
        // Handle the login failure case
      }
    } catch (error) {
      console.error('Login error:', error);
      // Handle the error case
    }
  };

  return (
    <div id="wrapperForm1">
      <h1>Login to Admin</h1>
      <form onSubmit={handleLogin}> {/* Add an onSubmit event handler */}
        <input
          id="username"
          type="text"
          placeholder="Username"
          value={username}
          pattern="^(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\\.)+[a-zA-Z]{2,6}$"
          required
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          id="password"
          type="password"
          placeholder="Password"
          value={password}
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}" 
          title="Password must contain at least one number, one uppercase letter, one lowercase letter, one special character, and be at least 8 characters long"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="resetitem" id="loginButton">Login</button>
      </form>
    </div>
  );
};

export default NotAdmin;
