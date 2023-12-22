const Header = (props) => {
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
        <Part name={part.partName} numberOfExercises={part.numberOfExercises} />
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
  const totalExercises = parts.reduce((total, part) => total + part.numberOfExercises, 0);

  return(
    <>
      Number of exercises - {totalExercises}
    </>
  )
}

const App = () => {
  // const-definitions
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  const partsList = [
      { partName: part1, numberOfExercises: exercises1},
      { partName: part2, numberOfExercises: exercises2},
      { partName: part3, numberOfExercises: exercises3},
  ] 

  // The app itself
  return (
    <div>
      <Header title={course} />

      <Content parts={partsList} />

      <Total parts={partsList}/>
    </div>
  )
}

export default App