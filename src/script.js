function formatDate(timestamp) {

  let date=new Date(timestamp)

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

  
  return `Last Updated:
  ${day} ${formatHours(timestamp)}`;
}

function formatHours(timestamp){
  let date=new Date(timestamp)
  
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`
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
}

function displayWeeklyForecast(response){
  let forecastElement=document.querySelector("#forecast");
  forecastElement.innerHTML=null;
  let forecast=null;

  for (let index=0; index <6; index++){
    forecast=response.data.list[index];
    forecastElement.innerHTML+=`
            <div class="col-4">
              <h3>${formatHours(forecast.dt * 1000)}</h3>
              <img
                src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png"
              />
              <div class="weekly-forecast-temperature">
                <strong>${Math.round(forecast.main.temp)}°</strong>
                </br>
                <small>Feels Like: ${Math.round(forecast.main.feels_like)}° </small>
                </br>
              </div>
            </div>
            `
  }

}

function searchCity(city){
  let apiKey="f194b8120b53f1580637d74722bb6a8f"
  let apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  
  axios.get(apiUrl).then(displayWeatherCondition);

  apiUrl=`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayWeeklyForecast);
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