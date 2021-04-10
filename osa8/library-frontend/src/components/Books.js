
import React, { useState, useEffect } from 'react'
import { useLazyQuery, useQuery, useSubscription } from '@apollo/client'
import { ALL_BOOKS, ALL_GENRES, BOOK_ADDED } from '../queries'
import BookList from './BookList'

const Books = (props) => {  
  const [getBooks, { loading, data }] = useLazyQuery(ALL_BOOKS);
  const [genres, setGenres] = useState([])
  const genreResult = useQuery(ALL_GENRES)

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: (book) => {
      alert(`Book added: ${book}`)
    }
  })

  useEffect( () => {    
    if(genreResult.loading) 
      return
    const genres = genreResult.data.allBooks.reduce( (allGenres, { genres }) => {
      return genres.reduce( (all, genre) => {
        if (all.includes(genre))
          return all
        return all.concat(genre)
      }, [...allGenres])
    }, [])
    setGenres(genres)
  }, [genreResult])

  if (!props.show) {
    return null
  }

  if(loading) {
    return (<div>loading...</div>)
  }
  if(!data) {
    getBooks()
    return (<div>no data?</div>)
  }
  return (
    <div>
      <h2>books</h2>
      <BookList books={data.allBooks} />

      {genres.map(genre => (
        <button key={genre} onClick={() => getBooks({variables: {genre}})}>{genre}</button>
      ))}
      <button onClick={() => getBooks() }>all genres</button>
    </div>
  )
}

export default Books