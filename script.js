// today card info
var today = document.getElementById("day");
var todayDate = document.getElementById("date");
var cityLocation = document.getElementById("location");
var todayDegree = document.getElementById("today-degree");
var todayIcon = document.getElementById("todayIcon");
var description = document.getElementById("description");
var humidty = document.getElementById("humidty");
var wind = document.getElementById("wind");
var compass = document.getElementById("compass");
var searchInput = document.getElementById("searchInput")


// nextDay Card Info
var nextDay = document.getElementsByClassName("nextDay");
var nextDayIcon = document.getElementsByClassName("nextDay-icon");
var maxDegree = document.getElementsByClassName("maxDegree");
var minDegree = document.getElementsByClassName("minDegree");
var nextDayDescription = document.getElementsByClassName("nextDayDescription");




var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var monthName = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Spet', 'Oct', 'Nov', 'Dec'];
var response;
var Result;

async function getWeatherData(currentCity = 'alexandria') {
    response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=572e08fb1d7547f58d8151525211205&q=${currentCity}&days=3`);
    Result = await response.json();
    console.log(Result);
    displayTodayWeather();
    displayNextDayWeather();
}

function displayTodayWeather() {
    var date = new Date();
    //  console.log(days[date.getDay()])
    today.innerHTML = days[date.getDay()];
    todayDate.innerHTML = `${date.getDate()} ${monthName[date.getMonth()]}`;
    cityLocation.innerHTML = Result.location.name;
    todayDegree.innerHTML = Result.current.temp_c;
    todayIcon.setAttribute("src", `https:${Result.current.condition.icon}`)
    description.innerHTML = Result.current.condition.text;
    humidty.innerHTML = Result.current.humidity;
    wind.innerHTML = Result.current.wind_kph
    compass.innerHTML = Result.current.wind_dir
}
getWeatherData();


function displayNextDayWeather() {
    for (i = 0; i < nextDay.length; i++) {
        nextDay[i].innerHTML = days[new Date(Result.forecast.forecastday[i + 1].date).getDay()];
        nextDayIcon[i].setAttribute("src", `https:${Result.forecast.forecastday[i + 1].day.condition.icon}`);
        maxDegree[i].innerHTML = Result.forecast.forecastday[i + 1].day.maxtemp_c;
        minDegree[i].innerHTML = Result.forecast.forecastday[i + 1].day.mintemp_c;
        nextDayDescription[i].innerHTML = Result.forecast.forecastday[i + 1].day.condition.text;
    }
}
searchInput.addEventListener("keyup", function () {
    currentCity = searchInput.value;

    getWeatherData(currentCity);
})



