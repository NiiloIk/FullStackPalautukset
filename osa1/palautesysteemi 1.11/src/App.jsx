import { useState } from 'react'

const StatisticLine = props => <tr><td>{props.text}</td><td>{props.value}</td></tr>

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Statistics = ({ all }) => {
  console.log(all)
  if (all.length == 0) {
    return (
      <>
        <h2>Statistics</h2>
        <p>No feedback given</p>
      </>
    )
  }
  else return (
    <div>
      <h2>Statistics</h2>
      <table>
        <StatisticLine text="Good" value={all.filter(x => x == 1).length} />
        <StatisticLine text="Neutral" value={all.filter(x => x == 0).length} />
        <StatisticLine text="Bad" value={all.filter(x => x == -1).length} />
        <StatisticLine text="All" value={all.length} />
        <StatisticLine text="Average" value={all.reduce((x, listValue) => x + listValue, 0) / all.length} />
        <StatisticLine text="positive" value={100 * all.filter(x => x == 1).length / all.length + " %"} />
      </table>
    </div>
  )
}

const App = () => {
  const [all, setAll] = useState([])
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setGoodToValue = newValue => setGood(newValue)
  const setNeutralToValue = newValue => setNeutral(newValue)
  const setBadToValue = newValue => setBad(newValue)

  const setValue = (name, newValue, setFunction, value) => {
    console.log(name, 'value at', newValue)
    setFunction(newValue)
    setAll(all.concat(value))
  }

  return (
    <>
      <h1>Give feedback</h1>

      <Button handleClick={() => setValue('Good', good+1, setGoodToValue, 1)} text="Good" />
      <Button handleClick={() => setValue('Neutral', neutral+1, setNeutralToValue, 0)} text="Neutral" />
      <Button handleClick={() => setValue('Bad', bad+1, setBadToValue, -1)} text="Bad" />
      
      <Statistics all={all} good={good} neutral={neutral} bad={bad} />
    </>
  )
}

export default App