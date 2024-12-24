import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
const App = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');
  const apiKey = '790e9d9a1ce3cac7f8ec995144eb59f1';
  const fetchWeather = async () => {
    if (!city) {
      setError('Please enter a city name.');
      return;
    }
    try {
      const response = await
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
      setWeather(response.data);
      setError('');
    } catch (err) {
      setWeather(null);
      setError('City not found. Please try again');

    }
  }
  return (
    <div className='app'>
      <h1>Weather App</h1>
      <div>
        <input type="text" placeholder='Enter city name'
          value={city} onChange={(e) => setCity(e.target.value)} />
        <button onClick={fetchWeather}>Get Weather</button>
      </div>
      {error && <p className='error'>{error}</p>}
      {weather && (<div className='weather-info'>
        <h2>{weather.name},{weather.sys.country}</h2>
        <p>Temperature:{weather.main.temp}&deg;C</p>
        <p>Feels-like:{weather.main.feels_like}&deg;C</p>
        <p>Weather:{weather.weather[0].description}</p>
        <p>Humidity:{weather.main.humidity}%</p>


      </div>)}
    </div>
  )
}

export default App