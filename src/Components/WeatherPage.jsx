import React, { useEffect, useState } from "react";
import { GoSearch } from "react-icons/go";
import { BsCloudRainHeavy, BsCloudRain } from "react-icons/bs";
import {
    WiDaySunny,
    WiSunset,
    WiSunrise,
    WiCloud,
    WiDayCloudy,
    WiNightClear,
    WiCloudy,
    WiDayHail,
    WiDaySnowWind,
    WiDaySleet,
    WiLightning,
    WiSnowWind,
    WiSnowflakeCold,
    WiDayRainMix,
    WiSleet,
    WiNightAltRainMix,
    WiNightSnowWind,
    WiNightSleet,
    WiNightCloudy,
    WiNightHail,
    WiNightAltSnow,
    WiDaySnow,
    WiShowers,
    WiNightStormShowers,
    WiDayStormShowers,
    WiDaySnowThunderstorm,
    WiNightSnowThunderstorm,
    WiRainMix,
    WiSprinkle,
    WiRain,
} from "react-icons/wi";
import { BiTargetLock, BiCloudLightRain } from "react-icons/bi";
import { GiWindSlap, GiFog } from "react-icons/gi";
import { RiMistFill } from "react-icons/ri";
import { useLocation, useNavigate } from "react-router-dom";

