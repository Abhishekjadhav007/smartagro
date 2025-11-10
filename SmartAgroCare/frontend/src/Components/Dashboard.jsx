import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

// --- Icon Components ---
const SunIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>;
const LeafIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const MarketIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>;
const GovtIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 4h5m-5 4h5" /></svg>;
const BookIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>;
const CommunityIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;
const SoilIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" /></svg>;
const AlertIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>;
const CalculatorIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>;
const LocationIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const RefreshIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>;

// --- Weather Widget Component ---
const WeatherWidget = ({ weatherData, error, onRefresh, isLoading }) => {
    if (error) {
        return (
            <div className="p-6 rounded-2xl shadow-lg bg-gradient-to-r from-green-50 to-emerald-50 text-center border border-green-100">
                <p className="text-red-600 font-semibold">{error}</p>
            </div>
        );
    }
    
    if (!weatherData) {
        return (
            <div className="p-6 rounded-2xl shadow-lg bg-gradient-to-r from-green-50 to-emerald-50 text-center border border-green-100">
                <p className="text-gray-600">Getting location and weather data...</p>
            </div>
        );
    }

    const { name, main, weather, wind } = weatherData;
    const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

    return (
        <div className="p-6 rounded-2xl shadow-lg bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100">
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center">
                    <LocationIcon />
                    <h2 className="text-2xl font-bold text-green-800 ml-2">{name}</h2>
                </div>
                <button 
                    onClick={onRefresh}
                    disabled={isLoading}
                    className="p-2 rounded-full bg-green-100 hover:bg-green-200 transition-colors"
                    title="Refresh weather data"
                >
                    <RefreshIcon />
                </button>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
                <div className="text-center sm:text-left">
                    <p className="text-lg text-green-700 capitalize">{weather[0].description}</p>
                    <p className="text-sm text-green-600 mt-2">Feels like: {Math.round(main.feels_like)}°C</p>
                    <p className="text-sm text-green-600">Humidity: {main.humidity}%</p>
                    <p className="text-sm text-green-600">Wind: {wind.speed} m/s</p>
                </div>
                <div className="flex items-center space-x-4">
                    <img src={iconUrl} alt={weather[0].description} className="w-16 h-16" />
                    <p className="text-5xl font-bold text-green-900">{Math.round(main.temp)}°C</p>
                </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-green-200 grid grid-cols-2 gap-4">
                <div className="text-center">
                    <p className="text-sm text-green-600">Min Temp</p>
                    <p className="text-lg font-semibold text-green-800">{Math.round(main.temp_min)}°C</p>
                </div>
                <div className="text-center">
                    <p className="text-sm text-green-600">Max Temp</p>
                    <p className="text-lg font-semibold text-green-800">{Math.round(main.temp_max)}°C</p>
                </div>
                <div className="text-center">
                    <p className="text-sm text-green-600">Pressure</p>
                    <p className="text-lg font-semibold text-green-800">{main.pressure} hPa</p>
                </div>
                <div className="text-center">
                    <p className="text-sm text-green-600">Visibility</p>
                    <p className="text-lg font-semibold text-green-800">{(weatherData.visibility / 1000).toFixed(1)} km</p>
                </div>
            </div>
        </div>
    );
};

// New Component: Weather Advisory
const WeatherAdvisory = ({ weatherData }) => {
    if (!weatherData) return null;
    
    const { main, weather } = weatherData;
    const temp = main.temp;
    const condition = weather[0].main;
    const humidity = main.humidity;
    
    let advisories = [];
    
    if (temp > 30) {
        advisories.push("High temperatures: Consider irrigating in the early morning or late evening to reduce water evaporation.");
    } else if (temp < 10) {
        advisories.push("Low temperatures: Protect sensitive crops with covers or consider using cold frames.");
    }
    
    if (condition === 'Rain' || condition === 'Drizzle') {
        advisories.push("Rain expected: Delay irrigation and fertilizer application to prevent runoff.");
    } else if (condition === 'Clear') {
        advisories.push("Sunny day: Good time for harvesting and drying crops.");
    }
    
    if (humidity > 80) {
        advisories.push("High humidity: Monitor crops for fungal diseases and ensure proper ventilation if in greenhouses.");
    }
    
    if (advisories.length === 0) {
        advisories.push("No specific weather advisories at this time. Favorable conditions for most farming activities.");
    }
    
    return (
        <div className="p-6 rounded-2xl shadow-lg bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-100">
            <h3 className="text-xl font-bold text-amber-800 mb-4 flex items-center">
                <AlertIcon />
                <span className="ml-2">Weather Advisory</span>
            </h3>
            <ul className="list-disc pl-5 space-y-2">
                {advisories.map((advisory, index) => (
                    <li key={index} className="text-amber-700">{advisory}</li>
                ))}
            </ul>
        </div>
    );
};

// New Component: Quick Stats
const QuickStats = () => {
    return (
        <div className="p-6 rounded-2xl shadow-lg bg-gradient-to-r from-teal-50 to-cyan-50 border border-teal-100">
            <h3 className="text-xl font-bold text-teal-800 mb-4">Today's Farming Metrics</h3>
            <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                    <p className="text-sm text-teal-600">Soil Moisture</p>
                    <p className="text-2xl font-bold text-teal-800">62%</p>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                    <p className="text-sm text-teal-600">Crop Health</p>
                    <p className="text-2xl font-bold text-teal-800">89%</p>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                    <p className="text-sm text-teal-600">Water Usage</p>
                    <p className="text-2xl font-bold text-teal-800">340L</p>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                    <p className="text-sm text-teal-600">Growth Stage</p>
                    <p className="text-2xl font-bold text-teal-800">Vegetative</p>
                </div>
            </div>
        </div>
    );
};

