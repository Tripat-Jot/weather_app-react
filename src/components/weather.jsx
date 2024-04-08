import React, { useState } from 'react';
import axios from 'axios';
import './weather.css'; // Ensure you have an App.css file in your project

function App() {
  const [location, setLocation] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const fetchWeather = async (e) => {
    e.preventDefault();
    const apiKey = '3d60d4ae490cb852fe8925b80e29bd77';
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    try {
      const response = await axios.get(weatherUrl);
      setWeather(response.data);
      setError(''); // Clear any previous errors
    } catch (error) {
      console.error('Failed to fetch weather data:', error);
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message); // Set the error message from the API response
      } else {
        setError('Failed to fetch weather data'); // Set a generic error message
      }
      setWeather(null);
    }
  };

  return (
    <div className="App">
      <div className="weather-app-container">
        <h1>Weather Finder</h1>
        <form onSubmit={fetchWeather} className="search-form">
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter City"
            className="search-input"
          />
          <button type="submit" className="search-button">Get Weather</button>
        </form>
        {error && <p className="error-message">{error}</p>}
        {weather && (
          <div className="weather-info">
            <h2>{weather.name}, {weather.sys.country}</h2>
            <p>Temperature: {weather.main.temp}°C</p>
            <p>Weather: {weather.weather[0].description}</p>
            <p>Wind Speed: {weather.wind.speed} m/s</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
