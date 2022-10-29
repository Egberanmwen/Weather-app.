const myDate = document.querySelector(".date");
const currentCity = document.getElementById("currentBtn");
//const searchedCity = document.querySelector(".cityName");
const times = document.querySelector(".times");
const tempValue = document.querySelector(".tempval");
const weatherDescription = document.querySelector(".weatherDesc");
const cityName = document.querySelector(".cityName");
const windSpeed = document.getElementById("wind");
const myDays = document.querySelector(".mydays");
const newDate = new Date();
const realFeel = document.getElementById("realFeel");
const pressure = document.getElementById("pressure");
const humidity = document.getElementById("humidity");

const inputField = document.getElementById("inputField");
//const weatherIcon = document.querySelector('.icon').src;
const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec"
];
let date = newDate.getDate();
let hours = newDate.getHours();
let minutes = newDate.getMinutes();
let seconds = newDate.getSeconds();
let day = weekdays[newDate.getDay()];
let currentMonth = months[newDate.getMonth()];
let year = newDate.getFullYear();
const formatDate = (date) => {
  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }
  let currentTime = `${hours}: ${minutes}:${seconds}`;
  return ` ${currentTime}`;
};
let recentDate = `${day} ${date} ${currentMonth}, ${year}`;
times.innerHTML = `${formatDate(date)}`;
myDate.innerHTML = `${recentDate}`;
const search = document.getElementById("searchBtn");
const key = "da7b7a5ef4242854a4877ca52eb8f583";
//const cityLocation= document.querySelector('.cityName');
const placeValue = (data) => {
  cityName.innerHTML = data.name;
  tempValue.innerHTML = `Temperature:  ${Math.floor(data.main.temp)}`;
  windSpeed.innerHTML = `Wind Speed : ${data.wind.speed}`;
  humidity.innerHTML = `Humidity : ${Math.floor(data.main.humidity)} %`;
  pressure.innerHTML = `Pressure:  ${Math.floor(data.main.pressure)} MB`;
  realFeel.innerHTML = ` Real feel : ${Math.floor(data.main.feels_like)}`;
  weatherDescription.innerHTML = `Weather description: ${data.weather[0].main}`;
};
//const nextForecast = (data)=> {
//let forecast = '';
for (let i = 0; i < weekdays.length; i++) {
  //forecast = data.main.list[i];
  let dat = weekdays[(newDate.getDay(i) + 1 + i) % 7];
  let wideRange = `${dat} ${date + i + 1} ${currentMonth}, ${year}`;
  if (i < 4) {
    const dayElement = document.createElement("div");
    dayElement.innerHTML = `
                  <div class="day1">
                      <div class="innerDay1">
                        <h2 class="days">${wideRange}</h2>
                        
                      </div>
                  </div>
              `;
    myDays.appendChild(dayElement);
  }
}
//}
const currentLocation = (e) => {
  e.preventDefault();
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      let long = position.coords.longitude;
      let lat = position.coords.latitude;
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${key}&units=metric`;
      fetch(url)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log(data);
          placeValue(data);
        });
    });
  }
};
const searchCity = (city) => {
  let cityApi = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
  fetch(cityApi)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      placeValue(data);
    });
};
const searchLocation = (e) => {
  let city = inputField.value;
  e.preventDefault();
  searchCity(city);
};
searchCity("Nigeria");
search.addEventListener("click", searchLocation);
currentCity.addEventListener("click", currentLocation);
