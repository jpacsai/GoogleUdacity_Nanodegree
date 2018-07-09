import React from 'react'
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf';

const ListBooks = (props) => {
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Currently Reading</h2>
            <BookShelf
              checkShelf={ props.checkShelf }
              changeShelf={ props.changeShelf }
              books={ props.current } />
          </div>

          <div className="bookshelf">
            <h2 className="bookshelf-title">Want to Read</h2>
            <BookShelf
              checkShelf={ props.checkShelf }
              changeShelf={ props.changeShelf }
              books={ props.want } />
          </div>

          <div className="bookshelf">
            <h2 className="bookshelf-title">Read</h2>
            <BookShelf
              checkShelf={ props.checkShelf }
              changeShelf={ props.changeShelf }
              books={ props.read } />
          </div>
        </div>
      </div>

      <div className="open-search">
        <Link to='/search'>Add a book</Link>
      </div>
    </div>
  )
}

export default ListBooks