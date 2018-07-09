import React from 'react'
import { Component } from 'react'
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf';
import * as BooksAPI from './BooksAPI'

class SearchBooks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: []
    }
  }

  handleChange(e) {
    BooksAPI.search(e).then((books) => {
      const result = books && Array.isArray(books) ? books : [];
      this.setState({
        query : result
      })
    })
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            className="close-search"
            to='/'>
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={ (event) => this.handleChange(event.target.value) }
            /> 
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            <BookShelf
              onShelf={ this.props.books }
              books={ this.state.query}
              changeShelf={ this.props.changeShelf }
              checkShelf={ this.props.checkShelf }
            />
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks