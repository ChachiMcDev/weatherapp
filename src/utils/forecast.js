const request = require('postman-request');

//{ lat, long, location }


const foreCast = ({ lat, long }, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=b7fd9c75fc301c9db317adf03fb644bd&query=' + lat + ',' + long

    request({
        url,
        json: true
    }, (err, resp, { current }) => {

        if (err) {
            return callback('Unable to find weather service', undefined, undefined)
        } else if (!current) {

            return callback('Unable to find weather location : ' + resp.body.error.info, undefined, undefined)
        } else {
            const celcius = current.temperature
            const fahr = celcius * 1.8 + 32
            const fahrenheit = Math.round((fahr + Number.EPSILON) * 100) / 100


            callback(undefined, fahrenheit, current)
        }
    })

}

module.exports = foreCast