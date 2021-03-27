import React, { useState, useEffect } from 'react'

const Anecdote = (props) => {
  return (
    <div>
      <p>
        {props.anecdotes[props.index]}
      </p>
      <p>
        has {props.votes[props.index]} votes
      </p>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(anecdotes.map((key) => { return 0; }));
  const [mostVoted, setMostVoted] = useState(0)

  const selectRandomAnecdote = () => {
    const selected = Math.floor(Math.random() * anecdotes.length)
    setSelected(selected)
  }

  useEffect(() => {
    const mostVoted = votes.reduce((previous, current, index) => {
      console.log( [previous, votes[index], votes[previous]])
      if (votes[index] >= votes[previous]) {
        return index
      }
      return previous
    }, 0)
    setMostVoted(mostVoted)
  },[votes])

  const voteSelectedAnecdote = () => {
    const newVotes = [...votes]
    newVotes[selected] = newVotes[selected] + 1
    setVotes(newVotes)    
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote anecdotes={anecdotes} votes={votes} index={selected}/>
      <button onClick={voteSelectedAnecdote}>vote</button>
      <button onClick={selectRandomAnecdote}>next anecdote</button>
      <h1>Anecdote with most votes</h1>
      <Anecdote anecdotes={anecdotes} votes={votes} index={mostVoted}/>
    </div>
  )
}

export default App