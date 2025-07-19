import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import {
  PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid
} from 'recharts';

const BASE_URL = 'http://10.47.92.81:8000/api';
const COLORS = ['#3498db', '#2ecc71'];

export default function Dashboard({ token, onLogout }) {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [currentNumber, setCurrentNumber] = useState(1);
  const doctorId = 1;

  const fetchQueue = useCallback(async () => {
    try {
      const res = await axios.get(`${BASE_URL}/all-patients/${doctorId}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPatients(res.data);
    } catch (error) {
      if (error.response?.status === 401) {
        alert('Session expired. Please log in again.');
        onLogout();
      }
    }
  }, [doctorId, token, onLogout]);

  const fetchCurrentNumber = useCallback(async () => {
    try {
      const res = await axios.get(`${BASE_URL}/current-number/${doctorId}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCurrentNumber(res.data.current_number);
    } catch (error) {
      console.error('Error fetching current number:', error);
      setCurrentNumber(1);
    }
  }, [doctorId, token]);

  const handleMarkDone = async () => {
    try {
      await axios.post(`${BASE_URL}/mark-done/${doctorId}/`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await fetchQueue();
      await fetchCurrentNumber();
    } catch {
      alert('❌ Failed to mark patient as done.');
    }
  };

  useEffect(() => {
    fetchQueue();
    fetchCurrentNumber();
    const interval = setInterval(() => {
      fetchQueue();
      fetchCurrentNumber();
    }, 10000);
    return () => clearInterval(interval);
  }, [fetchQueue, fetchCurrentNumber]);

  const filteredPatients = patients.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.queue_number.toString().includes(searchTerm)
  );

  const theme = {
    background: darkMode ? '#121212' : '#f4f6f9',
    card: darkMode ? '#1e1e1e' : '#fff',
    text: darkMode ? '#eee' : '#2c3e50',
    secondaryText: darkMode ? '#bbb' : '#34495e',
    border: darkMode ? '#444' : '#eee',
    tableHeaderBg: darkMode ? '#2c2c2c' : '#ecf0f1',
    doneRowBg: darkMode ? '#1a1a1a' : '#f9f9f9',
    emptyText: darkMode ? '#777' : '#999',
  };

  const grouped = {
    waiting: filteredPatients.filter(p => p.status === 'waiting'),
    done: filteredPatients.filter(p => p.status === 'done'),
  };

  const chartData = [
    { name: 'Waiting', value: grouped.waiting.length },
    { name: 'Done', value: grouped.done.length },
  ];

  return (
    <div style={{
      padding: 30,
      backgroundColor: theme.background,
      minHeight: '100vh',
      fontFamily: 'Segoe UI',
      color: theme.text
    }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 }}>
        <h1 style={{ fontSize: 28 }}>👨‍⚕️ Doctor Dashboard</h1>
        <div>
          <button
            onClick={() => setDarkMode(!darkMode)}
            style={{
              marginRight: 10,
              padding: '10px 14px',
              background: '#8e44ad',
              color: '#fff',
              border: 'none',
              borderRadius: 6
            }}
          >
            {darkMode ? '☀️ Light' : '🌙 Dark'}
          </button>
          <button
            onClick={onLogout}
            style={{
              background: '#e74c3c',
              color: 'white',
              padding: '10px 16px',
              border: 'none',
              borderRadius: 6
            }}
          >
            Logout
          </button>
        </div>
      </header>

      <div style={{ display: 'flex', gap: '30px', marginBottom: '30px' }}>
        <div style={{ flex: 1, background: theme.card, padding: 20, borderRadius: 10 }}>
          <h3 style={{ marginBottom: 10, color: theme.secondaryText }}>📍 Current Number</h3>
          <h1 style={{ fontSize: 40, margin: 0, color: '#2980b9' }}>{currentNumber}</h1>
        </div>
        <div style={{ flex: 1, background: theme.card, padding: 20, borderRadius: 10 }}>
          <h3 style={{ marginBottom: 10, color: theme.secondaryText }}>🧑‍🤝‍🧑 Registered Patients</h3>
          <h1 style={{ fontSize: 40, margin: 0, color: '#27ae60' }}>{patients.length}</h1>
        </div>
      </div>

      <input
        type="text"
        placeholder="🔍 Search by name or queue number"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        style={{
          padding: 10,
          width: '100%',
          maxWidth: 1200,
          marginBottom: 20,
          borderRadius: 8,
          border: `1px solid ${theme.border}`,
          background: theme.card,
          color: theme.text
        }}
      />

      <div style={{ background: theme.card, padding: 20, borderRadius: 10, marginBottom: 40 }}>
        <h3 style={{ marginBottom: 16, color: theme.secondaryText }}>📊 Status Overview</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie data={chartData} dataKey="value" nameKey="name" outerRadius={80} label>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
        <h4 style={{ marginTop: 30, color: theme.secondaryText }}>📈 Bar Chart</h4>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" stroke={theme.text} />
            <YAxis stroke={theme.text} />
            <Tooltip />
            <Bar dataKey="value" fill="#3498db" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {Object.entries(grouped).map(([status, list]) => (
        <div key={status} style={{ background: theme.card, padding: 20, borderRadius: 10, marginBottom: 30 }}>
          <h3 style={{ color: theme.secondaryText, marginBottom: 16 }}>🧾 {status.replace('_', ' ').toUpperCase()}</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 500 }}>
            <thead>
              <tr style={{ background: theme.tableHeaderBg, textAlign: 'left' }}>
                <th style={{ padding: 12 }}>👤 Name</th>
                <th style={{ padding: 12 }}>#️⃣ Queue No</th>
                <th style={{ padding: 12 }}>📋 Status</th>
                <th style={{ padding: 12 }}>✅ Action</th>
              </tr>
            </thead>
            <tbody>
              {list.map((p) => (
                <tr key={p.queue_number}
                  style={{
                    background: p.status === 'done' ? theme.doneRowBg : 'transparent',
                    borderBottom: `1px solid ${theme.border}`
                  }}
                >
                  <td style={{ padding: 12 }}>{p.name}</td>
                  <td style={{ padding: 12 }}>{p.queue_number}</td>
                  <td style={{
                    padding: 12,
                    color: p.status === 'done' ? '#95a5a6' : '#2980b9',
                    fontWeight: p.status === 'waiting' ? 'bold' : 'normal'
                  }}>
                    {p.status}
                  </td>
                  <td style={{ padding: 12 }}>
                    {status === 'waiting' && (
                      <button
                        onClick={handleMarkDone}
                        style={{
                          background: '#2ecc71',
                          color: '#fff',
                          padding: '6px 12px',
                          border: 'none',
                          borderRadius: 6,
                          fontSize: 14
                        }}>
                        Mark Done
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {list.length === 0 && (
                <tr>
                  <td colSpan="5" style={{
                    padding: 12,
                    textAlign: 'center',
                    color: theme.emptyText
                  }}>
                    No patients found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}