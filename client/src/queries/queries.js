import { gql } from 'apollo-boost'

// get all books
const getBooksQuery = gql`
  {
    books {
      name
      id
    }
  }
`

// get all authors
const getAuthorsQuery = gql`
  {
    authors {
      name
      id
    }
  }
`

// get a book by ID
const getBookByIdQuery = gql`
  query($id: ID) {
    book(id: $id) {
      id
      name
      genre
      author {
        name
        id
        age
        books {
          name
          id
        }
      }
    }
  }
`

// add book to the database
const addBookMutation = gql`
  mutation($name: String!, $genre: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      name
      id
    }
  }
`

export { getBooksQuery, getAuthorsQuery, addBookMutation, getBookByIdQuery }
