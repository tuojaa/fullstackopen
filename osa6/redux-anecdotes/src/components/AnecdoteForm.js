import React, { useState } from 'react'
import { connect } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = (props) => {
    const [ value, setValue ] = useState('')

    const handleAdd = async (event) => {
        event.preventDefault()
        props.addAnecdote(value)
        setValue('')
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

const mapDispatchToProps = {
    addAnecdote
}

const mapStateToProps = (state) => state

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteForm)