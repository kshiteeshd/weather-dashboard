import React from "react";

function TopButtons({ onCityClick }) {
  const cities = [
    {
      id: 1,
      name: "London",
    },
    {
      id: 2,
      name: "Sydney",
    },
    {
      id: 3,
      name: "Tokyo",
    },
    {
      id: 4,
      name: "Paris",
    },
    {
      id: 5,
      name: "New Delhi",
    },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-4 my-6 ">
      {cities.map((city) => (
        <button
          key={city.id}
          className="text-lg font-medium hover:bg-blue-600/20 px-3 py-2 rounded-md transition ease-in"
          onClick={() => onCityClick(city.name)}
        >
          {city.name}
        </button>
      ))}
    </div>
  );
}

export default TopButtons;
