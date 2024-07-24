import { useState, useEffect } from 'react';
import weatherService from './../services/weather.jsx'

const Country = ({ country, handleFilterChange }) => {
  const name = country.name.common;
  return (
    <div>
      {name} <button onClick={handleFilterChange} value={name}>show info</button>
    </div>
  );
};

const CountryInfo = ({ country }) => {
  const [weather, setWeather] = useState(null);
  const name = country.name.common;
  const { capital, area, languages, flags, capitalInfo } = country;
  const allLanguages = Object.values(languages);
  // console.log('capital', capital)
  // console.log('area', area)
  // console.log('languages', Object.values(languages))
  // console.log('flags', flags.png)
  // console.log('latlng', latlng)
  const latlng = capitalInfo.latlng;
  console.log('weather state', weather)

  const exampleWeather =
    {
        "lat":33.44,
        "lon":-94.04,
        "timezone":"America/Chicago",
        "timezone_offset":-18000,
        "current":{
           "dt":1684929490,
           "sunrise":1684926645,
           "sunset":1684977332,
           "temp":292.55,
           "feels_like":292.87,
           "pressure":1014,
           "humidity":89,
           "dew_point":290.69,
           "uvi":0.16,
           "clouds":53,
           "visibility":10000,
           "wind_speed":3.13,
           "wind_deg":93,
           "wind_gust":6.71,
           "weather":[
              {
                 "id":803,
                 "main":"Clouds",
                 "description":"broken clouds",
                 "icon":"04d"
              }
           ]
        }
    }
  console.log('temperature', exampleWeather.current.temp)

  //setWeather(exampleWeather);

  // useEffect(() => {
  //   if (country) {
  //     weatherService
  //       .getWeather(latlng[0], latlng[1])
  //       .then(response => {
  //         console.log("weather data", response)
  //         setWeather(response)})
  //       .catch(error => {
  //         console.log("error, could not fetch weather data", error)})
  //       }
  // }, [country]);
  console.log('weather', weather);
  const weatherIcon = `https://openweathermap.org/img/wn/${exampleWeather.current.weather[0].icon}@2x.png`
  console.log(weatherIcon)
  const weatherIconAlt = exampleWeather.current.weather[0].description

  return (
    <div>
      <h2>{name}</h2>
      <div className="basic-info">
        <h3>Basic information</h3>
        <ul>
          <li><strong>Capital:</strong> {capital}</li>
          <li><strong>Area:</strong> {area}</li>
        </ul>
      </div>
      <div className="languages">
        <h3>Languages</h3>
        <ul>
          {allLanguages.map((language) => (
            <li key={language}>{language}</li>
          ))}
        </ul>
      </div>
      <div className="flag">
        <img src={flags.svg} alt={flags.alt}/>
      </div>
      <div className="weather-info">
          <h3>Weather in {capital}</h3>
          <ul>
            <li><strong>Temperature:</strong> {exampleWeather.current.temp}°C</li>
            <li><img src={weatherIcon} alt={weatherIconAlt}/></li>
            <li><strong>Wind:</strong> {exampleWeather.current.wind_speed} m/s</li>
          </ul>
      </div>
    </div>
  )
}

const Countries = ({ filter, countries, handleFilterChange }) => {
  //console.log("filter", filter);
  const filteredCountries = filter
    ? countries.filter((country) =>
        country.name.common.toLowerCase().includes(filter.toLowerCase())
      )
    : countries;
    //console.log("filteredCountries", filteredCountries)

  if (filteredCountries.length > 10) {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  } else if (filteredCountries.length === 1) {
    return (
      <div>
        {filteredCountries.map((country) => (
        <CountryInfo key={country.cca3} country={country}/>
      ))}
      </div>
    )
  } else {
  return (
    <div>
      {filteredCountries.map((country) => (
        <Country key={country.cca3} country={country} handleFilterChange={handleFilterChange} />
      ))}
    </div>
  );}
};

export default Countries;
