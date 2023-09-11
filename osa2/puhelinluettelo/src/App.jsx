import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { id: "artohellas", name: "Arto Hellas" },
  ]);
  const [newName, setNewName] = useState("");

  const addName = (event) => {
    event.preventDefault();
    console.log("button clicked", event.target);
    const personObject = {
      name: newName,
      id: newName.replace(" ", "").toLowerCase(),
    };

    setPersons(persons.concat(personObject));
    setNewName("");
  };

  const Person = ({ person }) => {
    return <div>{person.name}</div>;
  };

  const handlePersonChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handlePersonChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <Person key={person.id} person={person} />
      ))}
    </div>
  );
};

export default App;
