
const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

export const createAnecdote = (data) => {  
  console.log(data)
  const anecdoteToReturn = {
    type: 'NEW_ANECDOTE',
    data,
  }
  console.log(anecdoteToReturn)
  return(anecdoteToReturn)
}

export const incrementVote = (id) => {
  return {
    type: 'VOTE',
    data: {id}
  }
}

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type){
    case'NEW_ANECDOTE': {
      return state.concat(action.data)
    }
    case'VOTE': {
      const id = action.data.id
      const anecdoteToChange = state.find(n => n.id === id)
      const changedAnecdote =  { ...anecdoteToChange, votes: anecdoteToChange.votes +1}
      return state.map(anecdote => anecdote.id !== id ? anecdote : changedAnecdote)
    }
    case'INIT_ANECDOTES':
      return action.data
    default: {
      return state
   }
  }
}
export const initializeAnecdotes = (anecdotes) => {
  return { type: 'INIT_ANECDOTES', data: anecdotes}
}
export default reducer