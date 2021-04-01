import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
    const [ value, setValue ] = useState('')
    const dispatch = useDispatch()

    const handleAdd = async (event) => {
        event.preventDefault()
        dispatch(addAnecdote(value))
    }

    return (
        <div>
          <h2>create new</h2>
            <form onSubmit={handleAdd}>
                <div><input onChange={ ({ target }) => setValue(target.value) } value={ value }/></div>
                <button>create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm