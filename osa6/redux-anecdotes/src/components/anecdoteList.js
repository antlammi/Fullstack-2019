import React from 'react'
import { incrementVote } from '../reducers/anecdoteReducer'

const sortFunction = (a,b) => {
  if (a.votes === b.votes) {
    return 0
  } else {
    return(a.votes > b.votes) ? -1 : 1
  }
}
const AnecdoteList = ({store}) => {
  const anecdotes = store.getState()
  anecdotes.sort(sortFunction)
  const vote = (id) => {
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