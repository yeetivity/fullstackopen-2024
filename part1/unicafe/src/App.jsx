import { useState } from 'react'

const Header = ({ title }) => <h1> {title} </h1>

const Button = ({ title, onClick }) => {
  return(
    <button onClick={onClick}>
      {title}
    </button>
  )
}

const StatisticsRow = ({ title, value}) => {
  return(
    <tr>
      <th style= {{textAlign: 'left'}}>{title}</th>
      <th>{value}</th>
    </tr>
  )
}

const StatisticsSection = (props) => {
  const { valueGood, valueBad, valueNeutral, titleGood, titleBad, titleNeutral } = props
  // compute some more statistics
  const totalVotes = valueGood + valueBad + valueNeutral
  console.log("computed the total votes to be: ", totalVotes)

  let averageScore, positivePercentage

  if (totalVotes !== 0){
    averageScore = (valueGood * 1 + valueBad * -1 + valueNeutral * 0) / totalVotes  // Neutral score added only for completeness
    positivePercentage = valueGood * 100 / totalVotes
  }
  
  if (totalVotes == 0){
    return(
      <>
        <p>No feedback given</p>
      </>
    )
  }
  return(
    <table>
      <tbody>
        <StatisticsRow title={titleGood} value={valueGood} />
        <StatisticsRow title={titleNeutral} value={valueNeutral} />
        <StatisticsRow title={titleBad} value={valueBad} />
        <StatisticsRow title="All votes" value={totalVotes} />
        <StatisticsRow title="Average Score" value={averageScore.toFixed(2)} />
        <StatisticsRow title="Positive Percentage" value={positivePercentage.toFixed(2)} />
      </tbody>
    </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const header_title = "give feedback"
  const statistics_title = "statistics"

  const increaseGoodCounter = () => {
    console.log("Good counter", good + 1)
    setGood(good + 1)
  }
  const increaseNeutralCounter = () => {
    console.log("Neutral counter", neutral + 1)
    setNeutral(neutral + 1)
  }
  const increaseBadCounter = () => {
    console.log("Bad counter", bad + 1)
    setBad(bad + 1)
  }

  return (
    <div>
      <Header title={header_title} />

      <Button title="good" onClick={increaseGoodCounter} />
      <Button title="neutral" onClick={increaseNeutralCounter} />
      <Button title="bad" onClick={increaseBadCounter} />

      <Header title={statistics_title} />

      <StatisticsSection titleGood="Good" titleNeutral="Neutral" titleBad="Bad"
      valueGood={good} valueBad={bad} valueNeutral={neutral} />

    </div>
  )
}

export default App