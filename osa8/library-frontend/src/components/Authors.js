import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'

const EditAuthor = ({ authors }) => {
  const [author, setAuthor] = useState('')
  const [born, setBorn] = useState('')
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ { query: ALL_AUTHORS } ]
  }) 

  const handleSubmit = (event) => {
    event.preventDefault()
    editAuthor({ variables: { name: author, setBornTo: Number(born) }})
    setAuthor('')
    setBorn('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        name: 
        <select onChange={({ target }) => setAuthor(target.value)} value={author}>
          <option>---</option>
          {authors.map(author => (
            <option key={author.name} value={author.name}>{author.name}</option>
          ))}
        </select>
      </div>
      <div>
        born: 
        <input type="text" value={born} onChange={({ target }) => setBorn(target.value)} />
      </div>
      <button type="submit">save</button>
    </form>
  )
}

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS)

  if (!props.show) {
    return null
  }

  if(result.loading) {
    return (
      <div>loading...</div>
    )
  }
  console.log(result)
  const authors = result.data.allAuthors

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <EditAuthor authors={authors} />
    </div>
  )
}

export default Authors