import { useState, useEffect } from 'react';
import Countries from "./components/Countries.jsx";
import Filter from "./components/Filter.jsx";
import countriesService from './services/countries.jsx';
import './index.css';

function App() {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    console.log("Fetch data via API");
    countriesService
      .getAll()
      .then(initialCountries => {
        console.log("Response data", initialCountries)
        console.log("promise fulfilled");
        setCountries(initialCountries);
    });
  }, []);

  const handleFilterChange = (event) => {
    //console.log(event.target.value);
    setFilter(event.target.value);
  };

  return (
    <>
      <h1>Country information</h1>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <Countries filter={filter} countries={countries} handleFilterChange={handleFilterChange} />
    </>
  )
}

export default App
