import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => {
        if(state.filter) {
            return state.anecdotes.filter(anecdote => (anecdote.content.search(state.filter) !== -1))
        }
        return state.anecdotes
    })
    const dispatch = useDispatch()

    return (
        <div>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => dispatch(vote(anecdote))}>vote</button>
                </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList