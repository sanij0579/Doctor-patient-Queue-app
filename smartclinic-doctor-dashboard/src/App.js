import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Login from './Login';
import Dashboard from './Dashboard';

const BASE_URL = 'http://localhost:8000/api'; // 🛠️ Change as needed

function App() {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (!savedToken) {
      setLoading(false);
      return;
    }

    axios
      .get(`${BASE_URL}/verify-token/`, {
        headers: { Authorization: `Bearer ${savedToken}` },
      })
      .then(() => setToken(savedToken))
      .catch(() => localStorage.removeItem('token'))
      .finally(() => setLoading(false));
  }, []);

  const handleLogin = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  if (loading) return <p>🔄 Loading...</p>;

  return token ? (
    <Dashboard token={token} onLogout={handleLogout} />
  ) : (
    <Login onLogin={handleLogin} />
  );
}

export default App;