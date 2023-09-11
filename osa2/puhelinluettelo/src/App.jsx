import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { id: "ArtoHellas", name: "Arto Hellas", phonenumber: "040-1231244" },
  ]);
  const [newName, setNewName] = useState("");
  const [newPhonenumber, setNewPhonenumber] = useState("");

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
    return (
      <div>
        {person.name} {person.phonenumber}
      </div>
    );
  };

  const handlePersonChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handlePhonenumberChange = (event) => {
    console.log(event.target.value);
    setNewPhonenumber(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handlePersonChange} />
          <div>
            number:
            <input value={newPhonenumber} onChange={handlePhonenumberChange} />
          </div>
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
