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
            <div>
              <h2>Book Details:</h2>
              <h3>{book.name}</h3>
              <p>{book.genre}</p>
              <p>{book.author.name}</p>
              <p>All books by this author:</p>
              <ul>
                {book.author.books.map((book) => (
                  <li key={book.id}>{book.name}</li>
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
