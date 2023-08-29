const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course}/>
      <Part part={part1} exercises={exercises1} />
      <Part part={part2} exercises={exercises2} />
      <Part part={part3} exercises={exercises3} />
      <Total exercises1={exercises1} exercises2={exercises2} exercises3={exercises3} />
      
      </div>
  )
}

const Header = (course) => {
  return (
    <>
      <h1>{course.course}</h1>
    </>
  )
}
const Part = (exercises) => {
  return (
    <>
      <p>
        {exercises.part} {exercises.exercises}
      </p>
    </>
  )
}

// Content is replaced by Part 
/*
const Content = (exercises) => {

  return (
    <>
      <p>
        {exercises.part1} {exercises.exercises1}
      </p>
      <p>
        {exercises.part2} {exercises.exercises2}
      </p>
      <p>
        {exercises.part3} {exercises.exercises3}
      </p>
    </>
  )
}*/
const Total = (exercises) => {
  return (
    <>
      <p>Number of exercises {exercises.exercises1 + exercises.exercises2 + exercises.exercises3}</p>
    </>
  )
}

export default App