// AdminPage.js
import React, { useState } from 'react';
import axios from 'axios';

const Admin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const token = localStorage.getItem('authTokenAdmin');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8080/auth/login-admin', {
        "email": email,
        "password": password
      });

      const token = response.data.data.token;
      console.log("Login Successful! Token:", token);
      localStorage.setItem("authTokenAdmin", token);
      setLoggedIn(true);
    } catch (error) {
      // handle error
      console.error('Login failed:', error);
    }
  };

  const handleStartRound = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }
    try {
      await axios.post('http://localhost:8080/admin/start-round', {}, config);
      // handle success
      console.log('Round started successfully');
    } catch (error) {
      // handle error
      console.error('Failed to start round:', error);
    }
  };

  const handleStartGame = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }
    try {
      await axios.post('http://localhost:8080/admin/start-game', {}, config);
      // handle success
      console.log('Game started successfully');
    } catch (error) {
      // handle error
      console.error('Failed to start game:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-gray-100 rounded-lg shadow-lg">
      {!loggedIn ? (
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full px-4 py-2 mb-4 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full px-4 py-2 mb-4 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none"
          />
          <button
            onClick={handleLogin}
            className="block w-full px-4 py-2 mt-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Login
          </button>
        </div>
      ) : (
        <div>
          <button
            onClick={handleStartRound}
            className="block w-full px-4 py-2 mt-2 text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600"
          >
            Start Round
          </button>
          <button
            onClick={handleStartGame}
            className="block w-full px-4 py-2 mt-2 text-white bg-yellow-500 rounded-md hover:bg-yellow-600 focus:outline-none focus:bg-yellow-600"
          >
            Start Game
          </button>
        </div>
      )}
    </div>
  );
};

export default Admin;
