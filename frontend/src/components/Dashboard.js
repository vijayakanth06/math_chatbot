import React, { useState, useEffect } from 'react';
import './Dashboard.css';

const Dashboard = () => {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('');
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [reminder, setReminder] = useState({ date: '', time: '', note: '' });
  const [reminders, setReminders] = useState([]);
  const [showChatbot, setShowChatbot] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [username, setUsername] = useState('');

  // Load username from localStorage
  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  // Fetch notes for user
  useEffect(() => {
    if (!username) return;
    fetch(`http://localhost:5000/api/notes/${username}`)
      .then((res) => res.json())
      .then((data) => setNotes(data))
      .catch((err) => console.error("❌ Failed to fetch notes:", err));
  }, [username]);

  // Timer logic
  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      alert('⏰ Time is up!');
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const formatTime = (seconds) => {
    const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    return `${mins}:${secs}`;
  };

  const startTimer = (minutes) => {
    setTimeLeft(minutes * 60);
    setIsRunning(true);
  };

  const handleCalculate = () => {
    try {
      const evalResult = eval(expression); // Note: unsafe in real apps
      setResult(evalResult);
    } catch {
      setResult('Error');
    }
  };

  const handleClear = () => {
    setExpression('');
    setResult('');
  };

  const handleAddNote = () => {
    if (!username) {
      alert("Please login/signup again. Username not found.");
      return;
    }

    if (newNote.trim() !== '') {
      fetch('http://localhost:5000/api/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, content: newNote }),
      })
        .then((res) => res.json())
        .then((data) => {
          setNotes((prev) => [...prev, data]);
          setNewNote('');
        })
        .catch((err) => console.error("❌ Failed to add note:", err));
    }
  };

  const handleAddReminder = () => {
    if (reminder.date && reminder.time && reminder.note.trim() !== '') {
      setReminders((prev) => [...prev, reminder]);
      setReminder({ date: '', time: '', note: '' });
    }
  };

  return (
    <div className="dashboard-container">
      {/* Navbar */}
      <nav>
        <div className="logo">⚡ AI Study Buddy</div>
        <div>
          <span className="welcome-text">Welcome, {username}!</span>
        </div>
      </nav>

      {/* Main Panels */}
      <div className="dashboard-panels">
        {/* Left Panel */}
        <div className="panel left-panel">
          <h3>Scientific Calculator</h3>
          <input
            type="text"
            placeholder="Enter expression"
            value={expression}
            onChange={(e) => setExpression(e.target.value)}
          />
          <div className="calculator-buttons">
            <button onClick={handleCalculate}>Calculate</button>
            <button onClick={handleClear}>Clear</button>
          </div>
          <div className="calculator-result">
            <strong>Result:</strong> {result}
          </div>

          <h3 style={{ marginTop: '30px' }}>Notes</h3>
          <input
            type="text"
            placeholder="Enter a note"
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
          />
          <button onClick={handleAddNote}>Add Note</button>
          <div className="items-list">
            {notes.map((note, idx) => (
              <div key={idx} className="card">📝 {note.content}</div>
            ))}
          </div>
        </div>

        {/* Middle Panel */}
        <div className="panel middle-panel">
          <h2>Your Study Dashboard</h2>
          <p>
            Use this space to stay organized: Add notes, calculate, set reminders, and use timers to stay focused.
          </p>
        </div>

        {/* Right Panel */}
        <div className="panel right-panel">
          <h3>Reminders</h3>
          <input
            type="date"
            value={reminder.date}
            onChange={(e) => setReminder({ ...reminder, date: e.target.value })}
          />
          <input
            type="time"
            value={reminder.time}
            onChange={(e) => setReminder({ ...reminder, time: e.target.value })}
          />
          <input
            type="text"
            placeholder="Reminder note"
            value={reminder.note}
            onChange={(e) => setReminder({ ...reminder, note: e.target.value })}
          />
          <button onClick={handleAddReminder}>Set Reminder</button>
          <div className="items-list">
            {reminders.map((rem, idx) => (
              <div key={idx} className="card">
                📅 {rem.date} ⏰ {rem.time} - {rem.note}
              </div>
            ))}
          </div>

          <h3 style={{ marginTop: '30px' }}>Quick Timer</h3>
          <div className="round-timer">
            <div className="timer-display">{formatTime(timeLeft)}</div>
            <div className="timer-options">
              <button onClick={() => startTimer(1)}>1 Min</button>
              <button onClick={() => startTimer(5)}>5 Min</button>
              <button onClick={() => {
                const hour = prompt('Enter number of hours:');
                if (hour && !isNaN(hour)) startTimer(parseInt(hour) * 60);
              }}>Set Hourly Timer</button>
              <button onClick={() => {
                const hours = prompt('Enter hours (0 if none):');
                const minutes = prompt('Enter minutes (0 if none):');
                const totalMinutes = (parseInt(hours) || 0) * 60 + (parseInt(minutes) || 0);
                if (totalMinutes > 0) startTimer(totalMinutes);
                else alert('Please enter a valid time!');
              }}>Set Custom Timer</button>
            </div>
          </div>
        </div>
      </div>

      {/* Chatbot Button */}
      <button className="chatbot-toggle" onClick={() => setShowChatbot(!showChatbot)}>
        💬
      </button>
      {showChatbot && (
        <div className="chatbot-popup">
          <p>Hi! I'm your AI Study Buddy chatbot. How can I help you today?</p>
          <input type="text" placeholder="Type your message..." />
          <button>Send</button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
