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
  const latlng = capitalInfo.latlng;

  useEffect(() => {
    if (country) {
      weatherService
        .getWeather(latlng[0], latlng[1])
        .then(response => {
          console.log("weather data", response)
          setWeather(response)})
        .catch(error => {
          console.log("error, could not fetch weather data", error)})
    }
  }, [country]);

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
      {weather !== null && (
      <div className="weather-info">
          <h3>Weather in {capital}</h3>
          <ul>
            <li><strong>Temperature:</strong> {weather.current.temp}°C</li>
            <li><img src={`https://openweathermap.org/img/wn/${weather.current.weather[0].icon}@2x.png`} alt={weather.current.weather[0].description}/></li>
            <li><strong>Wind:</strong> {weather.current.wind_speed} m/s</li>
          </ul>
      </div>)}
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
