import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import AnecdoteList from './components/anecdoteList'
import AnecdoteForm from './components/anecdoteForm'
import Notification from './components/Notification'
import anecdoteService from './services/anecdotes'
import { initializeAnecdotes} from './reducers/anecdoteReducer'
const App = (props) => {
  useEffect(() => {
    anecdoteService 
      .getAll().then(notes => props.initializeAnecdotes(notes))
  }, [])
  return (
    <div>
     
      <Notification/>
      <h2>Anecdotes</h2>
      <AnecdoteList/> 
      <AnecdoteForm/>
  
    </div>
      
  )
}

export default connect(null, {initializeAnecdotes })(App)
