import React from "react";
import { useLocation } from "react-router-dom";

function WeatherPage() {
    const location = useLocation();
    const { city } = location.state;
    // console.log(location);
    return (
        <div>
            <h2>{city}</h2>
        </div>
    );
}

export default WeatherPage;
