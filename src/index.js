let now = new Date();
let currentDate = document.querySelector("#current-date");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
currentDate.innerHTML = `${day} ${hours}:${minutes}`;

function displayWeatherCondition(response) {
  console.log(response.data.name);
  document.querySelector("#country").innerHTML = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  document.querySelector("#city-temperature").innerHTML = `${temperature}`;

  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}
function search(event) {
  event.preventDefault();
  let apiKey = "9f408e8b27ceddf169ecd64d28596d83";
  let city = document.querySelector("#search-city").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherCondition);

  let searchInput = document.querySelector("#search-city");
  let country = document.querySelector("#country");
  country.innerHTML = `${searchInput.value}`;
}

let searchCity = document.querySelector("#search-form");
searchCity.addEventListener("submit", search);
let searchCityButton = document.querySelector("#search-button");
searchCityButton.addEventListener("click", search);
function showTemperature(response) {
  console.log(response.data.name.temp);
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "9f408e8b27ceddf169ecd64d28596d83";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeatherCondition);
}
function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}
let currentButton = document.querySelector("#current");
currentButton.addEventListener("click", getCurrentPosition);
