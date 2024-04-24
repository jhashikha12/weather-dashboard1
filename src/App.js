// App.js
import React, { useState } from 'react';
import './App.css'; // Import CSS file
import SearchBar from './SearchBar';
import WeatherCard from './WeatherCard';

const API_KEY = '29a0198503c024b9c09632a963efa877';

const App = () => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [key, setKey] = useState(0); // Add key state

  const fetchWeather = async (city) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );
      if (!response.ok) {
        throw new Error('City not found');
      }
      const data = await response.json();
      setWeather(data);
      setError(null);
      setKey(prevKey => prevKey + 1); // Increment key to force remounting of WeatherCard
    } catch (error) {
      setWeather(null);
      setError(error.message);
    }
  };

  return (
    <div className="container">
      <h1 className="header">Weather Dashboard</h1>
      <div className="search-bar-container">
        <SearchBar onSubmit={fetchWeather} />
      </div>
      {error && <p>{error}</p>}
      {weather && <WeatherCard key={key} weather={weather} className="weather-card" />} {/* Add key prop */}
    </div>
  );
};

export default App;
