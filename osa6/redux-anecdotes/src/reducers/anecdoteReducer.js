import anecdoteService from '../services/anecdotes'
import { notify } from '../services/notification'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

export const voteAction = (anecdote) => {
  return {
    type: "VOTE",
    id: anecdote.id
  }
}

export const updateAction = (anecdote) => {
  return {
    type: "UPDATE_ANECDOTE",
    anecdote
  }
}

export const vote = (anecdote) => {
  return async dispatch => {
    console.log("vote", anecdote)
    const result = await anecdoteService.update({ ...anecdote, votes: anecdote.votes+1 })
    dispatch(updateAction(result))
  }
}

export const addAnecdoteAction = (id, content) => {
  return {
    type: "ADD_ANECDOTE",
    id,
    content
  }
}

export const addAnecdote = (value) => {
  return async dispatch => {
    const result = await anecdoteService.createNew(value)
    
    const action = addAnecdoteAction(result.id, result.content)
  
    dispatch(action)
    dispatch(notify('Added anecdote!', 10))    
  }
}

export const initAnecdotesAction = (anecdotes) => {
  return {
    type: "INIT_ANECDOTES",
    anecdotes
  }
}

export const initAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(initAnecdotesAction(anecdotes))
  }
}


const initialState = []

const anecdoteReducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'VOTE': {      
      return state.map(obj => {
        if(obj.id === action.id) {
          return { ...obj, votes: obj.votes + 1 }
        }
        return obj
      }).sort( (a,b) => (b.votes - a.votes) )
    }      
    case 'UPDATE_ANECDOTE': {      
      return state.map(obj => {
        if(obj.id === action.anecdote.id) {
          return action.anecdote
        }
        return obj
      }).sort( (a,b) => (b.votes - a.votes) )
    }      
    case 'ADD_ANECDOTE': {
      const newAnecdote = {
        content: action.content,
        id: action.id, 
        votes: 0,        
      }
      return [ ...state, newAnecdote ]
    }
    case 'INIT_ANECDOTES':
      return action.anecdotes
    case 'INIT':
      return initialState
    default: return state
  }

  return state
}

export default anecdoteReducer