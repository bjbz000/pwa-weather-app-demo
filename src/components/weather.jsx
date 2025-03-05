"use client";
import { useState } from "react";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    if (!city) return;
    try {
      setError("");
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f124b94422ce30d02c1132f8f0ac2f38&units=metric`
      );
      const data = await response.json();
      if (data.cod !== 200) {
        setError(data.message);
        setWeather(null);
      } else {
        setWeather(data);
      }
    } catch (error) {
      setError("Failed to fetch weather data");
      setWeather(null);
    }
  };

  const getWeatherIcon = (main) => {
    switch (main) {
      case "Clear":
        return "☀️";
      case "Clouds":
        return "☁️";
      case "Rain":
        return "🌧️";
      case "Drizzle":
        return "🌦️";
      case "Thunderstorm":
        return "⛈️";
      case "Snow":
        return "❄️";
      default:
        return "🌍";
    }
  };

  return (
    <div className="container">
      <h2>Weather App</h2>
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={fetchWeather}>Get Weather</button>
      {error && <p className="error">{error}</p>}
      {weather && (
        <div className="weather-info">
          <div className="weather-icon">
            {getWeatherIcon(weather.weather[0].main)}
          </div>
          <h3>
            {weather.name}, {weather.sys.country}
          </h3>
          <p>
            <strong>Temperature:</strong> {weather.main.temp}°C
          </p>
          <p>
            <strong>Feels Like:</strong> {weather.main.feels_like}°C
          </p>
          <p>
            <strong>Weather:</strong> {weather.weather[0].main} (
            {weather.weather[0].description})
          </p>
          <p>
            <strong>Humidity:</strong> {weather.main.humidity}%
          </p>
          <p>
            <strong>Wind Speed:</strong> {weather.wind.speed} m/s
          </p>
          <p>
            <strong>Pressure:</strong> {weather.main.pressure} hPa
          </p>
        </div>
      )}
    </div>
  );
};

export default Weather;
