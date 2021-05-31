import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { getBookByIdQuery } from '../queries/queries'

class BookDetails extends Component {
  displayBookDetails() {
    const { book, loading } = this.props.data

    if (book) {
      return (
        <>
          {loading ? (
            <div>Loading..</div>
          ) : (
            <div className='card p-3'>
              <h3>Book Details:</h3>
              <h4>Name: {book.name}</h4>
              <p>Genre: {book.genre}</p>
              <p>Author: {book.author.name}</p>
              <p>All books by {book.author.name}:</p>
              <ul className='list-inline'>
                {book.author.books.map((book) => (
                  <li className='btn btn-secondary m-1' key={book.id}>
                    {book.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )
    } else {
      return <div>No books selected...</div>
    }
  }
  render() {
    return <div>{this.displayBookDetails()}</div>
  }
}

export default graphql(getBookByIdQuery, {
  options: (props) => {
    return {
      variables: {
        id: props.bookId,
      },
    }
  },
})(BookDetails)
