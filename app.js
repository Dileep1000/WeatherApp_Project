// State
let currentCity = "Pretoria";
let units = "metric";

// Selectors
let city = document.querySelector(".Weather__City");
let dateTime = document.querySelector(".Weather__DateTime");
let weather = document.querySelector(".Weather__Forecast");
let weatherIcon = document.querySelector(".Weather__Icon");
let weatherTemperature = document.querySelector(".Weather__Temp");
let weatherMinMax = document.querySelector(".Weather__MinMax");
let weatherFeels = document.querySelector(".Weather__RealFeel");
let weatherHumidity = document.querySelector(".Weather__Humidity");
let weatherWind = document.querySelector(".Weather__Wind");
let weatherPressure = document.querySelector(".Weather__Pressure");

// search using the magnifying glass button
document
  .querySelector(".Weather__SearchButton")
  .addEventListener("click", (e) => {
    //Preventing the page default action
    e.preventDefault();
    let search = document.querySelector(".Weather__SearchForm").value;
    currentCity = search;
    getWeather();
  });

// search using the input
document
  .querySelector(".Weather__SearchPart")
  .addEventListener("submit", (e) => {
    let search = document.querySelector(".Weather__SearchForm").value;

    //Preventing the page default action
    e.preventDefault();

    //Changing the currentCity to the value that is type in the search bar
    currentCity = search;

    getWeather();
  });

// units
document
  .querySelector(".Weather__Unit_Celcius")
  .addEventListener("click", () => {
    if (units !== "metric") {
      // change to metric
      units = "metric";
      // get weather forecast
      getWeather();
    }
  });

document
  .querySelector(".Weather__Unit_Fahrenheit")
  .addEventListener("click", () => {
    if (units !== "imperial") {
      // change to imperial
      units = "imperial";
      // get weather forecast
      getWeather();
    }
  });

//Making a function to convert the timestamp
function convertTimeStamp(timestamp, timezone) {
  const convertTimezone = timezone / 3600; // convert seconds to hours

  const date = new Date(timestamp * 1000);

  const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    timeZone: `Etc/GMT${convertTimezone >= 0 ? "-" : "+"}${Math.abs(
      convertTimezone
    )}`,
    hour12: true,
  };
  return date.toLocaleString("en-US", options);
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
  dateTime.innerHTML = convertTimeStamp(data.dt, data.timezone);
  weather.innerHTML = `${data.weather[0].description}`;
  weatherTemperature.innerHTML = `${data.main.temp.toFixed()}&#176`;
  weatherIcon.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png" alt="" />`;
  weatherMinMax.innerHTML = `<p>Min: ${data.main.temp_min.toFixed()}&#176</p>  <p>Max: ${data.main.temp_max.toFixed()}&#176</p>`;
  weatherFeels.innerHTML = `${data.main.feels_like.toFixed()}&#176`;
  weatherHumidity.innerHTML = `${data.main.humidity}%`;
  weatherWind.innerHTML = `${data.wind.speed} m/s`;
  weatherPressure.innerHTML = `${data.main.pressure} hPa`;
}

// Corrected event listener
window.addEventListener("load", getWeather);
