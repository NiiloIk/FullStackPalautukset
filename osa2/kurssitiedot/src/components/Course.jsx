const Header = ({ text }) => {
  // console.log(text)
  return (
    <>
      <h1>{text}</h1>
    </>
  )
}

const Part = ({ name, exercises }) => {
  // console.log(content)
  return (
    <>
      <p>{name} {exercises}</p>
    </>
  )
}

const Total = ({ exercises }) => {
  const amount = exercises.reduce( (x, y) => x + y )

  return (
    <>
      <p><b>Total amount of exercises {amount}</b></p>
    </>
  )
}

const Content = ({ parts }) => {
  // console.log(parts)
  const exercises = parts.map(x => x.exercises)
  console.log(exercises)

  return (
    <>
      {parts.map(x => 
        <Part key={x.id} name={x.name} exercises={x.exercises} />
      )}
      <Total exercises={exercises}/>
    </>
  )
}

const Course = ({ course }) => {
  console.log(course)
  
  return (
    <>
      <Header text={course.name} />
      <Content parts={course.parts}/>
    </>
  )
}
  
export default Course