const Header = ({ name }) => {
  return <h1>{name}</h1>;
};

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
    </div>
  );
};

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  );
};

const Total = ({ parts }) => {
  const totalExercises = parts.reduce((sum, part) => {
    return sum + part.exercises;
  }, 0);
  return (
    <div>
      <p>
        <strong>Total of {totalExercises} exercises</strong>
      </p>
    </div>
  );
};

const Course = ({ course }) => {
  const { name, parts } = course;
  return (
    <div>
      <Header name={name} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  );
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    id: 1,
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
        id: 1,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
        id: 2,
      },
      {
        name: "State of a component",
        exercises: 14,
        id: 3,
      },
      {
        name: "Redux",
        exercises: 11,
        id: 4,
      },
    ],
  };

  return (
    <div>
      <Course course={course} />
    </div>
  );
};

export default App;
