import React from "react";

const TimeandLocation = ({ weather }) => {
  if (!weather) return null;
  const { name, country, localtime } = weather.location;

  const [rawDate, time] = localtime.split(" ");
  const dateObj = new Date(rawDate);
  const dayName = dateObj.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div>
      
      <div className="flex items-center justify-center my-6">
        <p className="font-extralight text-[clamp(1rem,3vw,1.5rem)]">
          {dayName} | Local time: {time}
        </p>
      </div>

      
      <div className="flex items-center justify-center my-3">
        <p className="font-medium text-[clamp(1.5rem,5vw,2.25rem)]">
          {name}, {country}
        </p>
      </div>
    </div>
  );
};

export default TimeandLocation;
