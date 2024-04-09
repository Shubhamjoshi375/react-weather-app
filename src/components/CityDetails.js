// CityDetailsPage.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const CityDetailsPage = () => {
  const [weatherData, setWeatherData] = useState(null); // State to store weather data
  const { name } = useParams(); // Get city name from URL params

  useEffect(() => {
    fetchWeatherData(name);
  }, [name]);

  const fetchWeatherData = async (cityName) => {
    try {
      const apiKey = 'fe4feefa8543e06d4f3c66d92c61b69c';
      const encodedCity = encodeURIComponent(cityName);
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodedCity}&appid=${apiKey}`;
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }
      const data = await response.json();
      console.log('Weather data for', cityName, ':', data);
      setWeatherData(data); // Store weather data in state
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  return (
    <div>
      {weatherData && (
        <div>
          <h2>Weather Details for {name}</h2>
          <p>Temperature: {weatherData.main.temp} °C</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Weather: {weatherData.weather[0].main}</p>
        </div>
      )}
    </div>
  );
};

export default CityDetailsPage;
