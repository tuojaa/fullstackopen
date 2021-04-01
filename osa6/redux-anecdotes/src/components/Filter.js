import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const Filter = () => {
    const filter = useSelector(state => state.filter)
    const dispatch = useDispatch()

    const handleChange = (event) => {
        const action = setFilter(event.target.value)
        console.log(action)
        dispatch(action)
    }
    const style = {
        marginBottom: 10
    }

    return (
        <div style={style}>
            filter <input onChange={handleChange} value={filter} />
        </div>
    )
}

export default Filter