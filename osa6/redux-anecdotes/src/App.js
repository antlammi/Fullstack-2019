import React from 'react';
import AnecdoteList from './components/anecdoteList'
import AnecdoteForm from './components/anecdoteForm'
import Notification from './components/Notification'
const App = (props) => {
  return (
    <div>
      <Notification store={props.store} message={props.store.getState().notification.message}/>
      <h2>Anecdotes</h2>
      <AnecdoteList store={props.store}/> 
      <AnecdoteForm store={props.store}/>
  
    </div>
      
  )
}

export default App
