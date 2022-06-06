import React, { useEffect, useState } from "react";
import { GoSearch } from "react-icons/go";
import {
    BsSun,
    BsFillArrowUpCircleFill,
    BsFillArrowDownCircleFill,
} from "react-icons/bs";
import { BiTargetLock } from "react-icons/bi";
import { useLocation, useNavigate } from "react-router-dom";

function WeatherPage() {
    const location = useLocation();
    // console.log(location);
    const { city } = location.state;

    const navigate = useNavigate();

    const [cityName, setCityName] = useState(``);

    const [country, setCountry] = useState(``);
    const [time, setTime] = useState(``);
    const [temperatureCelsius, setTemperatureCelsius] = useState(0);
    const [temperatureFarenheit, setTemperatureFarenheit] = useState(0);
    const [weatherCondition, setWeatherCondition] = useState(``);
    const [uvIndex, setUVIndex] = useState(0);
    const [sunRise, setSunRise] = useState(``);
    const [sunSet, setSunSet] = useState(``);
    const [humidity, setHumidity] = useState(0);
    const [windSpeed, setWindSpeed] = useState(0);
    const [windDirection, setWindDirection] = useState(``);
    const [visibility, setVisibility] = useState(0);
    const [airQuality, setAirQuality] = useState(0);

    useEffect(() => {
        const weather = async () =>
            await fetch(
                `https://api.weatherapi.com/v1/forecast.json?key=9999ea3e3ce6458d813170909212210&q=${city}&days=3&aqi=yes&alerts=yes`
            )
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    setCountry(data.location.country);
                    setTime(data.location.localtime_epoch);
                    setTemperatureCelsius(data.current.temp_c);
                    setTemperatureFarenheit(data.current.temp_f);
                    setWeatherCondition(data.current.condition.text);
                    setUVIndex(data.current.uv);
                    setHumidity(data.current.humidity);
                    setSunRise(data.forecast.forecastday[0].astro.sunrise);
                    setSunSet(data.forecast.forecastday[0].astro.sunset);
                    setWindSpeed(data.current.wind_kph);
                    setWindDirection(data.current.wind_dir);
                    setVisibility(data.current.vis_km);
                    setAirQuality(data.current.air_quality.co);
                });
        weather();
    }, [city]);

    const showWeather = (e) => {
        e.preventDefault();
        navigate("/weather", {
            state: {
                city: cityName,
            },
        });
    };

    const getStandardTimes = (time) => {
        const utcSeconds = time;
        const standardTime = new Date(0); // The 0 there is the key, which sets the date to the epoch
        standardTime.setUTCSeconds(utcSeconds);
        // console.log(standardTime);
        return standardTime;
    };

    const twelveHourTime = (time) => {
        const dt = getStandardTimes(time);
        let hours = dt.getHours(); // gives the value in 24 hours format
        const AmOrPm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12 || 12;
        let minutes = dt.getMinutes();
        if (minutes.count === 1) {
            minutes = "0" + minutes;
        }
        const finalTime = hours + ":" + minutes + " " + AmOrPm;
        // console.log(finalTime);
        return finalTime;
    };

    const getDayOfWeek = (time) => {
        var timestamp = time;
        var a = new Date(timestamp * 1000);
        var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        var dayOfWeek = days[a.getDay()];
        // console.log(dayOfWeek);
        return dayOfWeek;
    };

    const getDate = (time) => {
        const dt = getStandardTimes(time);
        // console.log(dt);
        const day = dt.getDate();
        // console.log(day);

        const monthArray = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ];

        let month = monthArray[dt.getMonth()];
        // console.log(month);

        const year = dt.getFullYear();
        // console.log(year);

        return month + " " + day + ", " + year;
    };

    return (
        <div className="weather-container">
            <div className="left">
                <div className="input-city-name-btn">
                    <div className="input-city-name">
                        <GoSearch className="search-icon" />
                        <input
                            type="text"
                            placeholder="Enter City Name"
                            className="city"
                            value={cityName}
                            onChange={(e) => setCityName(e.target.value)}
                        />
                    </div>
                    <div className="btn-class">
                        <form action="" onSubmit={showWeather}>
                            <button type="submit" className="submit-btn-class">
                                <BiTargetLock className="target" />
                            </button>
                        </form>
                    </div>
                </div>
                <div className="weather-temp">
                    <div className="weather-icon">
                        <BsSun className="icon" />
                    </div>
                    <div className="temperature">
                        <div className="temperature-celsius">
                            {temperatureCelsius}°C
                        </div>
                        <div> / </div>
                        <div className="temperature-farenheit">
                            {temperatureFarenheit}°F
                        </div>
                    </div>
                </div>
                <div className="week-time">
                    <div className="day-of-week">{getDayOfWeek(time)},</div>
                    <div className="time">{twelveHourTime(time)}</div>
                </div>
                <div className="date">{getDate(time)}</div>
                <div className="city-text-name">
                    <div className="city-text">City</div>
                    <div>:</div>
                    <div className="city-name">{city}</div>
                </div>
                <div className="country">
                    <div className="your-country">Country:</div>
                    <div className="country-name">{country}</div>
                </div>

                <div className="condition">{weatherCondition}</div>
            </div>
            <div className="right">
                <div className="today-status">Today's Status</div>
                <div className="uv">
                    <div className="uv-index">UV Index</div>
                    <div className="uv-value">{uvIndex}</div>
                </div>
                <div className="wind">
                    <div className="wind-text">Wind Speed</div>
                    <div className="wind-speed">{windSpeed}Km/h</div>
                    <div className="wind-direction">{windDirection}</div>
                </div>
                <div className="sunrise-sunset">
                    <div className="sunrise-sunset-text">Sunrise & Sunset</div>
                    <div className="sunrise-up">
                        <div className="up">
                            <BsFillArrowUpCircleFill />
                        </div>
                        <div className="sunrise">{sunRise}</div>
                    </div>
                    <div className="sunset-down">
                        <div className="down">
                            <BsFillArrowDownCircleFill />
                            <div className="sunset">{sunSet}</div>
                        </div>
                    </div>
                </div>
                <div className="humidity">
                    <div className="humidity-text">Humidity</div>
                    <div className="humidity-percentage">{humidity}%</div>
                    <div className="humdity-description">Bad</div>
                </div>
                <div className="visibility">
                    <div className="visibility-text">Visibility</div>
                    <div className="visible-km">{visibility}Km</div>
                    <div className="visibility-description">Average</div>
                </div>
                <div className="air-quality">
                    <div className="air-quality-text">Air Quality</div>
                    <div className="air">{Math.round(airQuality)}</div>
                    <div className="air-condition">Bad</div>
                </div>
            </div>
        </div>
    );
}

export default WeatherPage;
