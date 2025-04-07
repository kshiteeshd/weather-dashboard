// src/utils.js
export const fetchWeatherByCity = async (city) => {
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY; 
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}`;  
    try {
      const response = await fetch(url);
      if(!response.ok){
        throw new Error("City not Found. Please Enter Proper City");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching weather:", error);
      return null;
    }
  };

  
  export const fetchWeatherByCoords = async (lat, lon) => {
    const key = import.meta.env.VITE_WEATHER_API_KEY; 
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${lat},${lon}&days=1`;  
    const response = await fetch(url);
    const data = await response.json();
    return data;
  };


  export const fetchCountriesList = async () => {
    try {
      const result = await fetch("https://restcountries.com/v3.1/all");
      if (!result.ok) throw new Error("Failed to fetch countries");
      const countryData = await result.json();
      return countryData;
    } catch (error) {
      console.error("Fetch error:", error);
      return [];
    }
  };

