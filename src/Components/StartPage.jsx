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
                    <form action="" onSubmit={showWeather}>
                        <button type="submit" className="submit-btn">
                            Search
                        </button>
                    </form>
                </div>
            </div>
        </center>
    );
}

export default StartPage;
