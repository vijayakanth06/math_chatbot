// models/Note.js
const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  username: { type: String, required: true },
  content: { type: String, required: true },
});

module.exports = mongoose.model('Note', noteSchema);
