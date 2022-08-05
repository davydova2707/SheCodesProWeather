// Date

function formatDate() {
  let date = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let months = [
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
    "December"
  ];
  let dateString = `${days[date.getDay()]}, ${
    months[date.getMonth()]
  } ${date.getDate()}, ${date.getFullYear()}`;
  return dateString;
}

// Forecast

function formatForecastDay(time) {
  let date = new Date(time * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let dailyForecast = response.data.daily;
  forecast = dailyForecast;
  let currentForecast = document.querySelector("#forecast");
  
  let forecastHTML = "";
  dailyForecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML + 
        `<div class="col-2">
          <strong> ${formatForecastDay(forecastDay.dt)} </strong>
          <br />
          <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt=""
          width="42" />
          <br />
          <div class="weather-forecast-temperature">
            <strong> ${Math.round(forecastDay.temp.max)}° </strong>
            / ${Math.round(forecastDay.temp.min)}°
          </div>
        </div>`;
    }
  });

  currentForecast.innerHTML = forecastHTML;

}

function getForecast(lat, lon) {
  let apiKey = "cb83cd89bebae00ada77eb1feb5129d6";
  let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(url).then(displayForecast);
}

// Location

function showCurrentLocationTemp(response) {
  changeCurrentTemperature(Math.round(response.data.main.temp));
  changeCurrentDescription(response.data.weather[0].description);
  changeCurrentIcon(response.data.weather[0].icon);
  changeCurrentWind(response.data.wind.speed);
  changeCurrentHumidity(response.data.main.humidity);
  let currentLocation = document.querySelector("#currentLocation");
  currentLocation.innerHTML = `<i class="fas fa-map-marker-alt"></i> ${response.data.name}`;
  getForecast(response.data.coord.lat, response.data.coord.lon);
}

function changeCurrentLocation() {
  let city = document.getElementById("enterAcity").value;
  let apiKey = "cb83cd89bebae00ada77eb1feb5129d6";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&&units=metric`;
  axios
    .get(url)
    .then(showCurrentLocationTemp)
    .catch(function (error) {
      alert("Not valid city. Try another.");
    });
}

function changeOnEnterInputEnterAcity(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("button-addon2").click();
  }
}

// Current Location

function showCurrentGeo(response) {
  let city = response.data.timezone;
  if (response.data.timezone.indexOf("/") > -1) {
    let cityArr = response.data.timezone.split("/");
    city = cityArr[1];
  }
  document.getElementById("enterAcity").value = city;
  changeCurrentLocation();
}

function getCurrentGeo(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "cb83cd89bebae00ada77eb1feb5129d6";
  let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(url).then(showCurrentGeo);
}

function changeCurrentLocationToMyGeo() {
  navigator.geolocation.getCurrentPosition(getCurrentGeo);
}

// Description

function changeCurrentDescription(tmp) {
  let currentDescriptionDigit = document.querySelector(
    "#description"
  );
  description = tmp;
  currentDescriptionDigit.innerHTML = tmp;
}

// Icon

function changeCurrentIcon(tmp) {
  let currentIconImage = document.querySelector(
    "#icon"
  );
  icon = tmp;
  currentIconImage.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${tmp}@2x.png`
  );
  currentIconImage.setAttribute("alt", description);
}

// Wind

function changeCurrentWind(tmp) {
  let currentWindDigit = document.querySelector(
    "#wind"
  );
  wind = tmp;
  currentWindDigit.innerHTML = tmp;
}

// Humidity

function changeCurrentHumidity(tmp) {
  let currentHumidityDigit = document.querySelector(
    "#humidity"
  );
  humidity = tmp;
  currentHumidityDigit.innerHTML = tmp;
}

// Temperature

function changeForecastToMetric() {
  let currentForecast = document.querySelector("#forecast");
  
  let forecastHTML = "";
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML + 
        `<div class="col-2">
          <strong> ${formatForecastDay(forecastDay.dt)} </strong>
          <br />
          <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt=""
          width="42" />
          <br />
          <div class="weather-forecast-temperature">
            <strong> ${Math.round(forecastDay.temp.max)}° </strong>
            / ${Math.round(forecastDay.temp.min)}°
          </div>
        </div>`;
    }
  });

  currentForecast.innerHTML = forecastHTML;

}

function changeForecastToImperial() {
  let currentForecast = document.querySelector("#forecast");
  
  let forecastHTML = "";
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML + 
        `<div class="col-2">
          <strong> ${formatForecastDay(forecastDay.dt)} </strong>
          <br />
          <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt=""
          width="42" />
          <br />
          <div class="weather-forecast-temperature">
            <strong> ${Math.round((forecastDay.temp.max * 9) / 5 + 32)}° </strong>
            / ${Math.round((forecastDay.temp.min * 9) / 5 + 32)}°
          </div>
        </div>`;
    }
  });

  currentForecast.innerHTML = forecastHTML;

}

function changeCurrentTemperature(tmp) {
  let currentTemperatureDigit = document.querySelector(
    "#currentTemperatureDigit"
  );
  temp = tmp;
  tempSysMetric = true;
  currentTemperatureDigit.innerHTML = tmp;
}

function changeCurrentTemperatureToMetric() {
  if (!tempSysMetric) {
    let currentTemperatureDigit = document.querySelector(
      "#currentTemperatureDigit"
    );
    currentTemperatureDigit.innerHTML = temp;
    tempSysMetric = true;
  }
  changeForecastToMetric();
}

function changeCurrentTemperatureToImperial() {
  if (tempSysMetric) {
    let currentTemperatureDigit = document.querySelector(
      "#currentTemperatureDigit"
    );
    currentTemperatureDigit.innerHTML =
    Math.round((currentTemperatureDigit.innerHTML * 9) / 5 + 32);
    tempSysMetric = false;
    changeForecastToImperial();
  }
}

// Main

let currentDay = document.querySelector("#currentDay");
currentDay.innerHTML = formatDate();


document.querySelector("#currentLocation").innerHTML = `<i class="fas fa-map-marker-alt"></i> Kyiv`;

let buttonAddon2 = document.querySelector("#button-addon2");
buttonAddon2.addEventListener("click", changeCurrentLocation);
let inputEnterAcity = document.querySelector("#enterAcity");
inputEnterAcity.addEventListener("keypress", changeOnEnterInputEnterAcity);


let buttonGeo = document.querySelector("#buttongeo");
buttonGeo.addEventListener("click", changeCurrentLocationToMyGeo);


let temp = 26;
let forecast;
document.querySelector("#currentTemperatureDigit").innerHTML = temp;
let tempSysMetric = true;


let description = "scattered clouds";
document.querySelector("#description").innerHTML = description;


let icon = "03d";
document.querySelector("#icon").setAttribute("src", `http://openweathermap.org/img/wn/${icon}@2x.png`);
document.querySelector("#icon").setAttribute("alt", description);


let wind = 2;
document.querySelector("#wind").innerHTML = wind;


let humidity = 40;
document.querySelector("#humidity").innerHTML = humidity;


let metric = document.querySelector("#metric");
metric.addEventListener("click", changeCurrentTemperatureToMetric);
let imperial = document.querySelector("#imperial");
imperial.addEventListener("click", changeCurrentTemperatureToImperial);


let event = new Event("click");
buttongeo.dispatchEvent(event);
