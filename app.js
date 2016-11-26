const yargs = require('yargs');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

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

geocode.geocodeAddress(argv.address, (error, results) => {
  if (error) {
    console.log(error);
  } else {
    console.log(results.address);
    weather.getWeather(results, (error, results) => {
      if (error) {
        console.log(error);
      } else {
        console.log(`It's currently ${results.temperature}. It feels like ${results.apparentTemperature}.`);
      }
    });
  }
});