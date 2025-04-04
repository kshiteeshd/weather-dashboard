import { BiSearch, BiCurrentLocation } from "react-icons/bi";
import React, { useState } from "react";

const Inputs = ({ onSearch, onGeoSearch }) => {
  const [city, setCity] = useState("");

  const handleSearchClick = () => {
    if (city !== "") {
      onSearch(city);
      setCity("");
    }
  };

  return (
    <div className="flex flex-row justify-center my-6">
      <div className="flex flex-row w-3/4 items-center justify-center space-x-4">
        <input
          type="text"
          placeholder="search by city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onSearch(city);
              setCity("");
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
    </div>
  );
};

export default Inputs;
