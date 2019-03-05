import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = ({store}) => {
    const addAnecdote=(event) => {
        event.preventDefault()
        let anecdote = createAnecdote(event.target.content.value)
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
