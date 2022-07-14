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

let currentDay = document.querySelector("#currentDay");
currentDay.innerHTML = formatDate();

// Location

function showCurrentLocationTemp(response) {
  changeCurrentTemperature(Math.round(response.data.main.temp));
  let currentLocation = document.querySelector("#currentLocation");
  currentLocation.innerHTML = `<i class="fas fa-map-marker-alt"></i> ${response.data.name}`;
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

let buttonAddon2 = document.querySelector("#button-addon2");
buttonAddon2.addEventListener("click", changeCurrentLocation);

// Current Location

function showCurrentGeo(response) {
  let city = response.data.timezone;
  if (response.data.timezone.indexOf("/") > -1) {
    let cityArr = response.data.timezone.split("/");
    city = cityArr[1];
  }
  document.getElementById("enterAcity").value = city;
  let currentLocation = document.querySelector("#currentLocation");
  currentLocation.innerHTML = `<i class="fas fa-map-marker-alt"></i> ${city}`;
  changeCurrentTemperature(Math.round(response.data.current.temp));
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

let buttonGeo = document.querySelector("#buttongeo");
buttonGeo.addEventListener("click", changeCurrentLocationToMyGeo);

// Temperature

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
}

function changeCurrentTemperatureToImperial() {
  if (tempSysMetric) {
    let currentTemperatureDigit = document.querySelector(
      "#currentTemperatureDigit"
    );
    currentTemperatureDigit.innerHTML =
      (currentTemperatureDigit.innerHTML * 9) / 5 + 32;
    tempSysMetric = false;
  }
}

let temp = 26;
document.querySelector("#currentTemperatureDigit").innerHTML = 26;
let tempSysMetric = true;

let metric = document.querySelector("#metric");
metric.addEventListener("click", changeCurrentTemperatureToMetric);
let imperial = document.querySelector("#imperial");
imperial.addEventListener("click", changeCurrentTemperatureToImperial);

let event = new Event("click");
buttongeo.dispatchEvent(event);
