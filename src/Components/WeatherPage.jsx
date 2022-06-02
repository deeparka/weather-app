import React, { useEffect, useState } from "react";
import { BsSun } from "react-icons/bs";
import { useLocation } from "react-router-dom";

function WeatherPage() {
    const location = useLocation();
    const { city } = location.state;
    // console.log(location);
    // const [cityLocation, setCityLocation] = useState(``);
    const [country, setCountry] = useState(``);
    const [time, setTime] = useState(``);
    const [temperatureCelsius, setTemperatureCelsius] = useState(0);
    const [temperatureFarenheit, setTemperatureFarenheit] = useState(0);
    const [weatherCondition, setWeatherCondition] = useState(``);
    const [humidity, setHumidity] = useState(0);
    const [windSpeed, setWindSpeed] = useState(0);

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
                    setHumidity(data.current.humidity);
                    setWindSpeed(data.current.wind_kph);
                });
        weather();
    }, [city]);

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
        const minutes = dt.getMinutes();
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
                <div className="city">
                    <div className="your-city">Your City</div>
                    <div className="city-name">{city}</div>
                </div>
                <div className="country">
                    <div className="your-country">Country</div>
                    <div className="country-name">{country}</div>
                </div>
                <div className="date-time">
                    <div className="time">{twelveHourTime(time)}</div>
                    <div className="day-of-week">{getDayOfWeek(time)}</div>
                    <div className="date">{getDate(time)}</div>
                </div>
                <div className="weather-temp">
                    <div className="weather-icon">
                        <BsSun />
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
                <div className="condition">{weatherCondition}</div>
                <div className="humidity">
                    <div className="humidity-text">Humidity</div>
                    <div className="humidity-percentage">{humidity}%</div>
                </div>
                <div className="wind">
                    <div className="wind-text">Wind Speed</div>
                    <div className="wind-speed">{windSpeed}Km/h</div>
                </div>
            </div>
            <div className="right"></div>
        </div>
    );
}

export default WeatherPage;
