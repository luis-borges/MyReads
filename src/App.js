import React, { Component } from 'react'
import BookSelfs from './Components/Books/BookShelfs'
import SearchBooks from './Components/Books/SearchBooks'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
import './App.css'
import * as BooksAPI from './API/BooksAPI'


class BooksApp extends Component {

  constructor() {
    super()
    this.state = {
      books: []
    }
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  changeBookShelf = (book, value) => {
    let { books } = this.state
    books = books.filter(b => b.id !== book.id).concat({
      ...book,
      shelf: value

    })

    BooksAPI.update(book, value)
    this.setState({ books })

  };

  render() {
    return (

      <div className="app">
        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>My Reads</h1>
            </div>
            <div className="list-books-content">
              <BookSelfs
                books={this.state.books}
                OnChangeBookShelf={this.changeBookShelf}
              />
            </div>
            <div className="open-search">
              <Link to='/search' >Add a book</Link>
            </div>
          </div>
        )} />
        <Route exact path='/Search' render={() => (
          <SearchBooks myBooks={this.state.books} OnChangeBookShelf={this.changeBookShelf} />
        )} />
      </div>

    )
  }
}

export default BooksApp
