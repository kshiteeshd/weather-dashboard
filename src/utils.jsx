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
    const key = "992f67674c3247c0ae2144041250304"; 
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${lat},${lon}&days=1`;
  
    const response = await fetch(url);
    const data = await response.json();
    return data;
  };