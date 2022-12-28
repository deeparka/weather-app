const getStandardTimes = (time) => {
  const utcSeconds = time;
  const standardTime = new Date(0); // The 0 there is the key, which sets the date to the epoch
  standardTime.setUTCSeconds(utcSeconds);
  // console.log(standardTime);
  return standardTime;
};

export const twelveHourTime = (time) => {
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

export const getDayOfWeek = (time) => {
  var timestamp = time;
  var a = new Date(timestamp * 1000);
  var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  var dayOfWeek = days[a.getDay()];
  // console.log(dayOfWeek);
  return dayOfWeek;
};

export const getDate = (time) => {
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

export const roundFigure = (element) => {
  element = Math.round(element);
  if (element < 10) return "0" + element.toString();
  return element;
};

export const visibilityDescription = (visibility) => {
  if (visibility < 0) {
    return `Very Low`;
  } else if (visibility > 0 && visibility < 10) {
    return `Low`;
  } else if (visibility >= 10 && visibility < 20) {
    return `Average`;
  } else {
    return `Good`;
  }
};

export const humidityDescription = (humidity) => {
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

export const airQualityDescription = (airQuality) => {
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
