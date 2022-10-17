const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('postman-request');
const geoCode = require('./utils/geocode');
const foreCast = require('./utils/forecast');

const app = express()
const port = process.env.PORT || 3000

//define paths for express config
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
const publicDirectoryPath = path.join(__dirname, '../public')

//setup handlebars engine and views locations
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to server
app.use(express.static(publicDirectoryPath))


//setup routes for static pages
app.get('', (req, res) => {
    res.render('index', {
        title: 'ChickaChicka Yeahhh - Weather App',
        name: 'Johnny Quest',
        footNote: ''
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Johnny Quest',
        footNote: 'Thank you for viewing our About page'
    })
})


app.get('/help', (req, res) => {
    res.render('help', {
        title: 'YOU NEED HELP SUCCA!',
        helpText: 'You betta call yo momma!',
        footNote: 'Thank you for viewing our Help page'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        pageNotFound: 'Help article not found :('
    })
})


app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })

})


// "weather_icons": ["https://cdn.worldweatheronline.com/images/wsymbols01_png_64/wsymbol_0002_sunny_intervals.png"]
app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'Must provide a location or address to search!'
        })
    }

    const address = req.query.address
    geoCode(address, (error, { lat, long, location } = {}) => {
        if (error) {
            return res.send({ error })
        } else {
            foreCast({ lat, long, location }, (error, fahr, { precip, weather_description, humidity, cloudcover, weather_icons } = {}) => {

                if (error) {
                    return res.send({
                        error
                    })
                }

                res.send({
                    fahr,
                    location,
                    temp: {
                        precip,
                        weather_description,
                        humidity,
                        cloudcover
                    },
                    weather_icons
                })
            })

        }

    })
})






app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        pageNotFound: 'This is not the page you are looking for!'
    })
})


app.listen(port, () => {
    console.log('server is up on prt:' + port)
}) 