const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

export const vote = (anecdote) => {
  return {
    type: "VOTE",
    id: anecdote.id
  }
}

export const addAnecdote = (content) => {
  return {
    type: "ADD_ANECDOTE",
    content
  }
}

const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = initialState, action) => {
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
    case 'ADD_ANECDOTE': {
      const newAnecdote = {
        content: action.content,
        votes: 0,
        id: getId()
      }
      return [ ...state, newAnecdote ]
    }
    case 'INIT':
      return initialState
    default: return state
  }

  return state
}

export default reducer