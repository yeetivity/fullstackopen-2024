import axios from 'axios'
const baseUrl = 'https://api.open-meteo.com/v1/forecast?current=temperature_2m,weather_code,wind_speed_10m&wind_speed_unit=ms'

const getWeather = ( latitude, longitude ) => {
    return axios.get(`${baseUrl}&latitude=${latitude}&longitude=${longitude}`).then(result => result.data)
}

export default { getWeather }