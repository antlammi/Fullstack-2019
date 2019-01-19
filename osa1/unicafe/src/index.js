import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}
const Statistic = ({name, value}) => (
    <tr>
        <td>{name}</td> 
        <td>{value}</td>
    </tr>
)

const Statistics = (props) => {
    let count = props.good + props.neutral + props.bad
    if (count===0){
        return(
            <div>
                <h1>statistiikka</h1>
                <p>Ei yhtään palautetta annettu</p>
            </div>
        )
    }
    return (
        <div>
            <h1>statistiikka</h1>
            <table>
                <Statistic name='hyvä' value={props.good}/>
                <Statistic name='neutraali' value={props.neutral}/>
                <Statistic name='huono' value={props.bad}/>
                <Statistic name='yhteensä' value={count}/>
                <Statistic name='average' value={
                <Average good={props.good} bad={props.bad} count={count}/>
                }/>
                <Statistic name='positiivisia' value={
                <Positive good={props.good} count ={count}/>
                }/>
            </table>
            
            
            
           
            
            
        </div>
    )
}
const Average = ({good, bad, count}) => {
    let value = good-bad
    return (value/count)
}
const Positive = ({good, count}) => {
    return (100*(good/count)+ '%')
}
const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  return (
    <div>
        <h1>anna palautetta</h1>
        <Button handleClick={() => setGood(good+1)} text='hyvä'/>
        <Button handleClick={() => setNeutral(neutral+1)} text='neutraali'/>
        <Button handleClick={() => setBad(bad+1)} text='huono'/>
        <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)