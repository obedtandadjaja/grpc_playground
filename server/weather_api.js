axios = require('axios');

module.exports = {

  getWeatherByCityName(call, callback) {
    data = null;

    axios.get("https://api.openweathermap.org/data/2.5/weather?APPID=bd5e378503939ddaee76f12ad7a97608&q=" + call.request.name)
    .then(function (response) {
      data = response.data;
      callback(null, data);
    })
    .catch(function (error) {
      callback(new Error(error.message));
    });
  },

  getWeatherByLatLong(call, callback) {
    data = null;

    axios.get("https://api.openweathermap.org/data/2.5/weather?APPID=bd5e378503939ddaee76f12ad7a97608&lat=" + call.request.lat + "&lon=" + call.request.lon)
    .then(function (response) {
      data = response.data;
      console.log(data);
      callback(null, data);
    })
    .catch(function (error) {
      callback(new Error(error.message));
    });
  }

}
