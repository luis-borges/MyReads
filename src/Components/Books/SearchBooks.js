import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Debounce } from 'react-throttle'
import * as BooksAPI from '../../API/BooksAPI'
import BooksGrid from '../../Components/Books/BooksGrid'


class SearchBooks extends Component {

  constructor() {
    super()
    this.state = {
      searchResults: []
    }
  }

  handleSearchTextChange = (searchText) => {

    searchText = searchText.trim()
  
    if (searchText.length > 0) {
      BooksAPI.search(searchText, 10).then((searchResults) => {
        if(Array.isArray(searchResults)) {
          const updatedResults = searchResults.map(result => {

            const userBook = this.props.myBooks.find(book => book.id === result.id)

            return userBook ? userBook : { ...result, shelf: 'none' }

          })
          this.setState({
            searchResults: updatedResults
          })
        } else {
          this.setState({searchResults: []})
        }
      })
    } else {
      this.setState({searchResults: []})
    }
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/" >Close</Link>
          <div className="search-books-input-wrapper">
            <Debounce time="100" handler="onChange">
              <input
                type="text"
                placeholder="Search by title or author"
                value={this.state.searchText}
                onChange={(event) => this.handleSearchTextChange(event.target.value)}
              />
            </Debounce>
          </div>
        </div>
        <div className="search-books-results">
          <BooksGrid books={this.state.searchResults} OnChangeBookShelf={this.props.OnChangeBookShelf} OnChangeBookShelfChanger={this.props.OnChangeBookShelfChanger} />
        </div>
      </div>
    )
  }
}

export default SearchBooks

