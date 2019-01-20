import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}
const TopAnecdote=({points, anecdotes}) => {
  var maxVotes=0
  var selection=0
  for (var i=0; i<points.length; i++) {
    if (points[i] >= maxVotes){
      maxVotes = points[i]
      selection=i
    }
  }
  return (
    <div>
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[selection]}</p>
      <p>has {maxVotes} votes</p>
    </div>
  )
}
const NxtRnd = () => {
  let min = 0
  let max = 5
  let output =  Math.floor(Math.random()*(max-min+1))+min
  return (
    output
  )
}

var points = [0, 0, 0, 0, 0, 0]
const App = (props) => {
  const [selected, setSelected] = useState(0)
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{props.anecdotes[selected]}</p>
      <p>has {points[selected]} votes</p>
      
      <Button handleClick={()=>{
        points[selected]+=1
        setSelected(selected)
      }} text='vote'/>
      <Button handleClick={()=>setSelected(NxtRnd)} text='next anecdote'/>
      <TopAnecdote points={points} anecdotes={props.anecdotes}/>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)