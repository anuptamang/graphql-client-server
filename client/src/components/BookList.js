import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { getBooksQuery } from '../queries/queries'
import BookDetails from './BookDetails'

class BookList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: null,
    }
  }

  displayBooks() {
    let data = this.props.data
    if (data.loading) {
      return <div>Loading books..</div>
    } else {
      return data.books.map((book) => (
        <li
          className='btn btn-secondary m-1'
          onClick={(e) => {
            this.setState({ selected: book.id })
          }}
          key={book.id}
        >
          {book.name} {book.genre}
        </li>
      ))
    }
  }

  render() {
    return (
      <div className='row'>
        <div className='col-md-6'>
          <ul className='list-unstyled' id='book-list'>
            {this.displayBooks()}
          </ul>
        </div>
        <div className='col-md-6'>
          <BookDetails bookId={this.state.selected} />
        </div>
      </div>
    )
  }
}

// bind getBooksQuery with BookList
// it stores values as props in BookList component
export default graphql(getBooksQuery)(BookList)
