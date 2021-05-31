import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { flowRight as compose } from 'lodash'

import {
  addBookMutation,
  getAuthorsQuery,
  getBooksQuery,
} from '../queries/queries'

class AddBook extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      genre: '',
      authorId: '',
    }
  }
  displayAuthors() {
    let data = this.props.getAuthorsQuery
    if (data.loading) {
      return <option>Loading authors..</option>
    } else {
      return data.authors.map((author) => (
        <option key={author.id} value={author.id}>
          {author.name}
        </option>
      ))
    }
  }

  submitForm(e) {
    e.preventDefault()
    this.props.addBookMutation({
      variables: {
        name: this.state.name,
        genre: this.state.genre,
        authorId: this.state.authorId,
      },
      refetchQueries: [{ query: getBooksQuery }],
    })
  }

  render() {
    return (
      <form id='add-book' onSubmit={this.submitForm.bind(this)}>
        <div className='field'>
          <label htmlFor=''>Book Name:</label>
          <input
            type='text'
            onChange={(e) => this.setState({ name: e.target.value })}
          />
        </div>
        <div className='field'>
          <label htmlFor=''>Genre:</label>
          <input
            type='text'
            onChange={(e) => this.setState({ genre: e.target.value })}
          />
        </div>
        <div className='field'>
          <label htmlFor=''>Author:</label>
          <select onChange={(e) => this.setState({ authorId: e.target.value })}>
            <option value=''>Select author</option>
            {this.displayAuthors()}
          </select>
        </div>
        <button
          disabled={
            !this.state.name || !this.state.genre || !this.state.authorId
          }
        >
          Add Book
        </button>
      </form>
    )
  }
}

// bind getBooksQuery with BookList
// it stores values as props in BookList component
export default compose(
  graphql(getAuthorsQuery, { name: 'getAuthorsQuery' }),
  graphql(addBookMutation, { name: 'addBookMutation' })
)(AddBook)
