"use client";
import { useState } from "react";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    if (!city) return;

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f124b94422ce30d02c1132f8f0ac2f38&units=metric`
      );
      const data = await response.json();

      if (data.cod !== 200) {
        setError(data.message);
        setWeatherData(null);
      } else {
        setWeatherData(data);
        setError(null);
      }
    } catch (err) {
      setError("Failed to fetch weather data. Please try again.");
      setWeatherData(null);
    }
  };

  return (
    <div className="container">
      <h2>Get Weather </h2>
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={fetchWeather}>Get Weather</button>

      {error && <p className="error">{error}</p>}

      {weatherData && (
        <div className="weather-info">
          <h3>
            {weatherData.name}, {weatherData.sys.country}
          </h3>
          <p>
            <strong>Temperature:</strong> {weatherData.main.temp}°C
          </p>
          <p>
            <strong>Feels Like:</strong> {weatherData.main.feels_like}°C
          </p>
          <p>
            <strong>Weather:</strong> {weatherData.weather[0].main} (
            {weatherData.weather[0].description})
          </p>
          <p>
            <strong>Humidity:</strong> {weatherData.main.humidity}%
          </p>
          <p>
            <strong>Wind Speed:</strong> {weatherData.wind.speed} m/s
          </p>
          <p>
            <strong>Pressure:</strong> {weatherData.main.pressure} hPa
          </p>
        </div>
      )}
    </div>
  );
};

export default Weather;
