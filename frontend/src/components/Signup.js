import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Signup() {
  const [username, setUsername] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');
  const navigate = useNavigate();

  const evaluatePasswordStrength = (pwd) => {
    if (pwd.length < 8) return 'Weak';
    if (/[A-Z]/.test(pwd) && /[0-9]/.test(pwd) && /[^A-Za-z0-9]/.test(pwd)) return 'Strong';
    if ((/[A-Z]/.test(pwd) || /[0-9]/.test(pwd)) && pwd.length >= 8) return 'Medium';
    return 'Weak';
  };

  const handlePasswordChange = (e) => {
    const pwd = e.target.value;
    setPassword(pwd);
    setPasswordStrength(evaluatePasswordStrength(pwd));
  };

  const handleSignup = async () => {
    if (password.length < 8) {
      alert('Password must be at least 8 characters');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, mobile, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Signup successful!');
        navigate('/login');
      } else {
        alert(data.message || 'Signup failed');
      }
    } catch (error) {
      alert('Signup error. Try again.');
      console.error(error);
    }
  };

  const getStrengthColor = (strength) => {
    if (strength === 'Strong') return 'limegreen';
    if (strength === 'Medium') return 'gold';
    return 'crimson';
  };

  return (
    <div style={styles.background}>
      <div style={styles.card}>
        <h2 style={styles.heading}>🚀 Create Your Account</h2>
        <p style={styles.subheading}>Start your journey with us!</p>

        <input
          type="text"
          placeholder="👤 Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
        />

        <input
          type="email"
          placeholder="📧 Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />

        <input
          type="text"
          placeholder="📱 Mobile Number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          style={styles.input}
        />

        <input
          type="password"
          placeholder="🔒 Password (min 8 characters)"
          value={password}
          onChange={handlePasswordChange}
          style={styles.input}
        />
        <p style={{ fontSize: '13px', color: getStrengthColor(passwordStrength), textAlign: 'left' }}>
          Password Strength: {passwordStrength}
        </p>

        <input
          type="password"
          placeholder="🔐 Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          style={styles.input}
        />

        <div style={styles.rememberContainer}>
          <input type="checkbox" id="remember" />
          <label htmlFor="remember" style={styles.rememberLabel}>Remember me</label>
        </div>

        <button style={styles.button} onClick={handleSignup}>Sign Up</button>

        <p style={styles.signupText}>
          Already have an account? <Link to="/login" style={styles.link}>Login</Link>
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
  rememberContainer: {
    textAlign: 'left',
    marginBottom: '10px',
    fontSize: '14px',
    color: '#ccc',
  },
  rememberLabel: {
    marginLeft: '8px',
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

export default Signup;
