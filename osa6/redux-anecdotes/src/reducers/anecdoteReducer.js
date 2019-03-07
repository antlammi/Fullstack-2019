import anecdoteService from '../services/anecdotes'
const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}
export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data:anecdotes
    })
  }
}
export const createAnecdote = data => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(data)
    dispatch({
      type:'NEW_ANECDOTE',
      data: newAnecdote,
    })
  }
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

export default reducer