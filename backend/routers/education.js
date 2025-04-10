const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Mongoose Schema
const educationSchema = new mongoose.Schema({
  username: { type: String, required: true },
  educationLevel: { type: String },
  classOrYear: { type: String },
  institution: { type: String },
  course: { type: String },
  semester: { type: String },
  skipped: { type: Boolean, default: false }
}, { timestamps: true });

// Mongoose Model
const Education = mongoose.model('Education', educationSchema);

// POST route to handle form submit or skip
router.post('/', async (req, res) => {
  const { username, educationLevel, classOrYear, institution, course, semester, skipped } = req.body;

  if (!username) {
    return res.status(400).json({ message: 'Username is required' });
  }

  try {
    const educationData = new Education({
      username,
      educationLevel,
      classOrYear,
      institution,
      course,
      semester,
      skipped: skipped || false
    });

    await educationData.save();
    res.status(200).json({ message: skipped ? 'Education skipped' : 'Education details saved successfully' });
  } catch (err) {
    console.error('❌ Error saving education:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
