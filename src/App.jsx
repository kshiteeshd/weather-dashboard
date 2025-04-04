import TopButtons from "./components/TopButtons";
import Inputs from "./components/Inputs";
import React, { useState, useEffect } from "react";
import TimeandLocation from "./components/TimeandLocation";
import TempandDetails from "./components/TempandDetails";
import { fetchWeatherByCity, fetchWeatherByCoords } from "./utils";

const App = () => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const handleCityClick = async (city) => {
    const data = await fetchWeatherByCity(city);
    if (data) {
      setWeather(data);
      setError(null);
    } else {
      setError("City not found. Try again.");
    }

    console.log("Fetched weather data:", data);
  };

  const handleGeoSearch = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          const data = await fetchWeatherByCoords(lat, lon);
          setWeather(data);
          console.log("Geo Weather Data:", data);
        },
        (error) => {
          console.log("Geolocation Error:", error);
          alert("Failed to get your location");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    fetchWeatherByCity("London").then((data) => {
      setWeather(data);
      console.log("Default weather loaded:", data);
    });
  }, []);

  const getBackgroundClass = () => {
    if (!weather) return "from-cyan-200 to-blue-900";

    const condition = weather.current.condition.text.toLowerCase();
    const isDay = weather.current.is_day === 1;
    if (!isDay) return "from-gray-800 to-black";
    if (condition.includes("sunny") || condition.includes("clear")) {
      return "from-yellow-400 to-orange-800";
    }
    if (
      condition.includes("rain") ||
      condition.includes("drizzle") ||
      condition.includes("thunder")
    ) {
      return "from-sky-400 to-blue-700";
    }
    if (condition.includes("cloud")) {
      return "from-gray-300 to-gray-600";
    }

    return "from-cyan-200 to-blue-900";
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div
        className={`mx-auto max-w-screen-lg mt-4 rounded-xl py-5 px-6 sm:px-10 bg-gradient-to-br shadow-xl shadow-gray-400 ${getBackgroundClass()} w-full`}
      >
        <h1 className="flex items-center justify-center text-4xl font-medium py-4">
          Check Weather
        </h1>
        <TopButtons onCityClick={handleCityClick} />
        <Inputs onSearch={handleCityClick} onGeoSearch={handleGeoSearch} />

        {error && (
          <div className="text-blue-800 text-center my-4 text-lg font-semibold">
            {error}
          </div>
        )}

        <TimeandLocation weather={weather} />
        <TempandDetails weather={weather} />
      </div>
    </div>
  );
};

export default App;
