const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header course={course}/>
      <Part part={part1} />
      <Part part={part2} />
      <Part part={part3} />
      <Total part1={part1} part2={part2} part3={part3} />
      
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
        {exercises.part.name} {exercises.part.exercises}
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
      <p>Number of exercises {exercises.part1.exercises + exercises.part2.exercises + exercises.part3.exercises}</p>
    </>
  )
}

export default App