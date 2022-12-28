import React, { useEffect, useState } from "react";
import { BsSunriseFill, BsSunsetFill } from "react-icons/bs";
import { WiHumidity } from "react-icons/wi";
import { Link, useLocation } from "react-router-dom";
import NavBar from "../lib/NavBar";
import SideBar from "../lib/SideBar";
import { getDate, getDayOfWeek, twelveHourTime } from "../lib/helper";

function WeatherPage() {
  const location = useLocation();
  // console.log(location);
  const { city } = location.state;

  const [error, setError] = useState(null);
  const [isError, setIsError] = useState(false);

  const [stateName, setStateName] = useState(``);
  const [country, setCountry] = useState(``);
  const [time, setTime] = useState(``);
  const [maxTemperature, setMaxTemperature] = useState(0);
  const [minTemperature, setMinTemperature] = useState(0);
  const [weatherCondition, setWeatherCondition] = useState(``);
  const [weatherConditionIcon, setWeatherConditionIcon] = useState(``);
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

  const [hourlyEpoch, setHourlyEpoch] = useState([]);
  const [hourlyTemperature, setHourlyTemperature] = useState([]);
  let tempCount = 0;

  const [hourlyWeatherCondition, setHourlyWeatherCondition] = useState([]);
  let weatherConditionCount = 0;

  const [hourlyWeatherConditionIcon, setHourlyWeatherConditionIcon] = useState(
    []
  );
  let weatherConditionIconCount = 0;

  useEffect(() => {
    const hourlyEpochArray = [];
    const hourlyTemperatureArray = [];
    const hourlyWeatherConditionArray = [];
    const hourlyWeatherConditionIconArray = [];

    const weather = async () =>
      await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_API_KEY}&q=${city}&days=3&aqi=yes&alerts=yes`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setStateName(data.location.region);
          setCountry(data.location.country);

          // Day 1 (current day)
          setTime(data.location.localtime_epoch);
          setMaxTemperature(data.forecast.forecastday[0].day.maxtemp_c);
          setMinTemperature(data.forecast.forecastday[0].day.mintemp_c);
          setWeatherCondition(data.current.condition.text);
          setWeatherConditionIcon(data.current.condition.icon);
          setUVIndex(data.current.uv);
          setHumidity(data.current.humidity);
          setSunRise(data.forecast.forecastday[0].astro.sunrise);
          setSunSet(data.forecast.forecastday[0].astro.sunset);
          setWindSpeed(data.current.wind_kph);
          setWindDirection(data.current.wind_dir);
          setVisibility(data.current.vis_km);
          setAirQuality(data.current.air_quality.co);

          // Day 2
          setSecondDayTime(data.forecast.forecastday[1].date_epoch);
          setSecondDayTemperature(data.forecast.forecastday[1].day.avgtemp_c);
          setSecondDayCondition(
            data.forecast.forecastday[1].day.condition.text
          );
          setSecondDayRain(
            data.forecast.forecastday[1].day.daily_chance_of_rain
          );

          // Day 3
          setThirdDayTime(data.forecast.forecastday[2].date_epoch);
          setThirdDayTemperature(data.forecast.forecastday[2].day.avgtemp_c);
          setThirdDayCondition(data.forecast.forecastday[2].day.condition.text);
          setThirdDayRain(
            data.forecast.forecastday[2].day.daily_chance_of_rain
          );

          // 24 hours time epoch
          data.forecast.forecastday[0].hour.map((hour) =>
            hourlyEpochArray.push(hour["time_epoch"])
          );
          setHourlyEpoch(hourlyEpochArray);

          // 24 hours temperature
          data.forecast.forecastday[0].hour.map((hour) =>
            hourlyTemperatureArray.push(hour["temp_c"])
          );
          setHourlyTemperature(hourlyTemperatureArray);

          // 24 hours weather condition
          data.forecast.forecastday[0].hour.map((hour) =>
            hourlyWeatherConditionArray.push(hour["condition"].text)
          );
          setHourlyWeatherCondition(hourlyWeatherConditionArray);

          // 24 hours weather condition icon
          data.forecast.forecastday[0].hour.map((hour) =>
            hourlyWeatherConditionIconArray.push(hour["condition"].icon)
          );
          setHourlyWeatherConditionIcon(hourlyWeatherConditionIconArray);
        })
        .catch((err) => {
          // console.log(err.message);
          setError(err.message);
          setIsError(true);
        });
    weather();
  }, [city]);

  return (
    <div className="text-white">
      {!isError && (
        <div>
          {/* NavBar */}
          <NavBar />
          {/* SideBar & Weather Details */}
          <div className="flex">
            {/* SideBar */}
            <SideBar />
            {/* Weather Details */}
            <main className="bg-customBrownOne pt-4 pb-12 mx-8 md:mx-14 lg:mx-[80px]">
              <div className="text-customBrownFour">
                <h2 className="text-center my-6">
                  {city}, {stateName}, {country}
                </h2>
                <h4 className="text-center mb-12">
                  {getDayOfWeek(time)} {getDate(time)} {twelveHourTime(time)}
                </h4>
              </div>
              <section className="flex flex-wrap justify-start items-start space-x-8">
                {/* Today Weather Details */}
                <div className="text-customBrownFour">
                  <div className="text-lg bg-customBrownTwo py-5 px-8 w-fit rounded-xl shadow-lg space-y-6">
                    <section className="flex flex-col items-center">
                      <img
                        src={weatherConditionIcon}
                        alt=""
                        className="h-20 w-20"
                      />
                      <h3 className="">{weatherCondition}</h3>
                    </section>
                    <section className="flex justify-center items-center space-x-5">
                      <div className="flex flex-col items-center">
                        <p className="">Min</p>
                        <p className="">{minTemperature}°C</p>
                      </div>
                      <div className="flex flex-col items-center">
                        <p className="">Max</p>
                        <p className="">{maxTemperature}°C</p>
                      </div>
                    </section>
                    <section className="flex justify-start items-center space-x-5 ">
                      <div className="flex flex-col items-center">
                        <BsSunriseFill className="h-6 w-6" />
                        <p className="">{sunRise}</p>
                      </div>
                      <div className="flex flex-col items-center">
                        <BsSunsetFill className="h-6 w-6" />
                        <p className="">{sunSet}</p>
                      </div>
                    </section>
                    <section className="flex justify-center items-center space-x-2">
                      <p className="font-bold">UV Index</p>
                      <p className="text-2xl">{uvIndex}</p>
                    </section>
                    <section className="flex justify-center items-center space-x-2">
                      <WiHumidity className="h-6 w-6" />
                      <p className="">{humidity}</p>
                    </section>
                    <section className="flex justify-center items-start space-x-2">
                      <p className="font-bold">Wind Speed</p>
                      <p className="">{windSpeed}</p>
                    </section>
                    <section className="flex justify-center items-center space-x-2">
                      <p className="font-bold">Wind Direction</p>
                      <p className="">{windDirection}</p>
                    </section>
                    <section className="flex justify-center items-center space-x-2">
                      <p className="font-bold">Visibility</p>
                      <p className="">{visibility}</p>
                    </section>
                    <section className="flex justify-center items-center space-x-2">
                      <p className="font-bold">Air Quality</p>
                      <p className="">{Math.round(airQuality)}</p>
                    </section>
                  </div>
                </div>
                {/* 3 days forecast */}
                <div className="py-7 flex flex-col space-y-10">
                  <div className="text-customBrownFour pt-8">
                    <h2 className="mb-3">Forecast</h2>
                    <section className="flex flex-wrap justify-start items-start space-x-28">
                      {/* Day 1 */}
                      <div className="bg-customBrownTwo px-8 py-5 w-fit rounded-xl shadow-lg">
                        <h3 className="">
                          {getDayOfWeek(time)} {getDate(time)}
                        </h3>
                        <h5 className="text-center">{weatherCondition}</h5>
                        <p className="text-center">{maxTemperature}°C</p>
                        <p className="text-center">Rain: {secondDayRain}</p>
                      </div>
                      {/* Day 2 */}
                      <div className="bg-customBrownTwo px-8 py-5 w-fit rounded-xl shadow-lg">
                        <h3 className="">
                          {getDayOfWeek(secondDayTime)} {getDate(secondDayTime)}
                        </h3>
                        <h5 className="text-center">{secondDayCondition}</h5>
                        <p className="text-center">{secondDayTemperature}°C</p>
                        <p className="text-center">Rain: {secondDayRain}</p>
                      </div>
                      {/* Day 3 */}
                      <div className="bg-customBrownTwo px-8 py-5 w-fit rounded-xl shadow-lg">
                        <h3 className="">
                          {getDayOfWeek(thirdDayTime)} {getDate(thirdDayTime)}
                        </h3>
                        <h5 className="text-center">{thirdDayCondition}</h5>
                        <p className="text-center">{thirdDayTemperature}°C</p>
                        <p className="text-center">Rain: {thirdDayRain}</p>
                      </div>
                    </section>
                  </div>
                  {/* Hourly */}
                  <div className="text-customBrownFour pt-8">
                    <h2 className="mb-3">Hourly</h2>
                    <section className="max-w-[980px] flex justify-start items-start space-x-3 overflow-x-scroll scrollbar-hide py-4">
                      {hourlyEpoch.map((epoch) => (
                        <div className="bg-customBrownTwo px-8 py-5 w-auto rounded-xl shadow-lg">
                          <p key={epoch} className="text-center">
                            {twelveHourTime(epoch)}
                          </p>
                          <p className="text-center">
                            {hourlyTemperature[tempCount++]}
                          </p>
                          <img
                            src={
                              hourlyWeatherConditionIcon[
                                weatherConditionIconCount++
                              ]
                            }
                            alt="icon"
                          />
                          <p className="text-center">
                            {hourlyWeatherCondition[weatherConditionCount++]}
                          </p>
                        </div>
                      ))}
                    </section>
                  </div>
                </div>
              </section>
            </main>
          </div>
        </div>
      )}
      {isError && (
        <div className="text-center text-customBrownFour space-y-12 pt-[200px]">
          <h1>404 Error</h1>
          <h2>{error}</h2>
          <h3>There doesn't exist a city named "{city}"</h3>
          <h4>Please search a valid city</h4>
          <Link to="/" className="text-lg underline">
            Go Back to Search
          </Link>
        </div>
      )}
    </div>
  );
}

export default WeatherPage;

// {isError && (
//   <div className="error">
//       <div className="err">404 Error</div>
//       <div className="error-message">{error}</div>
//       <div className="wrong-location">
//           There doesn't exist a city named "{city || cityName}"
//       </div>
//       <div className="try-again">Please search a valid city</div>
//       <Link to="/" className="go-back-search">
//           Go Back to Search
//       </Link>
//   </div>
// )}
