import React, { useState } from 'react';
import './styles.css';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const CityList = ({ cities, onCityClick }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Filter cities based on search term
  const filteredCities = cities.filter(city =>
    city.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <h2>List of Cities</h2>
      <input
        type="text"
        placeholder="Search cities..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <table>
        <thead>
          <tr>
            <th>City Name</th>
            <th>Country</th>
            <th>Timezone</th>
          </tr>
        </thead>
        <tbody>
          {filteredCities.map((city, index) => (
            <tr key={index}>
              <td>
                <Link to={`/city/${city.name}`}>{city.name}</Link> {/* Link to CityDetailsPage */}
              </td>
              <td>{city.cou_name_en}</td>
              <td>{city.timezone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CityList;
