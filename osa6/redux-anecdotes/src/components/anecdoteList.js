import React from 'react'
import { incrementVote } from '../reducers/anecdoteReducer'
import { newNotification } from '../reducers/notificationReducer'

const sortFunction = (a,b) => {
  if (a.votes === b.votes) {
    return 0
  } else {
    return(a.votes > b.votes) ? -1 : 1
  }
}
const AnecdoteList = ({store}) => {
  const anecdotes = store.getState().anecdotes
  anecdotes.sort(sortFunction)
  const vote = (id) => {
    
    store.dispatch(newNotification(`You voted for '`+ store.getState().anecdotes.find(n => n.id === id).content+ `'`))
    store.dispatch(incrementVote(id))

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
export default AnecdoteList