const Country = ({ country, handleFilterChange }) => {
  const name = country.name.common;
  return (
    <div>
      {name} <button onClick={handleFilterChange} value={name}>show info</button>
    </div>
  );
};

const CountryInfo = ({ country }) => {
  const name = country.name.common;
  const { capital, area, languages, flags } = country;
  // console.log('capital', capital)
  // console.log('area', area)
  // console.log('languages', Object.values(languages))
  // console.log('flags', flags.png)
  const allLanguages = Object.values(languages);
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
