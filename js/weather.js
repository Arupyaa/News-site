let apiKey = "90c904d1c7f2e3ba260e1ce2af706e20";
let weatherApiCityName = "Cairo";
let weatherApiCountryName = "EG";
let weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${weatherApiCityName},${weatherApiCountryName}&appid=${apiKey}&units=metric`;

let weatherTemp = document.getElementsByClassName("weather-temp");
weatherTemp = Array.from(weatherTemp);
let weatherLocation = document.getElementsByClassName("weather-location");
weatherLocation = Array.from(weatherLocation);
let weatherIcons = document.querySelectorAll(".weather-img-block img");
console.log(weatherIcons);

//debug code
// console.log('test');
// console.log('test');
// localStorage.removeItem("weatherJson")
// let weatherJson = localStorage.getItem("weatherJson");
// console.log('test');

homePageInit();

async function homePageInit() {
    let weatherJson = localStorage.getItem("weatherJson");
    if (weatherJson == null) {
        weatherJson = await getWeatherFromApi();
        localStorage.setItem("weatherJson", JSON.stringify(weatherJson));
        console.log("sent api request to weather api");
    }
    else {
        weatherJson = JSON.parse(weatherJson);
    }

    weatherTemp.forEach((node) => node.innerText = weatherJson.main.temp);
    weatherLocation.forEach((node) => node.innerText = weatherJson.name);
    let weatherIconCode = weatherJson.weather[0].icon;
    weatherIcons.forEach((node) => node.setAttribute("src", `https://openweathermap.org/payload/api/media/file/${weatherIconCode}.png`));
}

async function getWeatherFromApi() {
    let data_returned = await fetch(weatherApiUrl)
        .then((results) => results.json())
        .then((data) => data);
    return data_returned;
}

// fetch(weatherApiUrl)
//     .then((results) => results.json())
//     .then((data) => {
//         document.getElementsByClassName("weather-temp")[0].innerText = data.main.temp;
//         document.getElementsByClassName("weather-location")[0].innerText = data.name;
//         document.querySelector(".weather-img-block img").setAttribute("src", `https://openweathermap.org/payload/api/media/file/${data.weather[0].icon}.png`);
//     });
