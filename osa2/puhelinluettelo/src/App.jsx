import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhonenumber, setNewPhonenumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    console.log("Initial state from db.json:");
    axios
      .get("http://localhost:3001/persons")
      .then((response) => {
        console.log(response.data)
        console.log("promise fulfilled");
        setPersons(response.data);
    });
  }, []);
  //console.log("render", persons.length, "persons");

  const addPerson = (event) => {
    event.preventDefault();
    //console.log("button clicked", event.target);
    const personObject = {
      name: newName,
      id: persons.length + 1,
      phonenumber: newPhonenumber,
    };

    if (!persons.find((person) => person.name === personObject.name)) {
      setPersons(persons.concat(personObject));
      setNewName("");
      setNewPhonenumber("");
    } else {
      alert(`${newName} is already added to phonebook`);
    }
  };

  const handleNameChange = (event) => {
    //console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handlePhonenumberChange = (event) => {
    //console.log(event.target.value);
    setNewPhonenumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    //console.log(event.target.value);
    setFilter(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filter={filter} handleFilterChange={handleFilterChange} />

      <h3>Add a new name and phonenumber</h3>

      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newPhonenumber={newPhonenumber}
        handlePhonenumberChange={handlePhonenumberChange}
      />

      <h3>Numbers</h3>

      <Persons filter={filter} persons={persons} />
    </div>
  );
};

export default App;
