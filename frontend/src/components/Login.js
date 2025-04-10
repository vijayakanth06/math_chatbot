import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: username,
          password: password
        })
      });

      const data = await response.json();

      if (response.ok && data.user?.username) {
        localStorage.setItem('username', data.user.username);
        alert('Login successful!');
        navigate('/education');
      } else {
        alert(data.message || 'Invalid username or password');
      }
    } catch (error) {
      alert('Login failed. Please try again.');
      console.error(error);
    }
  };

  return (
    <div style={styles.background}>
      <div style={styles.card}>
        <h2 style={styles.heading}>🔐 Welcome Back</h2>
        <p style={styles.subheading}>Login to continue</p>

        <input
          type="text"
          placeholder="👤 Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="off"
          style={styles.input}
        />

        <input
          type="password"
          placeholder="🔒 Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="off"
          style={styles.input}
        />

        <button style={styles.button} onClick={handleLogin}>Login</button>

        <p style={styles.signupText}>
          Don't have an account? <Link to="/signup" style={styles.link}>Sign up</Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  background: {
    height: '100vh',
    background: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: "'Segoe UI', sans-serif",
  },
  card: {
    background: 'rgba(0, 0, 0, 0.4)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.37)',
    backdropFilter: 'blur(10px)',
    borderRadius: '20px',
    padding: '40px',
    textAlign: 'center',
    color: '#ffffff',
    width: '350px',
  },
  heading: {
    marginBottom: '10px',
    fontSize: '28px',
    fontWeight: 'bold',
  },
  subheading: {
    fontSize: '14px',
    marginBottom: '20px',
    color: '#ccc',
  },
  input: {
    padding: '12px',
    margin: '10px 0',
    width: '100%',
    borderRadius: '8px',
    border: 'none',
    outline: 'none',
    fontSize: '16px',
    background: '#1e2a38',
    color: '#fff',
  },
  button: {
    padding: '12px 20px',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    cursor: 'pointer',
    backgroundColor: '#00b4db',
    color: '#fff',
    fontWeight: 'bold',
    width: '100%',
    marginTop: '10px',
    transition: '0.3s',
  },
  signupText: {
    marginTop: '20px',
    fontSize: '14px',
    color: '#ccc',
  },
  link: {
    color: '#00b4db',
    textDecoration: 'underline',
  }
};

export default Login;