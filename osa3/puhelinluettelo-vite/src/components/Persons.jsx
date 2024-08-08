const Person = ({ person, removePerson }) => {
  const { name, phonenumber } = person;
  return (
    <div>
      {name} {phonenumber} <button onClick={removePerson}>delete</button>
    </div>
  );
};

const Persons = ({ filter, persons, removePerson }) => {
  const filteredPersons = filter
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(filter.toLowerCase())
      )
    : persons;

  return (
    <div>
      {filteredPersons.map((person) => (
        <Person key={person.id} person={person} removePerson={() => removePerson(person.id)}
        />
      ))}
    </div>
  );
};

export default Persons;
