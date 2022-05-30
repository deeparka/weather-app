import React, { useState } from "react";
import { GoSearch } from "react-icons/go";

function StartPage() {
    const [city, setCity] = useState("");
    // console.log(city);
    const showWeather = () => {};
    return (
        <center>
            <div className="wrapper">
                <div className="welcome">Welcome to Weather App</div>
                <div className="input-city">
                    <GoSearch className="search-icon" />
                    <input
                        type="text"
                        placeholder="Enter City Name"
                        className="city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                </div>
                <div className="btn">
                    <button type="submit" className="submit-btn">
                        Search
                    </button>
                </div>
            </div>
        </center>
    );
}

export default StartPage;
