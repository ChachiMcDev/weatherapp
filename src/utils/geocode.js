const request = require('postman-request');

const geoCode = (address, callback) => {

    let latlong = {
        lat: 0,
        long: 0,
        location: ''
    }
    const url = 'http://api.positionstack.com/v1/forward?access_key=6e1e7c5a383db62cec4e191b85e0e397&query=' + address

    request({
        url,
        json: true
    }, (err, resp) => {
        if (err) {
            return callback('Unable to connect to service', undefined)
        } else if (resp.body.error) {
            return callback('Error ' + resp.body.error.context.query.type, undefined)
        } else if (resp.body.data.length === 0) {
            return callback('Could not locate address requested', undefined)

        } else {
            latlong.lat = resp.body.data[0].latitude,
                latlong.long = resp.body.data[0].longitude
            latlong.location = resp.body.data[0].label
            callback(undefined, latlong)
        }
    })
}


module.exports = geoCode