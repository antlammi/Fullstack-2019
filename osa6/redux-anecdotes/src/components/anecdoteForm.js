import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { newNotification } from '../reducers/notificationReducer'

const AnecdoteForm = ({store}) => {
    const addAnecdote=(event) => {
        event.preventDefault()
        const anecdote = createAnecdote(event.target.content.value)
        store.dispatch(newNotification(`You created a new anecdote '` + anecdote.data.content + `'`))
        store.dispatch(anecdote)
    }
    return (
    <div>
        <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div><input name="content"/></div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm
