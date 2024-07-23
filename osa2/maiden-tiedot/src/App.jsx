import { useState } from 'react'
import Countries from "./components/Countries.jsx"
import Filter from "./components/Filter.jsx";

function App() {
  const [countries, setCountries] = useState(
    ["Suomi",
      "Ruotsi",
      "Norja",
      "Venäjä",
      "Viro",
      "Saksa",
      "Iso-Britannia",
      "Espanja",
      "Italia",
      "Japani",
      "Australia",
      "Kiina",
      "Intia",
      "Mongolia"
  ]);
  const [filter, setFilter] = useState("");

  const handleFilterChange = (event) => {
    console.log(event.target.value);
    setFilter(event.target.value);
  };

  return (
    <>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <Countries filter={filter} countries={countries} />
    </>
  )
}

export default App
