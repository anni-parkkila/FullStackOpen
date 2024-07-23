const Country = ({ country }) => {
  //const { name } = country;
  return (
    <div>
      {country}
    </div>
  );
};

const Countries = ({ filter, countries }) => {
  console.log("countries", countries);
  console.log("filter", filter);
  const filteredCountries = filter
    ? countries.filter((country) =>
        country.toLowerCase().includes(filter.toLowerCase())
      )
    : countries;

  if (filteredCountries.length > 10) {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  }

  return (
    <div>
      {filteredCountries.map((country) => (
        <Country key={country.id} country={country}/>
      ))}
    </div>
  );
};

export default Countries;
