import React from 'react'
import { incrementVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const sortFunction = (a,b) => {
  if (a.votes === b.votes) {
    return 0
  } else {
    return(a.votes > b.votes) ? -1 : 1
  }
}
const AnecdoteList = (props) => {
  console.log(props)
  
  const anecdotes = props.anecdotes
  anecdotes.sort(sortFunction)
  const vote = (id) => {
    const message = `You voted for '`+props.anecdotes.find(n => n.id === id).content+ `'`
    console.log(message)
    props.setNotification(message, 5)
    props.incrementVote(id)

  }
    return (
        <div>
        {anecdotes.map(anecdote =>
            <div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote.id)}>vote</button>
              </div>
            </div>
          )}
          </div>
    )
}
const MapStateToProps = (state) => {
  return {
    anecdotes:state.anecdotes,
  }
}
const MapDispatchToProps = { incrementVote, setNotification}
const ConnectedAnecdoteList = connect(
  MapStateToProps,
  MapDispatchToProps
  )(AnecdoteList)
export default ConnectedAnecdoteList