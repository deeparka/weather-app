import React from "react";
import { FiMenu } from "react-icons/fi";
import { IoTimerOutline } from "react-icons/io5";
import { RiCloudWindyLine } from "react-icons/ri";
import { SiEthiopianairlines } from "react-icons/si";
import { TiWeatherCloudy } from "react-icons/ti";

function SideBar() {
  return (
    <div className="bg-customBrownThree min-h-screen w-fit px-5 py-9 space-y-9">
      <FiMenu className="h-6 w-6 opacity-50" />
      <TiWeatherCloudy className="h-6 w-6" />
      <IoTimerOutline className="h-6 w-6 opacity-50" />
      <RiCloudWindyLine className="h-6 w-6 opacity-50" />
      <SiEthiopianairlines className="h-6 w-6 opacity-50" />
    </div>
  );
}

export default SideBar;
