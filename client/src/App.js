import React, { Component } from 'react'
import BookList from './components/BookList'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import AddBook from './components/AddBook'

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
})
class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className='app'>
          <div className='container py-4'>
            <h1>GraphQL</h1>
            <BookList />
            <AddBook />
          </div>
        </div>
      </ApolloProvider>
    )
  }
}

export default App
