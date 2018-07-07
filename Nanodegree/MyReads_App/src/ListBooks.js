import React from 'react'
import { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookShelf from './BookOnShelf';

class ListBooks extends Component {
    state = {
      currentlyReading: [],
      wantToRead: [],
      read: []
    }

    componentDidMount() {
      BooksAPI.getAll().then((books) => {
        const current = books.filter((book) => book.shelf === 'currentlyReading');
        const want = books.filter((book) => book.shelf === 'wantToRead');
        const read = books.filter((book) => book.shelf === 'read');
        this.setState({
          currentlyReading: current,
          wantToRead: want,
          read: read
        })
      });
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
                    <BookShelf shelf={this.state.currentlyReading} />
                </div>

                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <BookShelf shelf={this.state.wantToRead} />
                </div>

                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <BookShelf shelf={this.state.read} />
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