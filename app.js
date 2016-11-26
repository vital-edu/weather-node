const yargs = require('yargs');

const geocode = require('./geocode/geocode');

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
    console.log(JSON.stringify(results, undefined, 2));
  }
});