const Filter = ({ filter, handleFilterChange }) => {
  return (
    <div>
      Filter names with: <input value={filter} onChange={handleFilterChange} />
    </div>
  );
};

export default Filter;
