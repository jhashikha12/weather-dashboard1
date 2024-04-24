// WeatherCard.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faCloud, faCloudSun, faCloudRain, faSnowflake, faTint, faWind } from '@fortawesome/free-solid-svg-icons';
import './WeatherCard.css'; // Import CSS file for WeatherCard styling
import { GoogleMap, LoadScript } from '@react-google-maps/api'; // Import Google Map components

const containerStyle = {
  width: '100%',
  height: '200px',
};

const WeatherCard = ({ weather }) => {
  const weatherIcon = () => {
    const weatherType = weather.weather[0].main.toLowerCase();
    switch (weatherType) {
      case 'clear':
        return <FontAwesomeIcon icon={faSun} />;
      case 'clouds':
        return <FontAwesomeIcon icon={faCloud} />;
      case 'rain':
        return <FontAwesomeIcon icon={faCloudRain} />;
      case 'snow':
        return <FontAwesomeIcon icon={faSnowflake} />;
      default:
        return <FontAwesomeIcon icon={faCloudSun} />;
    }
  };

  return (
    <div className="weather-card">
      <div className="left">
        <div className="icon">{weatherIcon()}</div>
        <div className="details">
          <h2>{weather.name}</h2>
          <p><FontAwesomeIcon icon={faTint} /> Humidity: {weather.main.humidity}%</p>
          <p><FontAwesomeIcon icon={faWind} /> Wind Speed: {weather.wind.speed} m/s</p>
          <p>Temperature: {weather.main.temp}°C</p>
        </div>
      </div>
      <div className="right">
        <LoadScript googleMapsApiKey="AIzaSyBu6lP_IxzDlbobpv-8OIOnVvWxUcweyrI&q=Space+Needle,Seattle+WA">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={{ lat: weather.coord.lat, lng: weather.coord.lon }}
            zoom={10}
          />
        </LoadScript>
      </div>
    </div>
  );
};

export default WeatherCard;
