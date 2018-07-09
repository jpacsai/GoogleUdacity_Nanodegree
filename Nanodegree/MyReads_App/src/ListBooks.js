import React from 'react'
import { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookShelf from './BookShelf';

class ListBooks extends Component {
  constructor(props) {
		super(props);
    this.state = {
      current: [],
      want: [],
      read: []
    }
  }

  render() {
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
                checkShelf={this.props.checkShelf}
                changeShelf={this.props.changeShelf}
                books={this.props.current} />
            </div>

            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <BookShelf
                checkShelf={this.props.checkShelf}
                changeShelf={this.props.changeShelf}
                books={this.props.want} />
            </div>

            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <BookShelf
                checkShelf={this.props.checkShelf}
                changeShelf={this.props.changeShelf}
                books={this.props.read} />
            </div>
          </div>
        </div>

        <div className="open-search">
          <Link to='/search'>Add a book</Link>
        </div>
      </div>
    )
  }
}

export default ListBooks