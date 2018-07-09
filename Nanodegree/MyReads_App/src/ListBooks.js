import React from 'react'
import { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookShelf from './BookShelf';

class ListBooks extends Component {
  constructor(props) {
		super(props);
    this.changeShelf = this.changeShelf.bind(this);
    this.state = {
      current: [],
      want: [],
      read: []
    }
  }
  
  changeShelf(e,b) {
    console.log('changeShelf');
    BooksAPI.update(b, e).then(() => 
      this.getShelf()
    /*{
      let jointArrays = this.state.current.concat(this.state.want, this.state.read);
      console.log(jointArrays);
      this.sortBooks(jointArrays);
    }*/
    );
  }

  sortBooks(b) {
    const current = b.filter((book) => book.shelf === 'currentlyReading');
      const want = b.filter((book) => book.shelf === 'wantToRead');
      const read = b.filter((book) => book.shelf === 'read');
      this.setState({
        current,
        want,
        read
      })
  }

  getShelf() {
    BooksAPI.getAll().then((b) => {
      this.sortBooks(b);
    });
  }

  componentDidMount() {
    this.getShelf
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
              <BookShelf changeShelf={this.changeShelf} shelf={this.state.current}/>
            </div>

            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <BookShelf changeShelf={this.changeShelf} shelf={this.state.want}/>
            </div>

            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <BookShelf changeShelf={this.changeShelf} shelf={this.state.read}/>
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