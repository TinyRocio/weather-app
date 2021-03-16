function formatDate(date) {

  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}


function displayWeatherCondition(response){
  console.log(response)
  document.querySelector("#city").innerHTML=response.data.name;
  document.querySelector("#current-temperature").innerHTML=Math.round(response.data.main.temp);
  document.querySelector("#current-description").innerHTML=(response.data.weather[0].description);
  document.querySelector("#icon").setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  document.querySelector("#icon").setAttribute("alt", response.data.weather[0].description);
}

function searchCity(city){
  let apiKey="f194b8120b53f1580637d74722bb6a8f"
  let apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event){
  event.preventDefault();
  let city=document.querySelector("#search-city-input").value;
  searchCity(city)
}

function searchLocation(position) {
  let apiKey="f194b8120b53f1580637d74722bb6a8f"
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`;
  
  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event){
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation)
}


function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 66;
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 19;
}

let dateElement = document.querySelector("#today");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

let currentLocationButton=document.querySelector("#current-location");
currentLocationButton.addEventListener("click", getCurrentLocation);

let searchForm = document.querySelector("#search-engine-form");
searchForm.addEventListener("submit", handleSubmit );

searchCity("New York");