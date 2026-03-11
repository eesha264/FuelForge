const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const mongoose = require('mongoose');

app.use(express.json());
app.use(cors({
  origin: process.env.CORS_ORIGIN
}));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('✅ Successfully connected to MongoDB');
}).catch((error) => {
  console.error('❌ Error connecting to MongoDB:', error.message);
});

app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is working!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});