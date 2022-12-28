import React, { useState } from "react";
import { AiOutlinePushpin } from "react-icons/ai";
import { FiRefreshCw } from "react-icons/fi";
import { GoSearch } from "react-icons/go";
import { useNavigate } from "react-router-dom";

function NavBar() {
  const [city, setCity] = useState("");
  const navigate = useNavigate();

  const showWeather = (e) => {
    e.preventDefault();
    navigate("/weather", {
      state: {
        city: city,
      },
    });
  };

  return (
    <nav className="relative top-0 left-0 flex justify-between items-center px-8 md:px-14 lg:px-100px py-4 w-auto bg-customBrownThree shadow-md">
      <h3>Weather</h3>
      <div className="hidden sm:flex justify-between items-center w-fit space-x-1 text-customBrownFour bg-customBrownOne rounded-xl px-2 lg:w-2/5">
        <input
          type="text"
          placeholder="Enter City Name"
          className="py-2 px-1 w-full bg-transparent placeholder:text-customBrownTwo focus:outline-none"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <GoSearch className="h-6 w-6" onClick={showWeather} />
      </div>
      <FiRefreshCw className="block sm:hidden" />
      <div className="hidden sm:flex items-center space-x-5">
        <section className="group flex items-center space-x-1 cursor-pointer">
          <AiOutlinePushpin className="transition transform duration-300 ease-linear group-hover:scale-x-125 group-hover:scale-y-125" />
          <p className="transition transform duration-150 ease-linear group-hover:scale-110">
            Pin to Start
          </p>
        </section>
        <section className="group flex items-center space-x-1 cursor-pointer">
          <FiRefreshCw className="group-hover:animate-spin" />
          <p className="transition transform duration-150 ease-linear group-hover:scale-110">
            Refresh
          </p>
        </section>
      </div>
    </nav>
  );
}

export default NavBar;
