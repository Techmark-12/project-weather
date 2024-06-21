// src/Weather.js
import React, { useState } from 'react';
import axios from 'axios';

const Weather = () => {
  const [location, setLocation] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const apiKey = 'VY7AWFQJR4Q24GMTV23BBNRD4'; // Replace with your Visual Crossing API key

  const getWeather = async (e) => {
    e.preventDefault();
    setError('');
    
    // Clear the weather data if all input fields are empty
    if (!location && !latitude && !longitude) {
      setWeather(null);
      setError('Please enter a location or coordinates');
      return;
    }

    // Construct the query parameter based on the inputs
    let query = location;
    if (latitude && longitude) {
      query = `${latitude},${longitude}`;
    }

    try {
      const response = await axios.get(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${query}?unitGroup=metric&key=${apiKey}&contentType=json`
      );
      setWeather(response.data);
    } catch (err) {
      setError('Location not found');
    }
  };

  return (
    <div>
      <h1>Weather App</h1>
      <form onSubmit={getWeather}>
        <input
          type="text"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
          placeholder="Enter latitude"
        />
        <input
          type="text"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
          placeholder="Enter longitude"
        />
        <p>OR</p>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder='Enter location'
        />
        <button type="submit">Get Weather</button>
      </form>
      {error && <p>{error}</p>}
      {weather && (
        <div>
          <h2>Location: {weather.resolvedAddress}</h2>
          <p>Report Time: {weather.currentConditions.datetime}</p>
          <p>Temperature: {weather.currentConditions.temp} °C</p>
          <p>Weather: {weather.currentConditions.conditions}</p>
          <p>Humidity: {weather.currentConditions.humidity} %</p>
          <p>Wind Speed: {weather.currentConditions.windspeed} m/s</p>
          <p>Conditions: {weather.currentConditions.conditions}</p>
          <p>Description: {weather.description}</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
