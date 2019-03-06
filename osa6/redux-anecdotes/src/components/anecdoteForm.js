import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { newNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = (props) => {
    const addAnecdote= async (event) => {
        event.preventDefault()
        const content = event.target.content.value
        const newAnecdote = await anecdoteService.createNew(content)
        props.createAnecdote(newAnecdote)
        props.newNotification(`You created a new anecdote '` + content + `'`)
        
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

const mapDispatchToProps = {
    createAnecdote, newNotification
}
const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm)
export default ConnectedAnecdoteForm
