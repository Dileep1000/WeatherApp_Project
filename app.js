// State
let currentCity = "Pretoria";
let units = "metric";

// Selectors
let city = document.querySelector(".Weather__City");

// Converting country code to full name
function getWeather() {
  const API_KEY = "10a4d18c61d05425e1651f1eee94f46e";

  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&appid=${API_KEY}&units=${units}`
  )
    .then((response) => response.json())
    .then((data) => {
      city.innerHTML = `${data.name}, ${data.sys.country}`;
    });
}

// Corrected event listener
window.addEventListener("load", getWeather());
