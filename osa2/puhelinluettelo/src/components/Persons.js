const Person = ({ person }) => {
  //console.log("person", person);
  const { name, phonenumber } = person;
  return (
    <div>
      {name} {phonenumber}
    </div>
  );
};

const Persons = ({ filter, persons }) => {
  //   console.log("Persons", persons);
  //   console.log("filter", filter);
  const filteredPersons = filter
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(filter.toLowerCase())
      )
    : persons;

  return (
    <div>
      {filteredPersons.map((person) => (
        <Person key={person.id} person={person} />
      ))}
    </div>
  );
};

export default Persons;
