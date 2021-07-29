//global variable declarations

var getWeatherApi = function(event) {
    event.preventDefault();

    fetch("https://api.openweathermap.org/data/2.5/forecast?id=524901&appid=4bdf76bd7f935435d6ca49a5f4268f54")
    .then(function(response) {
      // request was successful
      if (response.ok) {
        console.log(response);
        response.json().then(function(data) {
          console.log(data);
        });
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function(error) {
      alert('Unable to connect to OpenWeather API');
    });

}

//event handler for search function
$("#search-now").on("click", getWeatherApi);

