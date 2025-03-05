"use client";
import { useEffect, useState } from "react";

export default function Weather() {
  const [city, setCity] = useState("London");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeather = (cityName) => {
    fetch(`https://wttr.in/${cityName}?format=%C|%t|%h|%w`)
      .then((res) => res.text())
      .then((data) => {
        const [condition, temperature, humidity, wind] = data.split("|");

        if (condition && temperature) {
          setWeather({ condition, temperature, humidity, wind });
          setError(null);
        } else {
          setError("Invalid city name or data unavailable.");
          setWeather(null);
        }
      })
      .catch(() => {
        setError("Failed to fetch weather data");
        setWeather(null);
      });
  };

  useEffect(() => {
    fetchWeather(city);
  }, []);

  const handleSearch = () => {
    if (city.trim() !== "") {
      fetchWeather(city);
    }
  };

  return (
    <div>
      <h2>Weather App</h2>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
      />
      <button onClick={handleSearch}>Get Weather</button>
      <br />

      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="weather-box">
          <h3>Weather in {city}</h3>
          <p>Condition: {weather.condition}</p>
          <p>Temperature: {weather.temperature}</p>
          <p>Humidity: {weather.humidity}</p>
          <p>Wind: {weather.wind}</p>
        </div>
      )}
    </div>
  );
}
