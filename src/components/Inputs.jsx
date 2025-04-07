import { BiSearch, BiCurrentLocation } from "react-icons/bi";
import React, { useEffect, useState } from "react";
import { fetchCountriesList } from "../utils";

const Inputs = ({ onSearch, onGeoSearch }) => {
  const [city, setCity] = useState("");
  const [allCountry, setAllCountry] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const getCountries = async () => {
      const countries = await fetchCountriesList();
      const names = countries.map((c) => c.name.common);
      setAllCountry(names);
    };
    getCountries();
  }, []);

  useEffect(() => {
    if (city.trim() === "") {
      setSuggestions([]);
      return;
    }
    const matches = allCountry.filter((name) =>
      name.toLowerCase().startsWith(city.toLowerCase())
    );
    setSuggestions(matches.slice(0, 8)); 
  }, [city, allCountry]);


  const handleSearchClick = () => {
    if (city !== "") {
      onSearch(city);
      setCity("");
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (name) => {
    setCity(name);
    setSuggestions([]);
    onSearch(name);
  };

  return (
    <div className="flex flex-col items-center my-6">
      <div className="flex flex-row w-3/4 items-center justify-center space-x-4">
        <input
          type="text"
          placeholder="Search a country..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onSearch(city);
              setCity("");
              setSuggestions([]);
            }
          }}
          className="text-gray-600 text-base sm:text-lg font-light p-2 
            w-[140px] sm:w-[250px] md:w-[300px] lg:w-[360px] xl:w-[440px]
            capitalize focus:outline-none placeholder:lowercase 
            bg-amber-50 rounded-lg transition-all duration-300"
        />

        <BiSearch
          size={30}
          onClick={handleSearchClick}
          className="cursor-pointer transition ease-out hover:scale-125"
        />
        <BiCurrentLocation
          size={30}
          onClick={onGeoSearch}
          className="cursor-pointer transition ease-out hover:scale-125"
        />
      </div>

      {/*Displaying Country List*/ }

      {suggestions.length > 0 && (
        <div className="flex flex-wrap gap-4 mt-3 justify-center text-sm text-white">
          {suggestions.map((name, i) => (
            <p
              key={i}
              onClick={() => handleSuggestionClick(name)}
              className="cursor-pointer hover:underline hover:scale-120 transition ease-out"
            >
            {name}
            </p>
          ))}
        </div>
      )}



    </div>
  );
};

export default Inputs;