function DashboardPage() {
    const [userName, setUserName] = useState('');
    const [weather, setWeather] = useState(null);
    const [locationError, setLocationError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const fetchWeatherData = async (lat, lon) => {
        setIsLoading(true);
        const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
        if (!apiKey) {
            console.error("API Key not found. Please add VITE_OPENWEATHER_API_KEY to your .env file.");
            setLocationError("Weather service is not configured.");
            setIsLoading(false);
            return;
        }
        
        const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
        try {
            const response = await axios.get(weatherApiUrl);
            setWeather(response.data);
            setLocationError('');
        } catch (error) {
            console.error("Could not fetch weather data:", error);
            setLocationError("Could not fetch weather data.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleRefreshWeather = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    fetchWeatherData(latitude, longitude);
                },
                (error) => {
                    console.error("Error getting location:", error);
                    setLocationError('Location access denied. Please enable it to see local weather.');
                }
            );
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }

        try {
            const decodedToken = jwtDecode(token);
            if (decodedToken.user && decodedToken.user.name) {
                setUserName(decodedToken.user.name);
            }

            // Get user's current location
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        fetchWeatherData(latitude, longitude);
                    },
                    (error) => {
                        console.error("Error getting location:", error);
                        setLocationError('Location access denied. Please enable it in your browser settings to see local weather.');
                    }
                );
            } else {
                setLocationError("Geolocation is not supported by this browser.");
            }

        } catch (error) {
            console.error("Token is invalid:", error);
            localStorage.removeItem('token');
            navigate('/login');
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const ServiceCard = ({ icon, title, description, bgColor }) => (
        <div className={`p-6 rounded-2xl shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${bgColor} border border-white`}>
            <div className="flex items-center space-x-4">
                {icon}
                <h3 className="text-xl font-bold text-gray-800">{title}</h3>
            </div>
            <p className="mt-4 text-gray-600">{description}</p>
            <button className="mt-4 text-green-600 font-semibold text-sm hover:text-green-800 transition-colors">
                Explore →
            </button>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
            <header className="bg-gradient-to-r from-green-600 to-emerald-600 shadow-lg">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center">
                        <LeafIcon />
                        <h1 className="text-2xl font-bold text-white ml-2">Smart AgroCare</h1>
                    </div>
                    <div className="flex items-center space-x-4">
                        <span className="text-lg font-medium text-white hidden sm:block">Welcome, <span className="font-bold">{userName || 'User'}</span>!</span>
                        <button onClick={handleLogout} className="px-4 py-2 font-semibold text-white bg-red-500 rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition-colors">Logout</button>
                    </div>
                </div>
            </header>
            
            <main className="container mx-auto px-6 py-8">
                {/* Weather Section */}
                <div className="mb-8">
                    <WeatherWidget 
                        weatherData={weather} 
                        error={locationError} 
                        onRefresh={handleRefreshWeather}
                        isLoading={isLoading}
                    />
                </div>
                
                {/* Additional Info Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    <WeatherAdvisory weatherData={weather} />
                    <QuickStats />
                </div>
                
                {/* Services Grid */}
                <h2 className="text-2xl font-bold text-green-800 mb-6 border-b border-green-200 pb-2">Farm Management Tools</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <ServiceCard 
                        icon={<SunIcon />} 
                        title="Weather Forecast" 
                        description="Plan your farming activities with real-time weather updates and 7-day forecasts." 
                        bgColor="bg-gradient-to-br from-yellow-50 to-amber-50" 
                    />
                    <ServiceCard 
                        icon={<LeafIcon />} 
                        title="Crop Management" 
                        description="Track crops, get pest control advice, and manage planting and harvesting schedules." 
                        bgColor="bg-gradient-to-br from-green-50 to-emerald-50" 
                    />
                    <ServiceCard 
                        icon={<MarketIcon />} 
                        title="Market Prices (Mandi)" 
                        description="Check the latest crop prices from nearby markets to get the best deal for your produce." 
                        bgColor="bg-gradient-to-br from-blue-50 to-cyan-50" 
                    />
                    <ServiceCard 
                        icon={<GovtIcon />} 
                        title="Government Schemes" 
                        description="Find information on the latest government schemes for subsidies, loans, and insurance." 
                        bgColor="bg-gradient-to-br from-orange-50 to-amber-50" 
                    />
                    <ServiceCard 
                        icon={<BookIcon />} 
                        title="Resource Hub" 
                        description="Access articles, guides, and best practices for modern and sustainable farming." 
                        bgColor="bg-gradient-to-br from-purple-50 to-violet-50" 
                    />
                    <ServiceCard 
                        icon={<CommunityIcon />} 
                        title="Community Forum" 
                        description="Connect with fellow farmers, ask questions, and share your knowledge and experiences." 
                        bgColor="bg-gradient-to-br from-pink-50 to-rose-50" 
                    />
                    <ServiceCard 
                        icon={<SoilIcon />} 
                        title="Soil Health" 
                        description="Get recommendations for soil treatment based on your soil test results and crop type." 
                        bgColor="bg-gradient-to-br from-amber-50 to-yellow-50" 
                    />
                    <ServiceCard 
                        icon={<CalculatorIcon />} 
                        title="Crop Calculator" 
                        description="Calculate seed requirements, fertilizer needs, and expected yield for your crops." 
                        bgColor="bg-gradient-to-br from-teal-50 to-cyan-50" 
                    />
                </div>
                
                {/* Call to Action */}
                
            </main>
            
            <footer className="mt-12 py-6 bg-gradient-to-r from-green-700 to-emerald-700 text-white text-center">
                <p>© 2023 Smart AgroCare | Empowering Farmers with Technology</p>
            </footer>
        </div>
    );
}

export default DashboardPage;