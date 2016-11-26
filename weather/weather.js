const request = require('request');

function getWeather(location, callback) {
  if (!process.env.DARKSKY_SECRET) {
    var errorMessage = `You need to export the DARKSKY_SECRET environment variable.\n`
    errorMessage += `If you do not have the DarkSky Secret, get it in 'https://darksky.net\'`;
    callback(errorMessage);
    return undefined;
  }

  request({
    url: `https://api.darksky.net/forecast/${process.env.DARKSKY_SECRET}/${location.latitude},${location.longitude}`,
    json: true
  }, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      callback(undefined, {
        temperature: body.currently.temperature,
        apparentTemperature: body.currently.apparentTemperature,
      });
    } else {
      callback('Unable to fetch weather.');
    }
  });
}

module.exports = {
  getWeather,
}