const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// ✅ THIS LINE IS SUPER IMPORTANT
const educationRouter = require('./routers/education'); // adjust path if needed
app.use('/api/education', educationRouter); // must match frontend URL

// DB connection (optional if using MongoDB)
mongoose.connect('mongodb://localhost:27017/education', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

// Server start
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
