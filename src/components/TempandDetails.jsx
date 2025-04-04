import { FaThermometerEmpty } from "react-icons/fa";
import { BiSolidDropletHalf } from "react-icons/bi";
import { FiWind } from "react-icons/fi";
import { GiSunrise, GiSunset } from "react-icons/gi";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";
import React from "react";

const TempandDetails = ({ weather }) => {
  if (!weather?.forecast?.forecastday) return null;
  const {
    current: {
      temp_c,
      condition: { text, icon },
      wind_kph,
      humidity,
      feelslike_c,
    },
    forecast: { forecastday },
  } = weather;

  const { maxtemp_c, mintemp_c } = forecastday[0].day;
  const { sunrise, sunset } = forecastday[0].astro;

  const verticalDetails = [
    {
      id: 1,
      Icon: FaThermometerEmpty,
      title: "Real Feel",
      value: `${feelslike_c}°C`,
    },
    {
      id: 2,
      Icon: BiSolidDropletHalf,
      title: "Humidity",
      value: `${humidity}%`,
    },
    {
      id: 3,
      Icon: FiWind,
      title: "Wind",
      value: `${wind_kph} km/h`,
    },
  ];

  const horizontalDetails = [
    {
      id: 1,
      Icon: GiSunrise,
      title: "Sunrise",
      value: sunrise,
    },
    {
      id: 2,
      Icon: GiSunset,
      title: "Sunset",
      value: sunset,
    },
    {
      id: 3,
      Icon: MdKeyboardArrowUp,
      title: "High",
      value: `${maxtemp_c}°C`,
    },
    {
      id: 4,
      Icon: MdKeyboardArrowDown,
      title: "Low",
      value: `${mintemp_c}°C`,
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-center py-1 text-2xl text-white">
        <p>{text}</p>
      </div>

      <div className="py-6">
        <hr className="border-t border-white opacity-50 w-full mb-6" />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-x-10 items-center justify-items-center text-center sm:text-left">
          <div className="flex justify-center">
            <img
              src={`https:${icon}`}
              alt="weather icon"
              className="w-16 sm:w-20 md:w-24 lg:w-28"
            />
          </div>

          <p className="text-5xl sm:text-6xl md:text-7xl font-semibold">
            {temp_c}&deg;C
          </p>

          <div className="flex flex-col space-y-3 items-center sm:items-start">
            {verticalDetails.map(({ id, Icon, title, value }) => (
              <div key={id} className="flex items-center text-sm font-light">
                <Icon size={18} className="mr-1 sm:size-5" />
                {`${title}:`}
                <span className="font-medium ml-1">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom horizontal line */}
        <hr className="border-t border-white opacity-50 w-full mt-6" />
      </div>

      <div className="flex flex-row items-center justify-center mt-6 sm:mt-10">
        <div className="grid grid-cols-2 sm:flex sm:flex-row items-center justify-center gap-4 mt-4">
          {horizontalDetails.map(({ id, Icon, title, value }) => (
            <div
              key={id}
              className="flex flex-col items-center justify-center text-xs sm:flex-row sm:items-center sm:justify-center font-light px-2"
            >
              <Icon size={40} className="mr-1" />
              {`${title}:`}
              <span className="font-medium ml-1 text-xs">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TempandDetails;
