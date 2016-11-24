const request = require('request');
const yargs = require('yargs');

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

request({
  url: `http://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
  json: true
}, (error, response, body) => {
  console.log(`Address: ${body.results[0].formatted_address}`);
  console.log(`Latitude: ${body.results[0].geometry.location.lat}`);
  console.log(`Longitude: ${body.results[0].geometry.location.lng}`);
})