// State
let currentCity = "Pretoria";
let units = "metric";

// Selectors
let city = document.querySelector(".Weather__City");
let dateTime = document.querySelector(".Weather__DateTime");

//Making a function to convert the timestamp
function convertTimestamp(timestamp) {
  let date = new Date(timestamp * 1000);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let Month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let dateNumber = date.getDay();
  let day = days[date.getDay()];
  let month = Month[date.getMonth()];
  let year = date.getFullYear();
  return `${day} ${dateNumber} ${month} ${year}, ${hours}:${minutes}`;
}

// Converting country code to full country name
function convertCountryCode(country) {
  let regionNames = new Intl.DisplayNames(["en"], { type: "region" });
  return regionNames.of(country);
}

async function getWeather() {
  const API_KEY = "10a4d18c61d05425e1651f1eee94f46e";

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&appid=${API_KEY}&units=${units}`
  );
  const data = await response.json();
  console.log(data);
  city.innerHTML = `${data.name}, ${convertCountryCode(data.sys.country)}`;
  dateTime.innerHTML = convertTimestamp(data.dt);
}

// Corrected event listener
window.addEventListener("load", getWeather());
