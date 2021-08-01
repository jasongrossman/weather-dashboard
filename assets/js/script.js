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
    var UVI = document.createElement("span");
    UVI.innerHTML = data.daily[0].uvi;
    // conditionally format UV index based on low, moderate, or high
    if (UVI.innerHTML>0 && UVI.innerHTML<=3) {
      UVI.setAttribute("class", "badge-success");
    } else if (UVI.innerHTML>3 && UVI.innerHTML <=5) {
      UVI.setAttribute("class", "badge-warning"); 
    } else if (UVI.innerHTML>6){
      UVI.setAttribute("class", "badge-danger"); 
    };
  
    $(".uv-index").append(UVI);

    //loop over forecast div to create 5 day forecast
      for (i = 0; i<forecastLength; i++){
      var forecastDay1 = document.createElement("div");
      forecastDay1.classList = "col-4 card day1";
      
      //date value for forecast
      var forecastdate = document.createElement("h3");
      forecastdate.classList = "forecast";
      forecastdate.textContent = new Date(data.daily[i].dt*1000);
      forecastDay1.appendChild(forecastdate);

      //weather icon
      var forecastIcon = document.createElement("img");
      forecastIcon.classList = "icon";
      forecastIcon.src = "http://openweathermap.org/img/wn/" 
      + data.daily[i].weather[0].icon
      + "@2x.png"
      forecastDay1.appendChild(forecastIcon);

      //forecast temperature
      var forecastTemp = document.createElement("h4");
      forecastTemp.classList = "day1";
      forecastTemp.textContent = "Temperature" + data.daily[i].temp.max;
      forecastDay1.appendChild(forecastTemp);

      //forecast wind
      var forecastWind =document.createElement("h4");
      forecastWind.classList = "day1";
      forecastWind.textContent = "Wind: " + data.daily[i].wind_speed;
      forecastDay1.appendChild(forecastWind);

      //forecast humidity
      var forecastHumidity =document.createElement("h4");
      forecastHumidity.classList = "day1";
      forecastHumidity.textContent = "Humidity: " + data.daily[i].humidity;
      forecastDay1.appendChild(forecastHumidity);

      //append forecast to div container
      document.querySelector(".city-forecast").appendChild(forecastDay1);
      }
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
      var todayIcon = document.createElement("img");
      todayIcon.classList = "icon";
      todayIcon.src = "http://openweathermap.org/img/wn/" 
      + data.list[0].weather[0].icon
      + "@2x.png";
      $(".city-hero-name").append(todayIcon);

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


