const axios = require('axios');
require('dotenv').config();

exports.getWeather = async (req, res) => {
    const { city } = req.query;
    if (!city) {
        return res.status(400).json({ msg: 'City parameter is required' });
    }
    
    const apiKey = process.env.OPENWEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const weatherResponse = await axios.get(url);
        res.json(weatherResponse.data);
    } catch (error) {
        console.error("OpenWeather API error:", error.response?.data || error.message);
        res.status(500).json({ msg: 'Failed to fetch weather data' });
    }
};