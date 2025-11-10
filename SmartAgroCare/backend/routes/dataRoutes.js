const express = require("express");
const router = express.Router();
const SensorData = require("../models/dataModel");

// POST: Receive ESP32 sensor data
router.post("/data", async (req, res) => {
  try {
    const newData = new SensorData(req.body);
    await newData.save();
    console.log("✅ Data received from ESP32:", req.body);
    res.status(200).json({ message: "Data saved successfully" });
  } catch (err) {
    console.error("❌ Error saving data:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// GET: Latest sensor data
router.get("/data/latest", async (req, res) => {
  try {
    const latest = await SensorData.findOne().sort({ timestamp: -1 });
    res.json(latest);
  } catch (err) {
    res.status(500).json({ error: "Could not fetch latest data" });
  }
});

// GET: All sensor data
router.get("/data/all", async (req, res) => {
  try {
    const allData = await SensorData.find().sort({ timestamp: -1 }).limit(100);
    res.json(allData);
  } catch (err) {
    res.status(500).json({ error: "Could not fetch data" });
  }
});

module.exports = router;
