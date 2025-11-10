const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  device: String,
  nitrogen: Number,
  phosphorus: Number,
  potassium: Number,
  ph: Number,
  moisture: Number,
  motor: String,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model("SensorData", dataSchema);
