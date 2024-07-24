import axios from 'axios'
const api_key = import.meta.env.VITE_WEATHER_KEY

const baseUrl = 'https://api.openweathermap.org/data/3.0/onecall?'
const endUrl = `&units=metric&exclude=minutely,hourly,daily&appid=${api_key}`

const getWeather= (lat, lon) => {
  console.log('url', `${baseUrl}lat=${lat}&lon=${lon}${endUrl}`)
  const request = axios.get(`${baseUrl}lat=${lat}&lon=${lon}${endUrl}`)
  return request.then(response => response.data)
}

export default {
  getWeather
}
