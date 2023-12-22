const Header = (props) => {
  console.log(props)
  return (
    <>
      <h1>{props.title}</h1>
    </>
  )
}

const Content = (props) => {
  const { parts } = props;
  
  return (
    <>
      {parts.map((part) => (
        <Part name={part.name} numberOfExercises={part.exercises} />
      ))}
    </>
  )
}

const Part = (props) => {
  return(
    <>
      <p key={props.name}> {props.name} - {props.numberOfExercises} exercises</p>
    </>

  )
}

const Total = (props) => {
  const { parts } = props;

  // Calculate the total number of exercises
  const totalExercises = parts.reduce((total, part) => total + part.exercises, 0);

  return(
    <>
      Number of exercises - {totalExercises}
    </>
  )
}

const App = () => {
  // const-definitions
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

  // The app itself
  return (
    <div>
      <Header title={course.name} />

      <Content parts={course.parts} />

      <Total parts={course.parts}/>
    </div>
  )
}

export default App