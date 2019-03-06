import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { newNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'
const AnecdoteForm = (props) => {
    const addAnecdote=(event) => {
        event.preventDefault()
        props.createAnecdote(event.target.content.value)
        props.newNotification(`You created a new anecdote '` + event.target.content.value + `'`)
        
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
