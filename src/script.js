function formatDate(timestamp) {

  let date=new Date(timestamp)

  let months=[
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
  ]

  let month= months[date.getMonth()]

  let days=[
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ]
  
  let day =days[date.getDay()];
  
  let number =date.getDate();
  
  let year = date.getFullYear()
  
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  
  return `Last Updated:
  ${day} ${month}, ${number}, ${year} ${hours}:${minutes}`;
}

function formatDay(timestamp){
  let date= new Date(timestamp * 1000);

  let day =date.getDay();
  let days=[
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
  ];

  return days[day]
}

function displayWeeklyForecast(response){
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML=`<div class="row">`;

  forecast.forEach(function(forecastDay, index){
    if (index < 6 ){

      forecastHTML = 
      forecastHTML + 
      ` <div class="col-4">
      <div class="weekly-forecast-day"> ${formatDay(forecastDay.dt)} </div>
      <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt="" />
      <span class="max-min"> Max / Min</span>
      <div class="weekly-forecast-temp">
      <span class="weekly-max-temp"
      >${Math.round(forecastDay.temp.max)}°/
      </span>
      <span class="weekly-min-temp">
      ${Math.round(forecastDay.temp.min)}°
      </span>
      </div>
      </div>
      `;
    }
  })
forecastHTML = forecastHTML + `</div>`
forecastElement.innerHTML = forecastHTML;
}

function getforecast(coordinates){
let apiKey="f194b8120b53f1580637d74722bb6a8f"
let apiUrl=`https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`
axios.get(apiUrl).then(displayWeeklyForecast)
}

function displayWeatherCondition(response){
  let cityElement=document.querySelector("#city");
  let currentTemperatureElement=document.querySelector("#current-temperature");
  let currentDescriptionElement=document.querySelector("#current-description")
  let iconElement=document.querySelector("#icon");
  let dateElement=document.querySelector("#today");

  fahrenheitTemperature=response.data.main.temp;

  cityElement.innerHTML=response.data.name;
  currentTemperatureElement.innerHTML=Math.round(response.data.main.temp);
  currentDescriptionElement.innerHTML=(response.data.weather[0].description);
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  iconElement.setAttribute("alt", response.data.weather[0].description);
  dateElement.innerHTML= formatDate(response.data.dt * 1000);

  getforecast(response.data.coord);
}

function searchCity(city){
  let apiKey="f194b8120b53f1580637d74722bb6a8f"
  let apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event){
  event.preventDefault();
  let city=document.querySelector("#search-city-input");
  searchCity(city.value)
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

function displayFahrenheitTemperature(event){
  event.preventDefault();
  let temperatureElement =document.querySelector("#current-temperature");
  temperatureElement.innerHTML=Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event){
  event.preventDefault();
  let temperatureElement=document.querySelector("#current-temperature");
  let celsiusTemperature=(5/9) * (fahrenheitTemperature - 32)
  temperatureElement.innerHTML=Math.round(celsiusTemperature);
}

let fahrenheitTemperature = null;

let currentLocationButton=document.querySelector("#current-location");
currentLocationButton.addEventListener("click", getCurrentLocation);

let searchForm = document.querySelector("#search-engine-form");
searchForm.addEventListener("submit", handleSubmit );

let fahrenheitLink=document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink=document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

searchCity("New York");