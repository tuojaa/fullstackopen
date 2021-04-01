import React from 'react'
import { connect } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const Filter = (props) => {
    const style = {
        marginBottom: 10
    }

    return (
        <div style={style}>
            filter <input onChange={( {target}) => props.setFilter(target.value) } value={props.filter} />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        filter: state.filter,
    }
}

const mapDispatchToProps = {
    setFilter
}

export default connect(mapStateToProps,mapDispatchToProps)(Filter)