import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personsService from './services/persons'
import './index.css'


const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhonenumber, setNewPhonenumber] = useState("");
  const [filter, setFilter] = useState("");
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    console.log("Initial state from db.json:");
    personsService
      .getAll()
      .then(initialPersons => {
        console.log("Response data", initialPersons)
        console.log("promise fulfilled");
        setPersons(initialPersons);
    });
  }, []);
  //console.log("render", persons.length, "persons");

  const addPerson = (event) => {
    event.preventDefault();
    //console.log("button clicked", event.target);
    const personObject = {
      name: newName,
      phonenumber: newPhonenumber,
    };

    if (!persons.find((person) => person.name === personObject.name)) {
      setPersons(persons.concat(personObject));
      personsService
        .create(personObject)
        .then(returnedPerson => {
         //console.log("returnedPerson", returnedPerson)
          setPersons(persons.concat(returnedPerson))
          setNotification(`${returnedPerson.name} was added to the phonebook`)
          setNewName("");
          setNewPhonenumber("");
      })
    } else {
      if (window.confirm(`${newName} is already added to phonebook, replace the old one with a new number?`)) {
        const personToUpdate = persons.find((person) => person.name === personObject.name);
        //console.log('personToUpdate', personToUpdate)
        const updatedPerson = { ...personToUpdate, phonenumber: personObject.phonenumber }
        //console.log('updatedPerson', updatedPerson)
        personsService
          .update(personToUpdate.id, updatedPerson)
          .then((returnedPerson) => {
            //console.log('returnedPerson', returnedPerson)
            setPersons(persons.map(person => person.id !== personToUpdate.id ? person :  returnedPerson));
            setNotification(`Phonenumber for ${returnedPerson.name} was updated`)
            setNewName("");
            setNewPhonenumber("");
          })
      }
    }
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  };

  const removePerson = (id) => {
    //console.log('removePerson', id)
    const personToDelete = persons.find(person => person.id === id)
    if (window.confirm(`Delete ${personToDelete.name}?`)) {
      personsService
        .remove(id)
        .catch(error => {
          console.log('failed')
        })
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
          setNotification(`${personToDelete.name} was removed from phonebook`)
        })
    }
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

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

  const Notification = ({ message }) => {
    if (message === null) {
      return null
    }

    return (
      <div className="success">
        {message}
      </div>
    )
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} />

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

      <Persons filter={filter} persons={persons} removePerson={removePerson}/>
    </div>
  );
};

export default App;
