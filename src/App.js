// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import CityDetails from './components/CityDetails';
import CityWeather from './components/CityWeather';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<CityWeather />} />
          <Route path="/city/:name" element={<CityDetails />} /> {/* Pass props to CityDetails */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
