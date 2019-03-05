import React from 'react';
import AnecdoteList from './components/anecdoteList'
import AnecdoteForm from './components/anecdoteForm'

const App = (props) => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteList store={props.store}/> 
      <AnecdoteForm store={props.store}/>
  
    </div>
      
  )
}

export default App
