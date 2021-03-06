import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Recommendations from './components/Recommendations'

import { 
  ApolloClient, ApolloProvider, HttpLink, InMemoryCache, useQuery, split
} from '@apollo/client' 
import { ME } from './queries'
import { setContext } from 'apollo-link-context'

import { getMainDefinition } from '@apollo/client/utilities'
import { WebSocketLink } from '@apollo/client/link/ws'

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('library-user-token')
  return {
    headers: {
      ...headers,
      authorization: token ? `bearer ${token}` : null,
    }
  }
})

const httpLink = new HttpLink({ uri: 'http://localhost:4000' })

const wsLink = new WebSocketLink({
  uri: 'ws://localhost:4000/graphql',
  options: {
    reconnect: true
  }
})

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  wsLink,
  authLink.concat(httpLink),
)

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink
})


const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const meResult = useQuery(ME, { client })


  useEffect(() => {
    const token = localStorage.getItem('library-user-token')
    setToken(token)
  }, [])
  
  const doLogin = (token) => {
    setToken(token)
    setPage('authors')
  }

  const doLogout = () => {
    localStorage.removeItem('library-user-token')
    setToken(null)
  }

  return (
    <ApolloProvider client={client}>
        { (token) ? 
          (            
            <div>
              <button onClick={() => setPage('authors')}>authors</button>
              <button onClick={() => setPage('books')}>books</button>
              <button onClick={() => setPage('add')}>add book</button>
              <button onClick={() => setPage('recommendations')}>recommendations</button>
              <button onClick={doLogout}>logout</button>  
            </div>
          ) : (
            <div>
              <button onClick={() => setPage('authors')}>authors</button>
              <button onClick={() => setPage('books')}>books</button>    
              <button onClick={() => setPage('login')}>login</button>
            </div>
          )
        }

      <Authors
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
      />

      <Recommendations
        show={page === 'recommendations'}
        user={meResult.data}
      />
  
      <Login
        doLogin={doLogin}
        show={page === 'login'}
      />

    </ApolloProvider>
  )
}

export default App