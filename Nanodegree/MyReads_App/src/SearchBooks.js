import React from 'react'
import { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf'

class SearchBooks extends Component {
  constructor(props) {
    super(props);
    this.setQuery = this.setQuery.bind(this);
    this.state = {
      query: [],
      matchCounter: ''
    }
  }

  // handling text input in search form
  handleChange(expression) {
    // default value of search result
    let result = [];
    // default value of search result counter message
    let counterText = '';
    // if text is inputted in form, fetch books from server
    if (expression.length > 0) {
      BooksAPI.search(expression).then((results) => {
        // if result is an array of book set counter message
        if (results && Array.isArray(results) && results.length > 0) {
          result = results;
          counterText = results.length + " matching books";
          // check if any book in the results are missing properties
          result.forEach((b => {
            this.props.bookChecker(b);
          }))
        }
        // is no books is returned from server display counter message
        else if (result.length === 0 && expression.length > 0) {
          counterText = 'Sorry, no matching book found'
        }
      }).then( () => this.setQuery(result, counterText))
    }
    // if text is deleted from input, set default values in state
    else {
      this.setQuery(result, counterText);
    }
    
  }

  setQuery(query, matchCounter) {
    this.setState({
      query,
      matchCounter
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
          <p className="search-counter">
            { this.state.matchCounter }
          </p>
          <ol className="books-grid">
            <BookShelf
              onShelf={ this.props.books }
              books={ this.state.query }
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