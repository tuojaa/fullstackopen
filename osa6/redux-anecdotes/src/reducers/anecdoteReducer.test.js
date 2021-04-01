import anecdoteReducer, { vote, addAnecdote } from './anecdoteReducer'

describe('anecdote reducer', () => {
  test('should return a proper initial state when called with undefined state', () => {
    const action = {
      type: 'INIT'
    }

    const newState = anecdoteReducer(undefined, action)
    expect(newState).toHaveLength(6)
  })

  test('vote action should increase number of votes', () => {
      const initialState = [{
          content: "Hello, world!",
          id: 1,
          votes: 0
        }]    
        
        const newState = anecdoteReducer(initialState, vote(initialState[0]))
        expect(newState).toHaveLength(1)
        expect(newState[0].votes).toBe(1)
  })

  test('vote action should sort by number of votes', () => {
    const initialState = [{
        content: "Hello, world!",
        id: 1,
        votes: 0
      },
      {
        content: "Second anecdote",
        id: 2,
        votes: 0
      }]    
      
      const newState = anecdoteReducer(initialState, vote(initialState[1]))
      expect(newState).toHaveLength(2)
      expect(newState[0].votes).toBe(1)
      expect(newState[0].id).toBe(2)
    })

    test('addAnecdote action should increase number of anecdotes', () => {
      const initialState = [{
        content: "Hello, world!",
        id: 1,
        votes: 2
      }]          
      
      const newState = anecdoteReducer(initialState, addAnecdote('Foobar'))
      expect(newState).toHaveLength(2)
      expect(newState[0].votes).toBe(2)
      expect(newState[1].votes).toBe(0)
      expect(newState[1].content).toBe('Foobar')
    })  
})