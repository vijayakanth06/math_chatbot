const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email:    { type: String, required: true, unique: true },
  mobile:   { type: String, required: true },  // <- Add mobile field
  password: { type: String, required: true },
});

module.exports = mongoose.model('User', userSchema);
