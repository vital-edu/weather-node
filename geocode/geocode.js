const request = require('request');

function geocodeAddress(address, callback) {
  var encodedAddress = decodeURIComponent(address);
  request({
    url: `http://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
    json: true
  }, (error, response, body) => {
    if (error) {
      callback('Unable to fetch data from Google servers');
    } else if (body.status === 'OK') {
      callback(undefined, {
        address: body.results[0].formatted_address,
        latitude: body.results[0].geometry.location.lat,
        longitude: body.results[0].geometry.location.lng,
      })
    } else {
      callback(body.status);
    }
  })
}

module.exports = {
  geocodeAddress,
}