const PersonForm = ({
  addPerson,
  newName,
  handleNameChange,
  newPhonenumber,
  handlePhonenumberChange,
}) => {
  return (
    <form onSubmit={addPerson}>
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
  );
};

export default PersonForm;
