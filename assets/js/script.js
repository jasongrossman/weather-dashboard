//global variable declarations
var textInput = document.querySelector(".search-box");
var citySearch = "";
var searchedCitylat = "";
var searchedCitylong = "";
var forecastLength = 5;

function getForecastApi(city){
  //create second API call to generate 5 day forecast and UV index
  fetch("https://api.openweathermap.org/data/2.5/onecall?" 
  + "lat=" + searchedCitylat
  + "&lon=" + searchedCitylong
  + "&units=metric"
  + "&appid=4bdf76bd7f935435d6ca49a5f4268f54")
  .then(function(response) {
    // request was successful
    if (response.ok) {
      // console.log(response);
      return response.json();

    } else {
      alert('Error: ' + response.statusText);
    }
  })
  .catch(function(error) {
    alert('Unable to connect to OpenWeather API');
  })

  .then(function(data) {
    console.log(data);
    //add UV index to hero
    $(".uv-index").text("UV Index " + data.current.uvi);

      var forecastDay1 = document.createElement("div");
      forecastDay1.classList = "col-4 card day1";

      var forecastdate = document.createElement("h3");
      forecastdate.classList = "day1";
      forecastdate.textContent = new Date(data.daily[0].dt*1000);
      forecastDay1.appendChild(forecastdate);

      var forecastIcon = document.createElement("img");
      forecastIcon.classList = "icon";
      forecastIcon.src = "http://openweathermap.org/img/wn/" 
      + data.daily[0].weather[0].icon
      + "@2x.png"
      forecastDay1.appendChild(forecastIcon);

      var forecastTemp = document.createElement("h4");
      forecastTemp.classList = "day1";
      forecastTemp.textContent = "Temperature" + data.daily[0].temp.max;
      forecastDay1.appendChild(forecastTemp);

      var forecastWind =document.createElement("h4");
      forecastWind.classList = "day1";
      forecastWind.textContent = "Wind: " + data.daily[0].wind_speed;
      forecastDay1.appendChild(forecastWind);

      var forecastHumidity =document.createElement("h4");
      forecastHumidity.classList = "day1";
      forecastHumidity.textContent = "Humidity: " + data.daily[0].humidity;
      forecastDay1.appendChild(forecastHumidity);

      document.querySelector(".city-forecast").appendChild(forecastDay1);


    //add forecast data to respective div elements
    // $(".day1").add("h3").addClass("day-1-date").text(data.daily[0].dt);


    // addClass("forecast-1-date");
    // $(".forecast-1-date").text(data.daily[0].dt);
    // $("n1").append(this);
    // $("#n1").add("h4").addClass("forecast-1-temp").text(data.daily[0].temp.max);
    // $("n1").append(this);

})
};

var searchSubmitHandler = function(event) {
    // prevent page from refreshing
  event.preventDefault();

  citySearch = textInput.value.trim();
  console.log(citySearch);

  if(citySearch) {
      getWeatherApi(citySearch);

  } else {
      alert("Please input a city name");
  }
  };


var getWeatherApi = function() {
    // event.preventDefault();
    fetch("https://api.openweathermap.org/data/2.5/forecast?q=" 
    + citySearch 
    + "&units=metric"
    + "&appid=4bdf76bd7f935435d6ca49a5f4268f54")
    .then(function(response) {
      // request was successful
      if (response.ok) {
        // console.log(response);
        return response.json();

      } else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function(error) {
      alert('Unable to connect to OpenWeather API');
    })

    .then(function(data) {
      console.log(data);
      searchedCitylat = data.city.coord.lat;
      searchedCitylong = data.city.coord.lon;
      console.log(searchedCitylat);
      console.log(searchedCitylong);
      //change city name header to city name
      $(".city-hero-name").text(data.city.name);
      //update temperature
      $(".temperature").text("Temperature: " + data.list[0].main.temp + '°C');
      $(".wind").text("Wind: " + data.list[0].wind.speed + 'km/h');
      $(".humidity").text("Humidity: " + data.list[0].main.humidity + "%");
      // $(".uv-index").text("UV Index: " + data.list[0].)
      getForecastApi(citySearch);
    })
  }


    // var displayWeather = function() {
    //     response.json().then(function(data)
    // }

//event handler for search function
$("#search-now").on("click", searchSubmitHandler);


