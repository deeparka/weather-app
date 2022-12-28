import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoSearch } from "react-icons/go";

function StartPage() {
  const [city, setCity] = useState("");
  const navigate = useNavigate();

  // console.log(city);
  const showWeather = (e) => {
    e.preventDefault();
    navigate("/weather", {
      state: {
        city: city,
      },
    });
  };
  return (
    <div className="flex flex-col flex-wrap items-center py-300px mx-8 md:mx-14 lg:mx-100px ">
      <h1 className="mb-10 text-center tracking-widest transition duration-300 transform ease-in-out hover:scale-150 hover:tracking-widest">Welcome to Weather Application</h1>
      <div className="group flex justify-start items-center space-x-1 bg-customBrownThree text-white rounded-xl px-2 w-9/12 lg:w-2/5">
        <GoSearch className="h-6 w-6 hidden sm:block transition duration-150 transform ease-in group-hover:scale-125 group-hover:h-8 group-hover:-translate-y-1" />
        <input
          type="text"
          placeholder="Enter City Name"
          className="py-2 px-1 bg-transparent text-sm sm:text-2xl placeholder:text-customBrownTwo focus:outline-none"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </div>

      <form onSubmit={showWeather} className="my-16">
        <button className="bg-customBrownFour py-1 sm:py-2 px-5 sm:px-7 text-white rounded-xl shadow-md shadow-[#9d6d33] transition duration-300 transform ease-in-out hover:scale-125 hover:tracking-wider hover:-translate-y-2 hover:bg-[#d0a066]">
          Search
        </button>
      </form>
    </div>
  );
}

export default StartPage;
