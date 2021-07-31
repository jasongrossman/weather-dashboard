//global variable declarations
var textInput = document.querySelector(".search-box");
var citySearch = "";
console.log(textInput);

function displayFiveDay(city){
  // 
}
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
      displayFiveDay()
      console.log(data)
      //change city name header to city name
      $(".city-hero-name").text(data.city.name);
      //update temperature
      $(".temperature").text("Temperature: " + data.list[0].main.temp + '°C');
      $(".wind").text("Wind: " + data.list[0].wind.speed + 'km/h');
      $(".humidity").text("Humidity: " + data.list[0].main.humidity + "%");
      // $(".uv-index").text("UV Index: " + data.list[0].)
    })
  }


    // var displayWeather = function() {
    //     response.json().then(function(data)
    // }

//event handler for search function
$("#search-now").on("click", searchSubmitHandler);


