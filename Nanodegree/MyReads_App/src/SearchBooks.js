import React from 'react'
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf'

const SearchBooks = (props) => {
  const { handleChange } = props;
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
            onChange={ (event) => handleChange(event.target.value) }
          /> 
        </div>
      </div>
      <div className="search-books-results">
        <p className="search-counter">
          { props.matchCounter }
        </p>
        <ol className="books-grid">
          <BookShelf
            onShelf={ props.books }
            books={ props.query}
            changeShelf={ props.changeShelf }
            checkShelf={ props.checkShelf }
          />
        </ol>
      </div>
    </div>
  )
}

export default SearchBooks