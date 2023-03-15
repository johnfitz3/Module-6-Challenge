//linking api
var APIKey = "680de62c48c3eba20b44b6dd22adc5de";

function search() {
    var searchInput = document.getElementById("search-input").value;
    fetchWeatherAPI(searchInput);
    document.getElementById("search-history").style.display = "block ";
    var historyList = document.getElementById("history-list");
    var listItem = document.createElement("p");
    listItem.textContent = searchInput;
    historyList.appendChild(listItem);
}

function fetchWeatherAPI(city) {
    var currentWeatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
    var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey;
//fetching the current weather and 5 day forecast.
    Promise.all([
        fetch(currentWeatherURL),
        fetch(forecastURL)
    ])
        .then(function (responses) {
            return Promise.all(responses.map(function (response) {
                return response.json();
            }));
        })
        .then(function (data) {
            displayCity(data[0]);
            displayForecast(data[1]);
        })
        .catch(function (error) {
            console.log(error);
        });
}
//creating elements to display the data
function displayCity(cityData)  {
    var cityInfo = document.createElement("div");
    cityInfo.className = "city-info";
    cityInfo.innerHTML = "<h3>" + cityData.name + "</h3>" +
                          "<p>Temperature: " + convertToFahrenheit(cityData.main.temp) + " °F</p>" +
                          "<p>Humidity: " + cityData.main.humidity + "%</p>" +
                          "<p>Wind Speed: " + cityData.wind.speed + " mph</p>";
    document.body.appendChild(cityInfo);  
}

function displayForecast(forecastData) {
    var forecastContainer = document.createElement("div");
    forecastContainer.className = "forecast-container";

    for (var i = 0; i < forecastData.list.length; i += 8) {
        var forecast = forecastData.list[i];
        var forecastItem = document.createElement("div");
        forecastItem.className = "forecast-item";
        forecastItem.innerHTML = "<h3>" + new Date(forecast.dt * 1000).toLocaleDateString() + "</h3>" +
                                  "<p>Temperature: " + convertToFahrenheit(forecast.main.temp) + " °F</p>" +
                                  "<p>Humidity: " + forecast.main.humidity + "%</p>" +
                                  "<p>Wind Speed: " + forecast.wind.speed + " mph</p>";
        forecastContainer.appendChild(forecastItem);
    }

    document.body.appendChild(forecastContainer);
}
//converting temp
function convertToFahrenheit(kelvin) {
    return ((kelvin - 273.15) * 9/5 + 32).toFixed(1);
}

//adding search history
function search() {
    var searchInput = document.getElementById("search-input").value;
    fetchWeatherAPI(searchInput);
    
    // Add the search to the history list
    var historyList = document.getElementById("history-list");
    var listItem = document.createElement("li");
    listItem.textContent = searchInput;
    historyList.appendChild(listItem);
  }