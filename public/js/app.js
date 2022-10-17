console.log('client side javascript')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageLocation = document.querySelector('#location')
const messageWeather = document.querySelector('#weather')
const weatherIcons = document.querySelector('#weather-icon')

const buildWeatherIcons = (weathcons, ele) => {

    const imgWeather = document.createElement('img')
    weathcons.forEach((el) => {
        imgWeather.src = el
        ele.appendChild(imgWeather)
    });
}


weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const searchValue = search.value
    messageLocation.textContent = "Loading..."
    messageWeather.textContent = ""
    weatherIcons.innerHTML = ''

    fetch('/weather?address=' + searchValue).then((resp) => {

        resp.json().then((weatherData) => {
            if (weatherData.error) {
                messageLocation.textContent = weatherData.error
            } else {
                const { fahr, location } = weatherData
                const { cloudcover, humidity, precip } = weatherData.temp

                buildWeatherIcons(weatherData.weather_icons, weatherIcons)

                messageLocation.textContent = 'Your search for ' + location + ' weather is currently...'
                messageWeather.textContent = fahr + ' degrees, with humidity at ' + humidity + '% and precipitation of ' + precip + '%.'

            }
        })
    })
})

