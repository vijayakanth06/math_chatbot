const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/notes')
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Schema & Model
const noteSchema = new mongoose.Schema({
  username: { type: String, required: true },
  content: { type: String, required: true },
});

const Note = mongoose.model('Note', noteSchema);

// POST: Create a new note with username
app.post('/api/notes', async (req, res) => {
  console.log("📥 Incoming:", req.body);
  const { username, content } = req.body;

  if (!username || !content) {
    console.log("❌ Missing username or content");
    return res.status(400).json({ message: "Username and content are required" });
  }

  try {
    const newNote = new Note({ username, content });
    console.log("💾 Saving note:", newNote);
    await newNote.save();
    console.log("✅ Note saved:", newNote);
    res.status(201).json(newNote);
  } catch (err) {
    console.error("❌ Save error:", err);
    res.status(500).json({ message: "Error saving note", error: err.message });
  }
});



// GET: Fetch all notes for a specific user
app.get('/api/notes', async (req, res) => {
  const { username } = req.query;

  try {
    const query = username ? { username } : {};
    const notes = await Note.find(query);
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: "Error fetching notes", error: err.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
