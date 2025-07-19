import React, { useState } from 'react';
import axios from 'axios';
import doctorBg from './assets/main.png'; // ✅ Your local image

const BASE_URL = 'http://10.47.92.81:8000/api';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${BASE_URL}/token/`, { email, password });
      const token = res.data.access;
      localStorage.setItem('token', token);
      onLogin(token);
    } catch (err) {
      console.error("Login Error:", err.response?.data || err.message);
      alert('❌ Login failed. Please check credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.wrapper}>
      {/* Centered Login Card */}
      <div style={styles.card}>
        <h2 style={styles.title}>👨‍⚕️ Doctor Login</h2>

        <label style={styles.label}>Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={styles.input}
        />

        <label style={styles.label}>Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={styles.input}
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          style={styles.button}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    position: 'relative',
    height: '100vh',
    width: '100vw',
    backgroundImage: `url(${doctorBg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'sans-serif',
  },
  card: {
    zIndex: 2,
    width: '90%',
    maxWidth: '400px',
    backgroundColor: 'rgba(255, 255, 255, 0.95)', // ✅ No glass, solid readable card
    padding: '40px',
    borderRadius: '20px',
    boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
    color: '#333',
  },
  title: {
    textAlign: 'center',
    fontSize: '24px',
    marginBottom: '24px',
    color: '#007BFF',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: '8px',
    display: 'block',
    color: '#555',
  },
  input: {
    width: '100%',
    padding: '12px',
    marginBottom: '16px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    fontSize: '14px',
    backgroundColor: '#fff',
  },
  button: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '25px',
    fontWeight: 'bold',
    fontSize: '16px',
    cursor: 'pointer',
    marginTop: '10px',
  },
};