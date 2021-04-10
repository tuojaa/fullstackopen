import React from 'react'
import { useLazyQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'
import BookList from './BookList'

const Recommendations = (props) => {
  const [getBooks, { loading, data }] = useLazyQuery(ALL_BOOKS);

  if (!props.show) {
    return null
  }

  if(loading) {
    return (
      <div>loading...</div>
    )
  }

  if(!data) {
    getBooks({variables: { genre: props.user.me.favoriteGenre }})
    return (
      <div>loading...</div>
    )
  }

  const books = data.allBooks
  return (
    <div>
      <h2>Recommended books for {props.user.me.username} in genre {props.user.me.favoriteGenre} </h2>
      <BookList books={books} />
    </div>
  )
}

export default Recommendations