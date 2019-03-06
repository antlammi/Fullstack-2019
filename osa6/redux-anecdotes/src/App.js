import React from 'react';
import AnecdoteList from './components/anecdoteList'
import AnecdoteForm from './components/anecdoteForm'
import Notification from './components/Notification'
const App = (props) => {
  return (
    <div>
     
      <Notification/>
      <h2>Anecdotes</h2>
      <AnecdoteList/> 
      <AnecdoteForm/>
  
    </div>
      
  )
}

export default App
