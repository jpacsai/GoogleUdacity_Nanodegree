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

  handleChange(expression) {
    let result = [];
    let counterText = '';
    if (expression.length > 0) {
      BooksAPI.search(expression).then((results) => {
        if (results && Array.isArray(results) && results.length > 0) {
          result = results;
          counterText = results.length + " matching books";
          result.forEach((b => {
            this.props.bookChecker(b);
          }))
        }
        else if (results.length === 0 && expression.length > 0) {
          counterText = 'Sorry, no matching book found'
        }
      }).then( () => this.setQuery(result, counterText))
    }
    else {
      this.setQuery(result, counterText);
    }
    
  }

  setQuery(query, matchCounter) {
    console.log(query)
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
            { this.props.matchCounter }
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