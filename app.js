const yargs = require('yargs');
const axios = require('axios');

if (!process.env.DARKSKY_SECRET) {
  console.error(
    `You need to export the DARKSKY_SECRET environment variable.`,
    `\nIf you do not have the DarkSky Secret, get it in 'https://darksky.net\'.`);
  return 1;
}

const argv = yargs
  .options({
    address: {
      alias: 'a',
      describe: 'Address to search',
      require: true,
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

var encodedAddress = encodeURIComponent(argv.address);
var geocodeUrl = `http://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

axios.get(geocodeUrl).then((response) => {
  if (response.data.status === 'ZERO_RESULTS') {
    throw new Error('Unable to find that address');
  }

  var lat = response.data.results[0].geometry.location.lat;
  var lng = response.data.results[0].geometry.location.lng;
  console.log(response.data.results[0].formatted_address);
  return axios.get(`https://api.darksky.net/forecast/${process.env.DARKSKY_SECRET}/${lat},${lng}`);
}).then((response) => {
  var temperature = response.data.currently.temperature;
  var apparentTemperature = response.data.currently.apparentTemperature;
  console.log(`It's currently ${temperature}. It feels like ${apparentTemperature}.`);
}).catch((error) => {
  if (error === 'ENOTFOUND' ) {
    console.log('Unable to connect to API servers.');
  } else {
    console.log(error.message);
  }
});