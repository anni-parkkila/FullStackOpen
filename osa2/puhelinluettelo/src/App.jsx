import { useState } from "react";

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

  const addName = (event) => {
    event.preventDefault();
    console.log("button clicked", event.target);
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

  const Person = ({ person }) => {
    //console.log("person", person);
    return (
      <div>
        {person.name} {person.phonenumber}
      </div>
    );
  };

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handlePhonenumberChange = (event) => {
    console.log(event.target.value);
    setNewPhonenumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    console.log(event.target.value);
    setFilter(event.target.value);
  };

  const filteredPersons = filter
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(filter.toLowerCase())
      )
    : persons;

  //console.log("filteredPersons", filteredPersons);

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        Filter names with:{" "}
        <input value={filter} onChange={handleFilterChange} />
      </div>

      <h2>Add a new name and phonenumber</h2>
      <form onSubmit={addName}>
        <div>
          New name: <input value={newName} onChange={handleNameChange} />
          <div>
            New number:{" "}
            <input value={newPhonenumber} onChange={handlePhonenumberChange} />
          </div>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {filteredPersons.map((person) => (
        <Person key={person.id} person={person} />
      ))}
    </div>
  );
};

export default App;
