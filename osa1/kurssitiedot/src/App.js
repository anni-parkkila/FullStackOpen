const Header = (props) => {
  console.log("Header=", props.course.name)
  return (
      <h1>{props.course.name}</h1>
  )
}

const Content = (props) => {
  console.log("Content=", props.course.parts[0], props.course.parts[1], props.course.parts[2])
  return (
    <div>
      <Part part={props.course.parts[0]} />
      <Part part={props.course.parts[1]} />
      <Part part={props.course.parts[2]} />
    </div>
  )
}

const Part = (props) => {
  console.log("Part=", props.part.name, props.part.exercises)
  return (
    <p>{props.part.name} {props.part.exercises}</p>
  )
}

const Total = (props) => {
  console.log("Total=", props.course.parts[0].exercises + props.course.parts[1].exercises + props.course.parts[2].exercises)
  return (
    <div>
      <p>Number of exercises {props.course.parts[0].exercises + props.course.parts[1].exercises + props.course.parts[2].exercises}</p>
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }


  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

export default App