function WeatherPage() {
    const location = useLocation();
    // console.log(location);
    const { city } = location.state;

    const navigate = useNavigate();

    const [cityName, setCityName] = useState(``);

    const [stateName, setStateName] = useState(``);
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

    const [secondDayTime, setSecondDayTime] = useState(``);
    const [secondDayTemperature, setSecondDayTemperature] = useState(0);
    const [secondDayCondition, setSecondDayCondition] = useState(``);
    const [secondDayRain, setSecondDayRain] = useState(0);
    const [thirdDayTime, setThirdDayTime] = useState(``);
    const [thirdDayTemperature, setThirdDayTemperature] = useState(0);
    const [thirdDayCondition, setThirdDayCondition] = useState(``);
    const [thirdDayRain, setThirdDayRain] = useState(0);

    const [isDay, setIsDay] = useState(0);

    useEffect(() => {
        const weather = async () =>
            await fetch(
                `https://api.weatherapi.com/v1/forecast.json?key=9999ea3e3ce6458d813170909212210&q=${city}&days=3&aqi=yes&alerts=yes`
            )
                .then((response) => response.json())
                .then((data) => {
                    // console.log(data);
                    setStateName(data.location.region);
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
                    setSecondDayTime(data.forecast.forecastday[1].date_epoch);
                    setSecondDayTemperature(
                        data.forecast.forecastday[1].day.avgtemp_c
                    );
                    setSecondDayCondition(
                        data.forecast.forecastday[1].day.condition.text
                    );
                    setSecondDayRain(
                        data.forecast.forecastday[1].day.daily_chance_of_rain
                    );
                    setThirdDayTime(data.forecast.forecastday[2].date_epoch);
                    setThirdDayTemperature(
                        data.forecast.forecastday[2].day.avgtemp_c
                    );
                    setThirdDayCondition(
                        data.forecast.forecastday[2].day.condition.text
                    );
                    setThirdDayRain(
                        data.forecast.forecastday[2].day.daily_chance_of_rain
                    );
                    setIsDay(data.current.is_day);
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
        let minutes = dt.getMinutes().toString();
        if (minutes.length === 1) {
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

    const roundFigure = (element) => {
        element = Math.round(element);
        if (element < 10) return "0" + element.toString();
        return element;
    };

    const weatherLogo = (condition, className) => {
        // eslint-disable-next-line default-case
        switch (condition) {
            case "Sunny":
                return <WiDaySunny className={className} />;
            case "Clear":
                return <WiNightClear className={className} />;
            case isDay === 0 && "Partly cloudy":
                return <WiNightCloudy className={className} />;
            case "Partly cloudy":
                return <WiDayCloudy className={className} />;
            case "Cloudy":
                return <WiCloud className={className} />;
            case "Overcast":
                return <WiCloudy className={className} />;
            case "Mist":
                return <RiMistFill className={className} />;
            case isDay === 0 && "Patchy rain possible":
                return <WiNightHail className={className} />;
            case "Patchy rain possible":
                return <WiDayHail className={className} />;
            case isDay === 0 && "Patchy snow possible":
                return <WiNightSnowWind className={className} />;
            case "Patchy snow possible":
                return <WiDaySnowWind className={className} />;
            case isDay === 0 &&
                ("Patchy sleet possible" ||
                    "Light sleet showers" ||
                    "Moderate or heavy sleet showers"):
                return <WiNightSleet className={className} />;
            case "Patchy sleet possible" ||
                "Light sleet showers" ||
                "Moderate or heavy sleet showers":
                return <WiDaySleet className={className} />;
            case "Thundery outbreaks possible":
                return <WiLightning className={className} />;
            case "Blowing snow":
                return <WiSnowWind className={className} />;
            case "Blizzard" ||
                "Ice pellets" ||
                "Moderate or heavy showers of ice pellets" ||
                "Light showers of ice pellets":
                return <WiSnowflakeCold className={className} />;
            case "Fog" || "Freezing fog":
                return <GiFog className={className} />;
            case "Light drizzle" || "Light rain":
                return <BiCloudLightRain className={className} />;
            case "Freezing drizzle" ||
                "Heavy freezing drizzle" ||
                "Patchy freezing drizzle possible":
                return <WiRainMix className={className} />;
            case isDay === 0 && ("Patchy light drizzle" || "Patchy light rain"):
                return <WiNightAltRainMix className={className} />;
            case "Patchy light drizzle" || "Patchy light rain":
                return <WiDayRainMix className={className} />;
            case "Moderate rain" || "Moderate rain at times":
                return <BsCloudRain className={className} />;
            case "Heavy rain" || "Heavy rain at times":
                return <BsCloudRainHeavy className={className} />;
            case "Light freezing rain" || "Moderate or heavy freezing rain":
                return <WiRain className={className} />;
            case "Light sleet" || "Moderate or heavy sleet":
                return <WiSleet className={className} />;
            case isDay === 0 &&
                ("Patchy light snow" ||
                    "Patchy moderate snow" ||
                    "Patchy heavy snow" ||
                    "Light snow" ||
                    "Moderate snow" ||
                    "Heavy snow"):
                return <WiNightAltSnow className={className} />;
            case "Patchy light snow" ||
                "Patchy moderate snow" ||
                "Patchy heavy snow" ||
                "Light snow" ||
                "Moderate snow" ||
                "Heavy snow":
                return <WiDaySnow className={className} />;
            case "Light rain shower" ||
                "Moderate or heavy rain shower" ||
                "Torrential rain shower":
                return <WiShowers className={className} />;
            case "Light snow showers" || "Moderate or heavy snow showers":
                return <WiSprinkle className={className} />;
            case isDay === 0 &&
                ("Patchy light rain with thunder" ||
                    "Moderate or heavy rain with thunder"):
                return <WiNightStormShowers className={className} />;
            case "Patchy light rain with thunder" ||
                "Moderate or heavy rain with thunder":
                return <WiDayStormShowers className={className} />;
            case isDay === 0 &&
                ("Patchy light snow with thunder" ||
                    "Moderate or heavy snow with thunder"):
                return <WiNightSnowThunderstorm className={className} />;
            case "Patchy light snow with thunder" ||
                "Moderate or heavy snow with thunder":
                return <WiDaySnowThunderstorm className={className} />;
        }
    };

    const humidityDescription = (humidity) => {
        if (humidity < 25) {
            return "Low";
        } else if (humidity >= 25 && humidity < 30) {
            return "Fair";
        } else if (humidity >= 30 && humidity < 60) {
            return "Good";
        } else if (humidity >= 60 && humidity < 70) {
            return "Bad";
        } else {
            return "High";
        }
    };

    const airQualityDescription = (airQuality) => {
        if (airQuality >= 0 && airQuality <= 50) {
            return "Good";
        } else if (airQuality >= 51 && airQuality <= 100) {
            return "Moderate";
        } else if (airQuality >= 101 && airQuality <= 150) {
            return `Unhealthy for Sensitive Groups`;
        } else if (airQuality >= 151 && airQuality <= 200) {
            return "Unhealthy";
        } else if (airQuality >= 201 && airQuality <= 300) {
            return "Very Unhealthy";
        } else {
            return "Hazardous";
        }
    };

    return (
        <div className="weather-container">
            <div className="left">
                <div className="input-city-name-btn">
                    <div className="input-city-name">
                        <GoSearch className="search-icon" />
                        <input
                            type="text"
                            placeholder="Enter City Name....."
                            className="city"
                            value={cityName}
                            onChange={(e) => setCityName(e.target.value)}
                        />
                    </div>
                    <div className="btn-class">
                        <form
                            action=""
                            onSubmit={showWeather}
                            className="form-btn"
                        >
                            <button type="submit" className="submit-btn-class">
                                <BiTargetLock className="target" />
                            </button>
                        </form>
                    </div>
                </div>
                <div className="weather-temp">
                    <div className="weather-icon">
                        {weatherLogo(weatherCondition, "icon")}
                    </div>

                    <div className="temperature">
                        <div className="temperature-celsius">
                            {temperatureCelsius}°C
                        </div>
                        <div className="slash"> / </div>
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
                <div className="condition">{weatherCondition}</div>
                <div className="city-state-country">
                    <div className="city-name">{city},</div>
                    <div className="state">{stateName},</div>
                    <div className="country-name">{country}</div>
                </div>
            </div>
            <div className="right">
                <div className="days-status">Upcoming Days</div>
                <div className="days-update">
                    <div className="second-day">
                        <div className="second-week-date-icon">
                            <div className="second-day-week">
                                {getDayOfWeek(secondDayTime)}
                            </div>
                            <div className="second-date">
                                {getDate(secondDayTime)}
                            </div>
                            <div className="second-day-icon">
                                {weatherLogo(
                                    secondDayCondition,
                                    "second-day-icon-bs"
                                )}
                            </div>
                        </div>
                        <div className="second-temp-condition-rain">
                            <div className="second-day-temp">
                                {secondDayTemperature}°C
                            </div>
                            <div className="second-day-condition">
                                {secondDayCondition}
                            </div>
                            <div className="second-day-rain">
                                <div className="second-rain-text">Rain:</div>
                                <div className="second-rain">
                                    {secondDayRain}%
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="third-day">
                        <div className="third-week-date-icon">
                            <div className="third-day-week">
                                {getDayOfWeek(thirdDayTime)}
                            </div>
                            <div className="third-date">
                                {getDate(thirdDayTime)}
                            </div>
                            <div className="third-day-icon">
                                {weatherLogo(
                                    thirdDayCondition,
                                    "third-day-icon-bs"
                                )}
                            </div>
                        </div>
                        <div className="third-temp-condition-rain">
                            <div className="third-day-temp">
                                {thirdDayTemperature}°C
                            </div>
                            <div className="third-day-condition">
                                {thirdDayCondition}
                            </div>
                            <div className="third-day-rain">
                                <div className="third-rain-text">Rain:</div>
                                <div className="third-rain">
                                    {thirdDayRain}%
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="today-status">Today's Status</div>
                <div className="uv-wind-sun">
                    <div className="uv">
                        <div className="uv-index">UV Index</div>
                        <div className="uv-value">{uvIndex}</div>
                    </div>
                    <div className="wind">
                        <div className="wind-text">Wind Speed</div>
                        <div className="wind-speed">
                            <div className="ws">{roundFigure(windSpeed)}</div>
                            <div className="kmh">Km/h</div>
                        </div>
                        <div className="wind-direction-icon-class">
                            <div className="wind-direction-icon">
                                <GiWindSlap className="wind-slap-icon" />
                            </div>
                            <div className="wind-direction">
                                {windDirection}
                            </div>
                        </div>
                    </div>
                    <div className="sunrise-sunset">
                        <div className="sunrise-sunset-text">
                            Sunrise & Sunset
                        </div>
                        <div className="sunrise-up">
                            <div className="up">
                                <WiSunrise className="up-arrow" />
                            </div>
                            <div className="sunrise">{sunRise}</div>
                        </div>
                        <div className="sunset-down">
                            <div className="down">
                                <WiSunset className="down-arrow" />
                            </div>
                            <div className="sunset">{sunSet}</div>
                        </div>
                    </div>
                </div>
                <div className="humidity-visibility-air">
                    <div className="humidity">
                        <div className="humidity-text">Humidity</div>
                        <div className="humidity-percentage">{humidity}%</div>
                        <div className="humidity-description">
                            {humidityDescription(humidity)}
                        </div>
                    </div>
                    <div className="visibility">
                        <div className="visibility-text">Visibility</div>
                        <div className="visible-km">
                            <div className="show-visible">
                                {roundFigure(visibility)}
                            </div>
                            <div className="km">Km</div>
                        </div>
                        <div className="visibility-description">Average</div>
                    </div>
                    <div className="air-quality">
                        <div className="air-quality-text">Air Quality</div>
                        <div className="air">{Math.round(airQuality)}</div>
                        {airQualityDescription(airQuality) === "Good" && (
                            <div className="air-condition-good">
                                {airQualityDescription(airQuality)}
                            </div>
                        )}
                        {airQualityDescription(airQuality) === "Moderate" && (
                            <div className="air-condition-moderate">
                                {airQualityDescription(airQuality)}
                            </div>
                        )}
                        {airQualityDescription(airQuality) ===
                            "Unhealthy for Sensitive Groups" && (
                            <div className="air-condition-unhealthy-group">
                                <span className="air-condition-unhealthy-group-span">
                                    {airQualityDescription(airQuality).slice(
                                        0,
                                        13
                                    )}
                                </span>
                                <br />
                                {airQualityDescription(airQuality).slice(14)}
                            </div>
                        )}
                        {airQualityDescription(airQuality) === "Unhealthy" && (
                            <div className="air-condition-unhealthy">
                                {airQualityDescription(airQuality)}
                            </div>
                        )}
                        {airQualityDescription(airQuality) ===
                            "Very Unhealthy" && (
                            <div className="air-condition-very-unhealthy">
                                {airQualityDescription(airQuality)}
                            </div>
                        )}
                        {airQualityDescription(airQuality) === "Hazardous" && (
                            <div className="air-condition-hazardous">
                                {airQualityDescription(airQuality)}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WeatherPage;
