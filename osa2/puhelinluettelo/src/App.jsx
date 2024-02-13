import { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { id: "ArtoHellas", name: "Arto Hellas", phonenumber: "040-123456" },
    { id: "AdaLovelace", name: "Ada Lovelace", phonenumber: "39-44-5323523" },
    { id: "DanAbramov", name: "Dan Abramov", phonenumber: "12-43-234345" },
    {
      id: "MaryPoppendieck",
      name: "Mary Poppendieck",
      phonenumber: "39-23-6423122",
    },
  ]);
  const [newName, setNewName] = useState("");
  const [newPhonenumber, setNewPhonenumber] = useState("");
  const [filter, setFilter] = useState("");

  const addPerson = (event) => {
    event.preventDefault();
    //console.log("button clicked", event.target);
    const personObject = {
      name: newName,
      id: newName.replace(" ", ""),
      phonenumber: newPhonenumber,
    };

    if (!persons.find((person) => person.id === personObject.id)) {
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
