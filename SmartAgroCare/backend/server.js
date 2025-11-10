/************************************************************
 * SMART AGROCARE BACKEND - Integrated with Existing Server
 * Existing Routes: /api/auth, /api/weather
 * Added Routes:    /api/data  (for ESP32 IoT sensor uploads)
 ************************************************************/

const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
require('dotenv').config();

const app = express();

// ✅ Connect MongoDB
connectDB();

// ✅ Middleware
app.use(cors());
app.use(express.json({ extended: false }));

// ✅ Existing Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/weather', require('./routes/weatherRoutes'));

// ✅ NEW: SmartAgroCare IoT Routes
app.use('/api', require('./routes/dataRoutes'));  // handles /api/data

// ✅ Default Route
app.get('/', (req, res) => {
  res.send('🌾 SmartAgroCare Backend Server Running...');
});

// ✅ Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server started on port ${PORT} 🔥`));
