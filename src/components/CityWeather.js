import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import CityDetails from './CityDetails'; // Import the CityDetails component
import CityList from './CityList'; // Import the updated CityList component

const Background = styled.div`
  background-color: ${({ weather }) => {
    // Use weather condition to determine background color
    switch (weather) {
      case 'Clear':
        return '#87CEEB'; // Light blue for clear weather
      case 'Clouds':
        return '#778899'; // Dark gray for cloudy weather
      case 'Rain':
        return '#4682B4'; // Steel blue for rainy weather
      case 'Snow':
        return '#F0F8FF'; // Light cyan for snowy weather
      default:
        return '#FFFFFF'; // Default to white background
    }
  }};
`;

const CityWeather = () => {
  const [cityNames, setCityNames] = useState([]);
  const [weatherData, setWeatherData] = useState(null); // State to store weather data

  useEffect(() => {
    fetchCityNames();
  }, []);

  const fetchCityNames = async () => {
    try {
      const response = await fetch(
        'https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=20'
      );
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();

      if (!data || !data.results || !Array.isArray(data.results)) {
        throw new Error('Invalid data format received');
      }

      const cityNames = data.results.map(record => ({
        name: record.name,
        cou_name_en: record.cou_name_en,
        timezone: record.timezone
      }));

      setCityNames(cityNames);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleCityClick = async (cityName) => { // Modified parameter to accept cityName
    try {
      const apiKey = 'fe4feefa8543e06d4f3c66d92c61b69c';
      const encodedCity = encodeURIComponent(cityName); // Use cityName instead of city
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
    <Background weather={weatherData?.weather[0]?.main}>
      <CityList cities={cityNames} onCityClick={handleCityClick} /> {/* Pass handleCityClick function */}
      {weatherData && <CityDetails city={weatherData} />} {/* Render CityDetails if weatherData is available */}
    </Background>
  );
};

export default CityWeather;
